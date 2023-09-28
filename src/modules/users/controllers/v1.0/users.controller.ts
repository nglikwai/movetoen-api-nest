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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import * as _ from 'lodash';

import { AuthenticatedGuard } from '@modules/auth/guards/authenticated.guard';

import { UsersService } from '../../users.service';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto/createUser.dto';
import { SearchUsersGetV1_0ReqDto } from './dto/searchUserGetReq.dto';
import { SearchUsersGetV1_0ResDto } from './dto/searchUserGetRes.dto';
import { UpdateUserRequestDto, UpdateUserResponseDto } from './dto/updateUser.dto';

const version = '1.0';

@ApiTags(`User ${version}`)
@Controller({
  path: 'users',
  version,
})
@Injectable()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  async create(@Body() user: CreateUserRequestDto) {
    const createdUser = await this.usersService.create(user);
    return _.omit(createdUser, ['password', '__v']);
  }

  // @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: SearchUsersGetV1_0ResDto,
  })
  findUsers(@Query() query: SearchUsersGetV1_0ReqDto) {
    return this.usersService.find(query);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateUserResponseDto,
  })
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  @ApiBody({ type: UpdateUserRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateUserResponseDto,
  })
  async update(@Param('id') id: string, @Body() user: UpdateUserRequestDto) {
    return this.usersService.update(id, user);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
