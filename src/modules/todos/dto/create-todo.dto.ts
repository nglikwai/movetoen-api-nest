import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  urgent: number;

  @ApiProperty()
  @IsOptional()
  status: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  person: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  deadline: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  plan: mongoose.Types.ObjectId;
}
