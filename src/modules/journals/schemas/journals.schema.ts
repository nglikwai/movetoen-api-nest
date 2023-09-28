import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';

import { User } from '@modules/users/schemas/user.schema';

export type JournalDocument = Journal & Document;

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Journal {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({
    required: true,
    type: String,
  })
  content: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  owner?: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    default: null,
  })
  author: User;
}

export const JournalSchema = SchemaFactory.createForClass(Journal);

JournalSchema.index({
  owner: 1,
});
