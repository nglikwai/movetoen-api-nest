import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import mongoose from 'mongoose';

import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { PlannersService } from './planners.service';

@ApiTags('planners')
@Controller({ version: '1', path: 'planners' })
export class PlannersController {
  constructor(private readonly plannersService: PlannersService) {}

  @Post()
  create(@Body() createPlannerDto: CreatePlannerDto) {
    return this.plannersService.create(createPlannerDto);
  }

  @Get()
  findAll() {
    return this.plannersService.findAll();
  }

  @Get(':tripId')
  findOne(@Param('tripId') tripId: mongoose.Types.ObjectId) {
    return this.plannersService.findOne(tripId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlannerDto: UpdatePlannerDto) {
    return this.plannersService.update(id, updatePlannerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plannersService.remove(+id);
  }
}
