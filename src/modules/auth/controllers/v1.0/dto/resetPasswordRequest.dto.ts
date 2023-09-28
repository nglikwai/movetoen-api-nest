import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { RESET_PASSWORD_EMAIL } from '@constants/fakers';

export const emailExample = RESET_PASSWORD_EMAIL;

export class ResetPasswordRequestDto {
  @IsString()
  @ApiProperty({ example: emailExample })
  email: string;
}
