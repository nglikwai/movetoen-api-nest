import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsInt } from 'class-validator';

import { NUMBER_FIELD } from '@constants/fakers';

export const paginationValidExample = {
  total: NUMBER_FIELD,
  page: NUMBER_FIELD,
  limit: NUMBER_FIELD,
};

interface PaginationInterface<T> {
  total: number;
  limit: number;
  page: number;
  result: T[];
}

@Exclude()
export class PaginationDto<T> implements PaginationInterface<T> {
  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.total,
    type: 'number',
  })
  readonly total: number;

  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.page,
    type: 'number',
  })
  readonly page: number;

  @Expose()
  @IsInt()
  @ApiProperty({
    example: paginationValidExample.limit,
    type: 'number',
  })
  readonly limit: number;

  readonly result: T[];
}
