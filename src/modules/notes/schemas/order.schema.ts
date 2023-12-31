/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Order {
  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'Category' })
  order: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  trip: mongoose.Schema.Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
