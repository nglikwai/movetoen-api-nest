/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Plan } from '@modules/plans/schemas/plan.schema';
import { User } from '@modules/users/schemas/user.schema';

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  person: mongoose.Types.ObjectId;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  urgent: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Plan.name })
  plan: mongoose.Types.ObjectId;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
