/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Note {
  @Prop({ required: true, type: [String] })
  order: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' })
  trip: mongoose.Schema.Types.ObjectId;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
