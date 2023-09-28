import { ApiPropertyOptional } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

import { Default } from '@decorators/customTransformer';

@Exclude()
export class OffsetPaginatedReqDto {
  @Expose()
  @ApiPropertyOptional({
    type: Number,
    maximum: 100,
    minimum: 1,
    default: 10,
  })
  @Max(100)
  @Min(1)
  @IsInt()
  @IsOptional()
  @Default(10)
  limit: number;

  @ApiPropertyOptional({
    type: Number,
    minimum: 1,
  })
  @Expose()
  @Min(1)
  @IsInt()
  @IsOptional()
  @Default(1)
  page: number;
}
