import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import mongoose from 'mongoose';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('notes')
@Controller({ version: '1', path: 'categories' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query('tripId') tripId: mongoose.Types.ObjectId) {
    return this.categoriesService.findAll(tripId);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Types.ObjectId) {
    return this.categoriesService.findOne(id);
  }

  @Put('change-position')
  changePosition(@Body() body) {
    return this.categoriesService.changePosition(body);
  }

  @Put(':id')
  update(@Param('id') id: mongoose.Types.ObjectId, @Body() updateNoteDto: UpdateQuestionDto) {
    return this.categoriesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Types.ObjectId) {
    return this.categoriesService.remove(id);
  }
}
