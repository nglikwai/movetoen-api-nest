import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import {
  REQUEST_ID_FIELD,
  REQUEST_METHOD_FIELD,
  REQUEST_PATH_FIELD,
} from '@constants/fakers';

export const requestInfoValidExample = {
  requestID: REQUEST_ID_FIELD,
  path: REQUEST_PATH_FIELD,
  method: REQUEST_METHOD_FIELD,
};

@Exclude()
export class RequestInfoDto {
  @Expose()
  @IsString()
  readonly requestID: string;

  @Expose()
  @IsString()
  readonly path: string;

  @Expose()
  @IsString()
  readonly method: string;
}
