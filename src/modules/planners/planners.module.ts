import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PlannersController } from './planners.controller';
import { PlannersService } from './planners.service';
import { Planner, PlannerSchema } from './schemas/planner.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Planner.name, schema: PlannerSchema }])],
  controllers: [PlannersController],
  providers: [PlannersService],
})
export class PlannersModule {}
