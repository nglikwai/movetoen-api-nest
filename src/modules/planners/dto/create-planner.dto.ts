import { IsArray, IsString } from 'class-validator';
import mongoose, { mongo } from 'mongoose';
import { IsObjectId } from 'src/validator/isObjectId';

export class CreatePlannerDto {
  @IsString()
  title: string;

  @IsArray()
  tripPlan: any[];

  @IsObjectId()
  tripId: mongoose.Types.ObjectId;
}
