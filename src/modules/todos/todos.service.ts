/* eslint-disable no-underscore-dangle */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { PlansService } from '@modules/plans/plans.service';

import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
    private plansService: PlansService
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todoModel.create(createTodoDto);
  }

  async findAll(planId: mongoose.Types.ObjectId) {
    const todos = await this.todoModel
      .find(planId ? { plan: planId } : {})
      .sort({ createdAt: -1 })
      .populate({ path: 'person', select: 'name' });
    // const todos = await this.todoModel.find().sort({ createdAt: -1 });

    return todos;
  }

  async findByTrip(tripId: mongoose.Types.ObjectId) {
    const plans = await this.plansService.findAll(tripId);
    const plansIds = plans.map((plan) => plan._id);
    const data = await Promise.all(
      plansIds.map(async (id: mongoose.Types.ObjectId) => {
        const _todos = await this.findAll(id);
        return _todos;
      })
    );

    const todos = data.flat(1);
    const tags = Array.from(new Set(todos.map((todo) => todo.tag))).filter((e) => e);
    return { todos, tags };
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoModel.findByIdAndUpdate(id, updateTodoDto);
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
