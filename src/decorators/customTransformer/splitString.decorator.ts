import { Transform } from 'class-transformer';
import * as _ from 'lodash';

export const SplitString = ({
  uniqueItems = false,
  filterEmptyString = true,
}: { uniqueItems?: boolean; filterEmptyString?: boolean } = {}): any => {
  return Transform(
    ({ value }) => {
      let arr = _.isString(value) ? _.split(value, ',') : _.toArray(value);
      arr = filterEmptyString ? arr.filter((item) => !!item) : arr;
      return uniqueItems ? _.uniq(arr) : arr;
    },
    { toClassOnly: true }
  );
};
