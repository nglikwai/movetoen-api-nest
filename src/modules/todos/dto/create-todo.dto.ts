import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  urgent: number;

  @IsOptional()
  status: number;

  @IsString()
  @IsOptional()
  person: string;

  @IsString()
  @IsOptional()
  deadline: string;
}
