import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { SplitString } from '@decorators/customTransformer';
import { paginationValidExample } from '@dtos/common/pagination.dto';
import { QueryParamBaseDto } from '@dtos/common/queryParamBase.dto';

import { userResponseValidExample } from './user.dto';

export const searchUsersGetV1_0ReqValidExample = {
  userKey: [userResponseValidExample.userKey, 2, 3],
};

export const searchUsersGetV1_0ResValidExample = {
  ...paginationValidExample,
  result: [userResponseValidExample],
};

@Exclude()
export class SearchUsersGetV1_0ReqDto extends QueryParamBaseDto {
  @Expose()
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  @SplitString()
  @ApiProperty({
    description: 'search user keys, accept inputs separated by commas',
    example: searchUsersGetV1_0ReqValidExample.userKey.join(','),
    type: String,
    required: false,
  })
  readonly userKey?: string[];

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'email@gmail.com',
    type: String,
    required: false,
  })
  readonly email?: string;
}
