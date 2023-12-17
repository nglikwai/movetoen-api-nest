import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { Planner, PlannerDocument } from './schemas/planner.schema';

@Injectable()
export class PlannersService {
  constructor(@InjectModel(Planner.name) private plannerModel: Model<PlannerDocument>) {}
  create(createPlannerDto: CreatePlannerDto) {
    return this.plannerModel.create(createPlannerDto);
  }

  findAll() {
    return 'This action returns all planners';
  }

  findOne(tripId: mongoose.Types.ObjectId) {
    return this.plannerModel.findOne({ tripId });
  }

  update(tripId: string, updatePlannerDto: UpdatePlannerDto) {
    return this.plannerModel.findOneAndUpdate({ tripId }, updatePlannerDto);
  }

  remove(id: number) {
    return `This action removes a #${id} planner`;
  }
}
