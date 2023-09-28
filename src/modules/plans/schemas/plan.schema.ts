/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type PlanDocument = Plan & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Plan {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  deadline: Date;

  @Prop()
  password: string;
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
