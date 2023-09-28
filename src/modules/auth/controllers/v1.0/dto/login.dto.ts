import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';

import { EMAIL_FIELD, USER_KEY_FIELD } from '@constants/fakers';
import { GoogleRegisterPayload } from '@modules/users/controllers/v1.0/dto/createUser.dto';
import { UserEntity } from '@modules/users/controllers/v1.0/dto/user.dto';

export const loginReqDtoValidExample = {
  email: EMAIL_FIELD,
  password: 'password',
};
export const loginResDtoValidExample = {
  userKey: USER_KEY_FIELD,
  email: EMAIL_FIELD,
  status: 'active',
};

export class LoginRequestDto extends OmitType(UserEntity, [
  '_id',
  'userKey',
  'status',
] as const) {}

export class GoogleRegisterRequestDto extends GoogleRegisterPayload {}
