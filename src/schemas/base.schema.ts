import { Schema, SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false,
};

export const indexBase = <T>(schema: Schema<T>): void => {
  schema.index({ createdAt: 1 });
  schema.index({ updatedAt: 1 });
};
