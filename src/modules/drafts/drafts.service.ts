import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';
import { Draft, DraftDocument } from './schemas/draft.schema';

@Injectable()
export class DraftsService {
  constructor(@InjectModel(Draft.name) private draftModel: Model<DraftDocument>) {}
  create(createDraftDto: CreateDraftDto) {
    return this.draftModel.create(createDraftDto);
  }

  async findByOneTrip(tripId: mongoose.Types.ObjectId) {
    const drafts = await this.draftModel.find({ trip: tripId });
    if (!drafts) {
      return [await this.draftModel.create({ trip: tripId })];
    }
    return drafts;
  }

  update(draftId: mongoose.Types.ObjectId, updateDraftDto: UpdateDraftDto) {
    return this.draftModel.findByIdAndUpdate(draftId, updateDraftDto, { new: true });
  }

  remove(draftId: mongoose.Types.ObjectId) {
    return this.draftModel.findByIdAndDelete(draftId);
  }
}
