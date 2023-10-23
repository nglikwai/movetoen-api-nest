import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CategoriesService } from './categories.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
    private categoriesService: CategoriesService
  ) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionModel.create({ ...createQuestionDto });
  }

  async findAll(tripId: mongoose.Types.ObjectId) {
    const categories = await this.categoriesService.findCategoryByTrip(tripId);
    // eslint-disable-next-line no-underscore-dangle
    const categoryIds = categories.map((c) => c._id.toString());
    return this.questionModel.find({ category: { $in: categoryIds } });
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return `This action returns a #${id} note`;
  }

  update(id: mongoose.Schema.Types.ObjectId, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true });
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
