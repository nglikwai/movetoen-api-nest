import { ApiProperty } from '@nestjs/swagger';

import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ConvertDate } from 'src/decorators/customTransformer/convertDate.decorator';

import {
  EMAIL_FIELD,
  TIME_NOW_FIELD,
  USER_ACCOUNT_ID_FIELD,
  USER_FIELD,
} from '../constants/fakers';

export const basicFieldsValidExample = {
  createdBy: USER_FIELD,
  updatedBy: USER_FIELD,
  createdByEmail: EMAIL_FIELD,
  updatedByEmail: EMAIL_FIELD,
  updatedAt: TIME_NOW_FIELD,
  createdAt: TIME_NOW_FIELD,
};

export const basicFieldsValidExampleV2 = {
  createdBy: USER_ACCOUNT_ID_FIELD,
  updatedBy: USER_ACCOUNT_ID_FIELD,
  createdByEmail: EMAIL_FIELD,
  updatedByEmail: EMAIL_FIELD,
  updatedAt: TIME_NOW_FIELD,
  createdAt: TIME_NOW_FIELD,
};

@Exclude()
export class BasicFieldsDto {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: basicFieldsValidExample.createdBy,
    type: 'string',
    required: false,
  })
  readonly createdBy?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: basicFieldsValidExample.updatedBy,
    type: 'string',
    required: false,
  })
  readonly updatedBy?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: basicFieldsValidExample.createdByEmail,
    type: 'string',
    required: false,
  })
  readonly createdByEmail?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: basicFieldsValidExample.updatedByEmail,
    type: 'string',
    required: false,
  })
  readonly updatedByEmail?: string;

  @Expose()
  @IsOptional()
  @ConvertDate('updatedAt')
  @IsNumber()
  @ApiProperty({
    example: basicFieldsValidExample.updatedAt,
    type: 'number',
    required: false,
  })
  readonly updatedAt?: number;

  @Expose()
  @IsOptional()
  @ConvertDate('createdAt')
  @IsNumber()
  @ApiProperty({
    example: basicFieldsValidExample.createdAt,
    type: 'number',
    required: false,
  })
  readonly createdAt?: number;
}
