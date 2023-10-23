/* eslint-disable no-underscore-dangle */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CreateLuggageDto } from './dto/create-luggage.dto';
import { UpdateLuggageDto } from './dto/update-luggage.dto';
import { Luggage, LuggageDocument } from './schemas/luggage.schema';

@Injectable()
export class LuggagesService {
  constructor(@InjectModel(Luggage.name) private luggageModel: Model<LuggageDocument>) {}

  create(createLuggageDto: CreateLuggageDto) {
    const luggage = new this.luggageModel(createLuggageDto);
    return luggage.save();
  }

  findAll(tripId: string) {
    if (!tripId) return new BadRequestException('Trip id is required');
    return this.luggageModel.find({ trip: tripId }).populate({ path: 'user', select: ['-password'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} luggage`;
  }

  update(id: mongoose.Types.ObjectId, updateLuggageDto: UpdateLuggageDto) {
    return this.luggageModel.findByIdAndUpdate(id, updateLuggageDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} luggage`;
  }
}
