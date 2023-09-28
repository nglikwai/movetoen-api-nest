/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Order {
  @Prop({ required: true, type: [String] })
  order: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
