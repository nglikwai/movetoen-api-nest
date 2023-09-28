import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FilterQuery, Model } from 'mongoose';

import { CreateJournalRequestDto } from './controllers/v1.0/dto/createJournal.dto';
import { UpdateJournalRequestDto } from './controllers/v1.0/dto/updateJournal.dto';
import { Journal, JournalDocument } from './schemas/journals.schema';

@Injectable()
export class JournalsService {
  constructor(
    @InjectModel(Journal.name) private journalModel: Model<JournalDocument>
  ) {}
  async create(
    createJournalRequestDto: CreateJournalRequestDto
  ): Promise<Journal> {
    const createdPost = new this.journalModel(createJournalRequestDto);
    return createdPost.save();
  }

  async findOne(
    filter: FilterQuery<JournalDocument>,
    select?: string | string[]
  ) {
    const query = this.journalModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  async findById(id: string): Promise<Journal> {
    return await this.journalModel
      .findById(id)
      .populate('author', '-password')
      .exec();
  }

  async update(
    id: string,
    updateJournalRequestDto: UpdateJournalRequestDto
  ): Promise<Journal> {
    return await this.journalModel.findByIdAndUpdate(
      id,
      updateJournalRequestDto,
      {
        new: true,
      }
    );
  }

  async remove(id: string): Promise<any> {
    return await this.journalModel.findByIdAndRemove(id);
  }

  addAuthor(journalId: string, authorKey: string) {
    return this.journalModel.findByIdAndUpdate(
      journalId,
      { $addToSet: { author: authorKey } },
      { new: true }
    );
  }

  removeAuthor(journalId: string, authorKey: string) {
    return this.journalModel.findByIdAndUpdate(
      journalId,
      { $pull: { author: authorKey } },
      { new: true }
    );
  }

  async getAuthor(journalId: string) {
    const journal = await this.journalModel
      .findById(journalId)
      .populate('author');
    return journal.author;
  }
}
