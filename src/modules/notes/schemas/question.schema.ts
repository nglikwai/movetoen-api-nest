/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Category } from './category.schema';

export type QuestionDocument = Question & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Question {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  source: string;

  @Prop({ type: String })
  video_url: string;

  @Prop({ type: String })
  map_url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  category: Category;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
