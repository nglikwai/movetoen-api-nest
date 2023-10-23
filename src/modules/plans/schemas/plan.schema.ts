/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Trip } from '@modules/trips/schemas/trip.schema';
import { User } from '@modules/users/schemas/user.schema';

export type PlanDocument = Plan & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Plan {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date })
  deadline: Date;

  @Prop()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  trip: mongoose.Schema.Types.ObjectId;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
