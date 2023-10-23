import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export type Luggage = {
  title: string;
  weight: number;
  size: number;
};

export class CreateLuggageDto {
  @IsOptional()
  @IsString()
  user: mongoose.Types.ObjectId;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  size: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsArray()
  luggage_list: Luggage[];

  @IsOptional()
  @IsString()
  trip: mongoose.Types.ObjectId;
}
