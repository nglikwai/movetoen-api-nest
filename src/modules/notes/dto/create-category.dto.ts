import { IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCategoryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  trip: mongoose.Types.ObjectId;
}
