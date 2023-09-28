/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import * as _ from 'lodash';
import { FilterQuery, Model, SortOrder } from 'mongoose';

import {
  LISTING_LIMIT_DEFAULT,
  LISTING_LIMIT_MAX,
  LISTING_LIMIT_MIN,
} from '@constants/index';
import { COUNTER_KEY } from '@modules/counter/constants/counter.constants';
import { CounterHandlerService } from '@modules/counter/services/counter.handler.service';
import { CryptoUtility } from '@utils/crypto.utils';

import { CreateUserRequestDto } from './controllers/v1.0/dto/createUser.dto';
import { SearchUsersGetV1_0ReqDto } from './controllers/v1.0/dto/searchUserGetReq.dto';
import { SearchUsersGetV1_0ResDto } from './controllers/v1.0/dto/searchUserGetRes.dto';
import { UpdateUserRequestDto } from './controllers/v1.0/dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

import { UserStatusEnum } from '@enums/user.enum';

// eslint-disable-next-line no-shadow
export enum SORT_DIRECTION {
  asc = 1,
  desc = -1,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly counterHandlerService: CounterHandlerService
  ) {}

  async create(user: CreateUserRequestDto): Promise<User> {
    // create and generate user key
    const counterResult =
      await this.counterHandlerService.createOrIncrCounterByKey(
        COUNTER_KEY.MONGO_DOCUMENT_USER_KEY
      );
    const { seq } = counterResult;
    const userKey = seq.toString();

    const password = user.password
      ? CryptoUtility.encryptBySalt(user.password)
      : null;

    const newUser = new this.userModel(
      password
        ? {
            ...user,
            userKey,
            password,
            status: UserStatusEnum.ACTIVE,
          }
        : {
            ...user,
            userKey,
            status: UserStatusEnum.ACTIVE,
          }
    );

    return (await newUser.save()).toObject();
  }

  async find(
    query: SearchUsersGetV1_0ReqDto
  ): Promise<SearchUsersGetV1_0ResDto> {
    const whitelistFields = ['userKey', 'email'];

    const pickedObj = _.pick(query, whitelistFields);

    // omit empty value
    _.forEach(pickedObj, (value, key) => {
      if (_.isEmpty(value) || _.isNil(value)) {
        delete pickedObj[key];
      }
    });

    // transform filter { userKey: { $in: [1, 2, 3] } } into
    // mongoose query format ie { userKey: { $in: [1, 2, 3] } }
    const filters = _.mapValues(pickedObj, (value: any) => {
      if (_.includes(value, ',')) {
        return { $in: _.split(value, ',') };
      }
      return value;
    });

    const sortBy = query.sortBy ?? 'createdAt';
    const sortDirection = query.sortDirection ?? 'desc';
    const sorter = { [sortBy]: SORT_DIRECTION[sortDirection] } as {
      [x: string]: SortOrder;
    };

    const condition =
      Object.keys(filters).length > 0
        ? {
            $or: _.map(filters, (value, key) => {
              return { [key]: value };
            }),
          }
        : {};

    const projection = {
      userKey: 1,
      email: 1,
      status: 1,
    };

    const page = query.page ?? 1;
    const limit = query.limit
      ? query.limit > LISTING_LIMIT_MAX
        ? LISTING_LIMIT_MAX
        : query.limit < LISTING_LIMIT_MIN
        ? LISTING_LIMIT_MIN
        : query.limit
      : LISTING_LIMIT_DEFAULT;

    const users = await this.userModel
      .find(condition, projection)
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(sorter);

    const total = await this.userModel.countDocuments();

    return {
      total,
      limit,
      page,
      result: users,
    };
  }

  async findOne(filter: FilterQuery<UserDocument>, select?: string | string[]) {
    const query = this.userModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async update(id: string, user: UpdateUserRequestDto): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: string): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async updatePassword(id: string, newPassword: string): Promise<User> {
    const { hash, salt } = CryptoUtility.encryptBySalt(newPassword);
    return await this.userModel.findByIdAndUpdate(
      id,
      { password: { hash, salt } },
      { new: true }
    );
  }
}
