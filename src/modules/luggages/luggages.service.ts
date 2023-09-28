import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { CreateLuggageDto } from './dto/create-luggage.dto';
import { UpdateLuggageDto } from './dto/update-luggage.dto';
import { Luggage, LuggageDocument } from './schemas/luggage.schema';

@Injectable()
export class LuggagesService {
  constructor(@InjectModel(Luggage.name) private luggageModel: Model<LuggageDocument>) {}

  create(createLuggageDto: CreateLuggageDto) {
    return this.luggageModel.find({});
  }

  findAll() {
    return this.luggageModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} luggage`;
  }

  update(id: number, updateLuggageDto: UpdateLuggageDto) {
    return `This action updates a #${id} luggage`;
  }

  remove(id: number) {
    return `This action removes a #${id} luggage`;
  }
}
