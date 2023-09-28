import { Transform } from 'class-transformer';
import { get, toLower } from 'lodash';

// used to parse Boolean in DTO.  Currently all non-empty value passed
// through query string is considered true if the field is declared type boolean
// Issue: https://stackoverflow.com/questions/59046629/boolean-parameter-in-request-body-is-always-true-in-nestjs-api
// must enter key which is the parameter field
export const ParseBoolean = (key: string) => {
  return Transform(
    ({ obj }) => {
      const value = get(obj, key);
      if (typeof value !== 'string') {
        return value;
      } else {
        switch (toLower(value)) {
          case 'true':
            return true;
          case 'false':
            return false;
          default:
            return value;
        }
      }
    },
    { toClassOnly: true }
  );
};
