import { IsOptional, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
