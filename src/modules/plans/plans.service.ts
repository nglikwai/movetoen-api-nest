import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import mongoose, { Model } from 'mongoose';

import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from './schemas/plan.schema';

@Injectable()
export class PlansService {
  constructor(@InjectModel(Plan.name) private planModel: Model<PlanDocument>) {}

  create(createPlanDto: CreatePlanDto) {
    return this.planModel.create(createPlanDto);
  }

  findAll(tripId: mongoose.Types.ObjectId) {
    if (!tripId) {
      return null;
    }
    return this.planModel.find({ trip: tripId }).sort({ createdAt: -1 });
  }

  findOne(tripId: string) {
    return this.planModel.find({ trip: tripId });
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return this.planModel.findByIdAndUpdate(id, updatePlanDto);
  }

  remove(id: string) {
    return `This action removes a #${id} plan`;
  }
}
