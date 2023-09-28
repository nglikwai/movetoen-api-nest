/* eslint-disable no-underscore-dangle */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Injectable,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from '@modules/auth/guards/authenticated.guard';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UsersService } from '@modules/users/users.service';

import { JournalsService } from '../../journals.service';
import {
  CreateJournalRequestDto,
  CreateJournalResponseDto,
} from './dto/createJournal.dto';
import {
  UpdateJournalRequestDto,
  UpdateJournalResponseDto,
} from './dto/updateJournal.dto';

const version = '1.0';

@ApiTags(`Journal ${version}`)
@Controller({
  path: 'journals',
  version,
})
@Injectable()
export class JournalsController {
  constructor(
    private readonly journalsService: JournalsService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateJournalResponseDto,
  })
  async create(@Body() createJournalRequestDto: CreateJournalRequestDto) {
    try {
      const user = await this.usersService.findOne({
        userKey: createJournalRequestDto.owner,
      });
      return this.journalsService.create({
        ...createJournalRequestDto,
        owner: user._id,
        author: user._id,
      });
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateJournalResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.journalsService.findById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  @ApiBody({ type: CreateJournalRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateJournalRequestDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateJournalRequestDto: UpdateJournalRequestDto
  ) {
    return this.journalsService.update(id, updateJournalRequestDto);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param('id') id: string) {
    return this.journalsService.remove(id);
  }
}
