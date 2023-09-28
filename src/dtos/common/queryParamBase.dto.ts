import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose, Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';

import {
  LISTING_LIMIT_DEFAULT,
  LISTING_LIMIT_MAX,
  LISTING_LIMIT_MIN,
} from '@constants/index';
import { Default } from '@decorators/customTransformer';

export const queryParamBaseValidExample = {
  page: 1,
  limit: 12,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};

@Exclude()
export class QueryParamBaseDto {
  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Default(1)
  @Type(() => Number)
  @ApiProperty({
    example: queryParamBaseValidExample.page,
    type: 'number',
    required: false,
    default: 1,
    minimum: 1,
  })
  readonly page?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  @Default(LISTING_LIMIT_DEFAULT)
  @Type(() => Number)
  @ApiProperty({
    example: queryParamBaseValidExample.limit,
    type: 'number',
    required: false,
    minimum: LISTING_LIMIT_MIN,
    maximum: LISTING_LIMIT_MAX,
    default: LISTING_LIMIT_DEFAULT,
  })
  readonly limit?: number;

  @Expose()
  @IsOptional()
  @ApiProperty({
    example: queryParamBaseValidExample.sortBy,
    type: 'string',
    enum: ['createdAt', 'updatedAt', 'status'],
    required: false,
    default: 'createdAt',
  })
  @IsIn(['createdAt', 'updatedAt', 'status'])
  readonly sortBy?: string;

  @Expose()
  @IsOptional()
  @Default('desc')
  @IsIn(['asc', 'desc'])
  @ApiProperty({
    example: queryParamBaseValidExample.sortDirection,
    type: 'string',
    enum: ['asc', 'desc'],
    required: false,
    default: 'desc',
  })
  readonly sortDirection?: string;
}
