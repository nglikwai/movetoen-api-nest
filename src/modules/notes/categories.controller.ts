import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { UpdateQuestionDto } from './dto/update-question.dto';

@ApiTags('notes')
@Controller({ version: '1', path: 'categories' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create() {
    return this.categoriesService.create();
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Put('change-position')
  changePosition(@Body() body) {
    return this.categoriesService.changePosition(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateQuestionDto) {
    return this.categoriesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
