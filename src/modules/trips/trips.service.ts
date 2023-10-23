/* eslint-disable no-underscore-dangle */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { DraftsService } from '@modules/drafts/drafts.service';
import { OrdersService } from '@modules/notes/order.service';
import { PlansService } from '@modules/plans/plans.service';
import { UsersService } from '@modules/users/users.service';

import { AddMemberDto } from './dto/add-member.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip, TripDocument } from './schemas/trip.schema';

import { TripStatusEnum } from '@enums/trip.enum';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private usersService: UsersService,
    private plansService: PlansService,
    private ordersService: OrdersService,
    private draftsService: DraftsService
  ) {}

  async create(createTripDto: CreateTripDto) {
    const createdTrip = await this.tripModel.create(createTripDto);
    void this.draftsService.create({ trip: createdTrip._id });
    void this.plansService.create({ title: `Prepare for ${createdTrip.title}`, trip: createdTrip._id });
    void this.ordersService.create({
      trip: createdTrip._id,
      order: [],
    });
    return createdTrip.save();
  }

  findAll() {
    return this.tripModel.find();
  }

  findOne(userId: mongoose.Types.ObjectId) {
    return this.tripModel.find({ members: { $in: [userId] } }).populate({ path: 'members', select: ['name', 'email'] });
  }

  update(id: mongoose.Types.ObjectId, updateTripDto: UpdateTripDto) {
    return this.tripModel.findByIdAndUpdate(id, updateTripDto);
  }

  inactivateTrip(id: mongoose.Types.ObjectId) {
    return this.tripModel.findByIdAndUpdate(id, { status: TripStatusEnum.DELETED });
  }

  async addMember(id: mongoose.Types.ObjectId, addMemberDto: AddMemberDto) {
    const addUser = await this.usersService.findByEmail(addMemberDto.email);
    if (!addUser) {
      return this.invitation(addMemberDto.email);
    }
    const trip = await this.tripModel.findById(id);
    if (trip.members.includes(addUser._id)) {
      throw new BadRequestException('User already in trip');
    }
    return this.tripModel.findByIdAndUpdate(id, { $push: { members: addUser._id } }, { new: true });
  }

  async invitation(email: string) {
    throw new BadRequestException(`${email} not found, send invitation`);
  }

  async removeMember(id: mongoose.Types.ObjectId, addMemberDto: AddMemberDto) {
    const addUser = await this.usersService.findByEmail(addMemberDto.email);
    if (!addUser) {
      throw new BadRequestException('User not found');
    }
    const trip = await this.tripModel.findById(id);
    if (!trip.members.includes(addUser._id)) {
      throw new BadRequestException('User not in trip');
    }
    return this.tripModel.findByIdAndUpdate(id, { $pull: { members: addUser._id } }, { new: true });
  }
}
