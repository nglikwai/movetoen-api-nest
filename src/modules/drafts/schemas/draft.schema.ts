/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Trip } from '@modules/trips/schemas/trip.schema';

export type DraftDocument = Draft & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Draft {
  @Prop({ type: String })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Trip.name })
  trip: mongoose.Types.ObjectId;
}

export const DraftSchema = SchemaFactory.createForClass(Draft);
