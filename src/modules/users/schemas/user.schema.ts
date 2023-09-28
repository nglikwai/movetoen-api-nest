/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Exclude, Transform } from 'class-transformer';
import { Document } from 'mongoose';

import { UserStatusEnum } from '@enums/user.enum';

export type UserDocument = User & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({
    required: true,
    unique: true,
    index: true,
    type: Number,
    get: (v: number) => Math.trunc(v),
    set: (v: number) => Math.trunc(v),
  })
  userKey!: number;

  @Prop({
    required: true,
    type: String,
  })
  email!: string;

  @Prop({
    type: raw({
      hash: String,
      salt: String,
    }),
  })
  @Exclude()
  password?: Record<string, any>;

  @Prop({
    required: true,
    type: String,
    enum: Object.values(UserStatusEnum),
  })
  status!: UserStatusEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({
  userKey: 1,
  publishStartTime: 1,
});
