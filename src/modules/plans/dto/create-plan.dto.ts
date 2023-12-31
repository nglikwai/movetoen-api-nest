import { IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePlanDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  trip: mongoose.Schema.Types.ObjectId;
}
