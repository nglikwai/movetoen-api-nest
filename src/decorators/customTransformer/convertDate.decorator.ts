import { Transform } from 'class-transformer';
import { get, isString } from 'lodash';

// @ConvertDate is to be used with @IsNumber() decorator
// The reason for using obj instead of the value is because if value is a string
// @IsNumber() will convert string to NaN implicitly
export const ConvertDate = (key: string) => {
  return Transform(
    ({ obj }) => {
      const date = get(obj, key);
      return isString(date) ? new Date(date).getTime() : date;
    },
    { toClassOnly: true }
  );
};

// Transform String to Date
export const ParseDate = (): any => {
  return Transform(({ value }) => (isString(value) ? new Date(value) : value), {
    toClassOnly: true,
  });
};
