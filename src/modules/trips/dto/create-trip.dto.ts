import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { IsObjectId } from 'src/validator/isObjectId';

import { TripStatusEnum } from '@enums/trip.enum';

export class CreateTripDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObjectId()
  user: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(TripStatusEnum)
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  start_date: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  end_date: string;
}
