import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import mongoose from 'mongoose';

import { DraftsService } from './drafts.service';
import { CreateDraftDto } from './dto/create-draft.dto';
import { UpdateDraftDto } from './dto/update-draft.dto';

@Controller({ version: '1', path: 'drafts' })
export class DraftsController {
  constructor(private readonly draftsService: DraftsService) {}

  @Post()
  create(@Body() createDraftDto: CreateDraftDto) {
    return this.draftsService.create(createDraftDto);
  }

  @Get(':tripId')
  findOne(@Param('tripId') tripId: mongoose.Types.ObjectId) {
    return this.draftsService.findOne(tripId);
  }

  @Patch(':tripId')
  update(@Param('tripId') tripId: mongoose.Types.ObjectId, @Body() updateDraftDto: UpdateDraftDto) {
    return this.draftsService.update(tripId, updateDraftDto);
  }
}
