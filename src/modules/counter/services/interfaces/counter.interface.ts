import { Document } from 'mongoose';

import { basicFieldsValidExample } from '@dtos/basicFields.dto';
import { BaseDateFieldInterface } from '@models/base.interface';
import {
  COUNTER_FIELDS,
  COUNTER_KEY_FIELD,
} from '@modules/counter/constants/counter.faker.constant';

export const counterKeyParamValidExample = {
  key: COUNTER_KEY_FIELD,
};
export const counterBaseValidExample = COUNTER_FIELDS;
export const counterFullValidExample = {
  ...COUNTER_FIELDS,
  ...basicFieldsValidExample,
};

export interface CounterBaseInterface {
  key?: string;
  seq?: number;
}

export interface Counter
  extends CounterBaseInterface,
    BaseDateFieldInterface,
    Document {}
