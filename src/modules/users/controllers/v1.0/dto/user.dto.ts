/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import {
  EMAIL_FIELD,
  MONGO_OBJECT_ID_FIELD,
  USER_FIRST_NAME_FIELD,
  USER_KEY_FIELD,
  USER_LAST_NAME_FIELD,
  USER_STATUS_FIELD,
} from '@constants/fakers';
import { Default } from '@decorators/customTransformer';

import { UserStatusEnum } from '@enums/user.enum';

export const userEntityValidExample = {
  _id: MONGO_OBJECT_ID_FIELD,
  userKey: USER_KEY_FIELD,
  email: EMAIL_FIELD,
  password: 'password',
  firstName: USER_FIRST_NAME_FIELD,
  lastName: USER_LAST_NAME_FIELD,
  status: USER_STATUS_FIELD,
};

export class UserEntity {
  @Expose()
  @ApiProperty({
    // eslint-disable-next-line no-underscore-dangle
    example: userEntityValidExample._id,
  })
  @IsString()
  _id!: string;

  @Expose()
  @ApiProperty({
    example: userEntityValidExample.userKey,
  })
  @IsNumber()
  userKey!: number;

  @Expose()
  @ApiProperty({
    example: userEntityValidExample.email,
  })
  @IsString()
  email!: string;

  @Expose()
  @ApiPropertyOptional({
    example: userEntityValidExample.password,
  })
  @IsOptional()
  @IsString()
  password: string;

  @Expose()
  @ApiPropertyOptional({
    enum: Object.values(UserStatusEnum),
    example: userEntityValidExample.status,
  })
  @IsOptional()
  @IsEnum(UserStatusEnum)
  @Default(UserStatusEnum.ACTIVE)
  status!: UserStatusEnum;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export const userResponseValidExample = {
  _id: MONGO_OBJECT_ID_FIELD,
  userKey: USER_KEY_FIELD,
  email: EMAIL_FIELD,
  status: USER_STATUS_FIELD,
};

export class UserResponseDto extends PartialType(
  OmitType(UserEntity, ['password'] as const)
) {}
