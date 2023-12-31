/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Trip } from '@modules/trips/schemas/trip.schema';

export type CategoryDocument = Category & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Trip.name })
  trip: mongoose.Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
