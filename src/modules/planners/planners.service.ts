import { Injectable } from '@nestjs/common';

import mongoose from 'mongoose';

import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';

@Injectable()
export class PlannersService {
  create(createPlannerDto: CreatePlannerDto) {
    return 'This action adds a new planner';
  }

  findAll() {
    return 'This action returns all planners';
  }

  findOne(tripId: mongoose.Types.ObjectId) {
    return {
      tripId,
      _id: 'dsf2ffsafddsasdasd11',
      tripPlan: Array(10)
        .fill(1)
        .map((_, i) => ({
          day: i + 1,
          spotPlans: [
            {
              time: '09:00',
              location: 'Seoul',
              transport: {
                type: 'train',
                number: 'KTX',
              },
              description: 'A Sea view spot',
              expense: 10000,
            },
          ],
        })),
    };
  }

  update(id: number, updatePlannerDto: UpdatePlannerDto) {
    return `This action updates a #${id} planner`;
  }

  remove(id: number) {
    return `This action removes a #${id} planner`;
  }
}
