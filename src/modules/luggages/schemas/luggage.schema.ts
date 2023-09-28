/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

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
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: User;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  size: Date;

  @Prop({ type: Date })
  weight: Date;

  @Prop()
  type: string;

  @Prop({ type: [{ title: String, size: Number, weight: Number }] })
  luggage_list: Item[];
}

export const LuggageSchema = SchemaFactory.createForClass(Luggage);
