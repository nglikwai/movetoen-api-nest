/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Todo {
  @Prop()
  title: string;

  @Prop()
  status: number;

  @Prop()
  deadline: string;

  @Prop()
  person: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  plan: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
