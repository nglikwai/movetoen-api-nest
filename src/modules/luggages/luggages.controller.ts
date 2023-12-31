import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import mongoose from 'mongoose';

import { CreateLuggageDto } from './dto/create-luggage.dto';
import { FindAllLuggageQuery } from './dto/find-all-luggage.dto';
import { UpdateLuggageDto } from './dto/update-luggage.dto';
import { LuggagesService } from './luggages.service';

@ApiTags('luggages')
@Controller({ version: '1', path: 'luggages' })
export class LuggagesController {
  constructor(private readonly luggagesService: LuggagesService) {}

  @Post()
  create(@Body() createLuggageDto: CreateLuggageDto) {
    return this.luggagesService.create(createLuggageDto);
  }

  @Get()
  findAll(@Query() findAllLuggageQuery: FindAllLuggageQuery) {
    return this.luggagesService.findAll(findAllLuggageQuery.tripId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.luggagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Types.ObjectId, @Body() updateLuggageDto: UpdateLuggageDto) {
    return this.luggagesService.update(id, updateLuggageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.luggagesService.remove(+id);
  }
}
