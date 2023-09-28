/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

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
}

export const CategorySchema = SchemaFactory.createForClass(Category);
