import { IsString } from 'class-validator';
import mongoose from 'mongoose';
import { IsObjectId } from 'src/validator/isObjectId';

export class GetByTagParams {
  @IsObjectId()
  tripId: mongoose.Types.ObjectId;

  @IsString()
  tag: string;
}
