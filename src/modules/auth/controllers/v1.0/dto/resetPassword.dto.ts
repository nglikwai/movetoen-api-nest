import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  resetCode: string;

  @IsString()
  newPassword: string;
}
