/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { moveElementInArray } from '@utils/index';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const order = await this.orderModel.findOne({ trip: createCategoryDto.trip });
    const category = await this.categoryModel.create(createCategoryDto);
    order.order = [category._id, ...order.order];
    console.log(order);
    await order.save();

    return this.findAll(createCategoryDto.trip);
  }

  async findAll(tripId: mongoose.Types.ObjectId) {
    const categories = await this.categoryModel.find({ trip: tripId });
    return this.orderCategory(categories, tripId);
  }

  findOne(id: mongoose.Types.ObjectId) {
    return `This action returns a #${id} note`;
  }

  async update(id: mongoose.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: mongoose.Types.ObjectId) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    const order = await this.orderModel.findOne();
    order.order = order.order.filter((o) => o.toString() !== id.toString());
    void order.save();
    return category;
  }

  findCategoryByTrip(tripId: mongoose.Types.ObjectId) {
    return this.categoryModel.find({ trip: tripId });
  }
  async orderCategory(categories: CategoryDocument[], tripId: mongoose.Types.ObjectId) {
    const order = await this.orderModel.findOne({ trip: tripId });
    console.log(order);
    return order.order
      .map((o) =>
        categories.find((c: CategoryDocument) => {
          return c._id.toString() === o.toString();
        })
      )
      .filter((c) => c);
  }

  async changePosition(body) {
    const { targetId, catId } = body;

    const order = await this.orderModel.findOne();
    const neworder = moveElementInArray(order.order, catId, targetId);
    order.order = neworder;
    void order.save();

    const categorys = await this.categoryModel.find();

    const orderedCategorys = neworder.map((o) => categorys.find((c) => c._id.toString() === o.toString()));
    return orderedCategorys;
  }
}
