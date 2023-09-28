import { Schema } from 'mongoose';

import { schemaOptions } from '@schemas/base.schema';

const counterSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    seq: {
      type: Number,
      default: 0,
    },
  },
  schemaOptions
);
export const CounterSchema = counterSchema;
