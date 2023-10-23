import { IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  order: mongoose.Types.ObjectId[];

  @IsOptional()
  @IsString()
  trip: mongoose.Types.ObjectId;
}
