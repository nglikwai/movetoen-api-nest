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

  async findOne(tripId: mongoose.Types.ObjectId) {
    let draft = await this.draftModel.findOne({ trip: tripId });
    if (!draft) {
      draft = await this.draftModel.create({ trip: tripId });
    }
    return draft;
  }

  update(tripId: mongoose.Types.ObjectId, updateDraftDto: UpdateDraftDto) {
    return this.draftModel.findOneAndUpdate({ trip: tripId }, { content: updateDraftDto.draftContent }, { new: true });
  }
}
