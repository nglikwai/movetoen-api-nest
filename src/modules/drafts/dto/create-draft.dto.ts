import mongoose from 'mongoose';
import { IsObjectId } from 'src/validator/isObjectId';

export class CreateDraftDto {
  @IsObjectId()
  trip: mongoose.Schema.Types.ObjectId;
}
