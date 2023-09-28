/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { moveElementInArray } from '@utils/index';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async create() {
    const categories = await this.categoryModel.find();
    const order = await this.orderModel.findOne();
    const category = new this.categoryModel({
      title: 'New Category',
    });
    void category.save();

    order.order = [category._id, ...order.order];
    void order.save();

    return order.order.map((o) =>
      [{ ...category.toObject(), isNew: true }, ...categories].find((c) => c._id.toString() === o)
    );
  }

  async findAll() {
    const categories = await this.categoryModel.find({});
    return this.orderCategory(categories);
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateNoteDto);
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    const order = await this.orderModel.findOne();
    order.order = order.order.filter((o) => o !== id);
    void order.save();
    return category;
  }

  async orderCategory(categories) {
    const { order } = await this.orderModel.findOne();
    return order.map((o) => categories.find((c: CategoryDocument) => c._id.toString() === o));
  }

  async changePosition(body) {
    const { targetId, catId } = body;

    const order = await this.orderModel.findOne();
    const neworder = moveElementInArray(order.order, catId, targetId);
    order.order = neworder;
    void order.save();

    const categorys = await this.categoryModel.find();

    const orderedCategorys = neworder.map((o) => categorys.find((c) => c._id.toString() === o));
    return orderedCategorys;
  }
}
