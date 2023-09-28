import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserResponseDto } from './user.dto';

export class CreateUserRequestDto {
  @Expose()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'email@gmail.com',
  })
  email!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'password',
  })
  password?: string;
}

export class CreateUserResponseDto extends UserResponseDto {}

export class GoogleRegisterPayload {
  @Expose()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'email@gmail.com',
  })
  email!: string;

  @Expose()
  @IsString()
  @ApiProperty()
  googleAccessToken: string;
}
