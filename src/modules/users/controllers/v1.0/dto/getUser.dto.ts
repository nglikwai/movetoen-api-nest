import { paginationValidExample } from '@dtos/common/pagination.dto';

import { UserResponseDto, userResponseValidExample } from './user.dto';

export const searchUsersGetV1_0ReqValidExample = {
  userKey: [userResponseValidExample.userKey, 2, 3],
};

export const searchUsersGetV1_0ResValidExample = {
  ...paginationValidExample,
  result: [userResponseValidExample],
};

export class GetUserResponseDto extends UserResponseDto {}
