/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-underscore-dangle */

import { Aggregate, Document, Model } from 'mongoose';

import { ConvertMongoObjectIds } from '../decorators/customTransformer/convertMongoObjectIds.decorator';
import {
  DeleteInputInterface,
  ModelAggregateInputInterface,
  ModelCountInputInterface,
  ModelCreateInputInterface,
  ModelFindInputInterface,
  ModelFindOneInputInterface,
  UpdateInputInterface,
} from './base.interface';

export abstract class ModelBaseService<T extends Document> {
  constructor(private readonly _model: Model<T>) {}

  getModel(): Model<T> {
    return this._model;
  }

  @ConvertMongoObjectIds()
  find({
    filter,
    projection,
    options: { populates, ...options },
  }: ModelFindInputInterface): Promise<Partial<T>[]> {
    return this._model
      .find(filter, projection, options)
      .lean()
      .populate(populates)
      .exec() as Promise<Partial<T>[]>;
  }

  @ConvertMongoObjectIds()
  findOne({
    filter,
    projection,
    populates,
    options,
  }: ModelFindOneInputInterface): Promise<Partial<T>> {
    return this._model
      .findOne(filter, projection, options)
      .lean()
      .populate(populates)
      .exec() as Promise<Partial<T>>;
  }

  @ConvertMongoObjectIds()
  aggregate({ pipeline }: ModelAggregateInputInterface): Aggregate<any[]> {
    return this._model.aggregate(pipeline);
  }

  count({ filter }: ModelCountInputInterface): any {
    return this._model.countDocuments(filter);
  }

  @ConvertMongoObjectIds()
  async create({ docs, populates }: ModelCreateInputInterface<T>): Promise<T> {
    if (populates)
      return await (await this._model.create(docs)).populate(populates);
    return await this._model.create(docs);
  }

  @ConvertMongoObjectIds()
  update({
    conditions,
    update,
    options,
    populates,
  }: UpdateInputInterface<T>): Promise<T> {
    update.$inc = {
      ...update.$inc,
      __v: 1,
    };
    return this._model
      .findOneAndUpdate(conditions, update, {
        ...options,
        new: true,
      })
      .lean()
      .populate(populates)
      .exec() as Promise<T>;
  }

  @ConvertMongoObjectIds()
  updateMany({
    conditions,
    update,
    options,
    populates,
  }: UpdateInputInterface<T>) {
    update.$inc = {
      ...update.$inc,
      __v: 1,
    };
    return this._model
      .updateMany(conditions, update, {
        ...options,
        new: true,
      })
      .lean()
      .populate(populates)
      .exec();
  }

  @ConvertMongoObjectIds()
  delete({ conditions, options, populates }: DeleteInputInterface): Promise<T> {
    return this._model
      .findOneAndDelete(conditions, options)
      .lean()
      .populate(populates)
      .exec() as Promise<T>;
  }
}
