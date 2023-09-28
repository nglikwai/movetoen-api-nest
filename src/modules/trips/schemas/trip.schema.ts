/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { User } from '@modules/users/schemas/user.schema';

import { TripStatusEnum } from '@enums/trip.enum';

export type TripDocument = Trip & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Trip {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: User;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String, enum: Object.values(TripStatusEnum), default: TripStatusEnum.ACTIVE })
  status: TripStatusEnum;

  @Prop({ type: Date })
  date_start: Date;

  @Prop({ type: Date })
  date_end: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
