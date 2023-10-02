import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.questionModel.create({ ...createQuestionDto });
  }

  findAll() {
    return this.questionModel.find({});
  }

  findOne(id: string) {
    return `This action returns a #${id} note`;
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true });
  }

  remove(id: string) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
