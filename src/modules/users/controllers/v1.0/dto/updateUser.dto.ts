import { PartialType } from '@nestjs/swagger';

import { CreateUserRequestDto } from './createUser.dto';
import { UserResponseDto } from './user.dto';

export class UpdateUserRequestDto extends PartialType(CreateUserRequestDto) {}

export class UpdateUserResponseDto extends UserResponseDto {}
