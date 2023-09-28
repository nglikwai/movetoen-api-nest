import { Document, PopulateOptions, QueryOptions, UpdateQuery } from 'mongoose';

import { RequestInfoDto } from '../dtos/common/requestInfo.dto';

export interface ModelFindInputInterface {
  requestInfo?: RequestInfoDto;
  filter: any;
  projection?: string;
  options: {
    sort?: any;
    limit?: number;
    skip?: number;
    populates?: PopulateOptions[];
    [key: string]: any;
  };
}

export interface ModelFindOneInputInterface {
  requestInfo?: RequestInfoDto;
  filter: any;
  projection?: string;
  populates?: PopulateOptions[];
  options?: {
    [key: string]: any;
  };
}

export interface ModelAggregateInputInterface {
  requestInfo?: RequestInfoDto;
  pipeline: any[];
}

export interface ModelCountInputInterface {
  requestInfo?: RequestInfoDto;
  filter: any;
}

export interface ModelCreateInputInterface<T> {
  requestInfo?: RequestInfoDto;
  docs: Partial<T>;
  populates?: PopulateOptions[];
}

export interface UpdateInputInterface<T> {
  requestInfo?: RequestInfoDto;
  conditions: any;
  update: UpdateQuery<T>;
  options?: QueryOptions;
  populates?: PopulateOptions[];
}

export interface DeleteInputInterface {
  conditions: any;
  options?: QueryOptions;
  populates?: PopulateOptions[];
}

export interface BaseDateFieldInterface {
  createdAt: number;
  updatedAt: number;
}

export interface BaseDocumentInterface
  extends Document,
    BaseDateFieldInterface {
  updatedBy: string;
  createdBy: string;
  updatedByEmail: string;
  createdByEmail: string;
}
