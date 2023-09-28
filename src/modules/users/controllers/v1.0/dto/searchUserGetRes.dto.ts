import { ApiProperty } from '@nestjs/swagger';

import { Expose, Type } from 'class-transformer';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';

import {
  PaginationDto,
  paginationValidExample,
} from '@dtos/common/pagination.dto';

import { UserResponseDto, userResponseValidExample } from './user.dto';

export const searchUsersGetV1_0ReqValidExample = {
  userKey: [userResponseValidExample.userKey, 2, 3],
};

export const searchUsersGetV1_0ResValidExample = {
  ...paginationValidExample,
  result: [userResponseValidExample],
};

export class SearchUsersGetV1_0ResDto extends PaginationDto<UserResponseDto> {
  @Expose()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserResponseDto)
  @ApiProperty({
    example: searchUsersGetV1_0ResValidExample.result,
    type: UserResponseDto,
    isArray: true,
  })
  readonly result: UserResponseDto[];
}
