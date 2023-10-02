import { IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  video_url: string;

  @IsOptional()
  @IsString()
  map_url: string;
}
