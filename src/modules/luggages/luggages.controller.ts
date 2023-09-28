import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateLuggageDto } from './dto/create-luggage.dto';
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
  findAll() {
    return this.luggagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.luggagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLuggageDto: UpdateLuggageDto) {
    return this.luggagesService.update(+id, updateLuggageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.luggagesService.remove(+id);
  }
}
