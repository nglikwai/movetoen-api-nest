import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private questionModel: Model<OrderDocument>) {}
  create(createOrderDto: CreateOrderDto) {
    return this.questionModel.create({ ...createOrderDto, order: [] });
  }

  update(id: mongoose.Schema.Types.ObjectId, updateQuestionDto: UpdateQuestionDto) {
    return this.questionModel.findByIdAndUpdate(id, updateQuestionDto, { new: true });
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
