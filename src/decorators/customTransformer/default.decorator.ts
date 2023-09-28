/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { plainToInstance, Transform } from 'class-transformer';
import * as _ from 'lodash';

// set default value
export const Default = (defaultValue: any, classType?: any): any => {
  return Transform(
    ({ value }) =>
      !_.isNil(value)
        ? value
        : !_.isNil(classType)
        ? plainToInstance(classType, defaultValue)
        : defaultValue,
    {
      toClassOnly: true,
    }
  );
};

// if value not exists use ref field value
export const DefaultField = (defaultField: string, classType?: any): any => {
  return Transform(({ value, obj }) => {
    return !_.isNil(value)
      ? value
      : !_.isNil(classType)
      ? plainToInstance(classType, obj[defaultField])
      : obj[defaultField];
  });
};
