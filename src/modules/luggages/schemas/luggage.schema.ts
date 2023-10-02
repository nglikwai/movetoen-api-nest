/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Trip } from '@modules/trips/schemas/trip.schema';
import { User } from '@modules/users/schemas/user.schema';

export type LuggageDocument = Luggage & Document;

type Item = {
  title: string;
  size: number;
  weight: number;
};

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Luggage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  size: number;

  @Prop({ type: Date })
  weight: Date;

  @Prop()
  type: string;

  @Prop({ type: [{ title: String, size: Number, weight: Number }] })
  luggage_list: Item[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Trip.name })
  trip: mongoose.Types.ObjectId;
}

export const LuggageSchema = SchemaFactory.createForClass(Luggage);
