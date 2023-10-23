import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import mongoose from 'mongoose';

import { AddMemberDto } from './dto/add-member.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { TripsService } from './trips.service';

@ApiTags('Trips 1.0')
@Controller({ version: '1', path: 'trips' })
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.tripsService.findOne(id);
  }

  @Put(':id/members')
  addMember(@Param('id') id: mongoose.Types.ObjectId, @Body() addMemberDto: AddMemberDto) {
    return this.tripsService.addMember(id, addMemberDto);
  }

  @Put(':id/members/remove')
  removeMember(@Param('id') id: mongoose.Types.ObjectId, @Body() addMemberDto: AddMemberDto) {
    return this.tripsService.removeMember(id, addMemberDto);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Types.ObjectId, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Types.ObjectId) {
    return this.tripsService.inactivateTrip(id);
  }
}
