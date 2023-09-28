import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { JournalResponseDto } from './journal.dto';

export class CreateJournalRequestDto {
  @Expose()
  @IsString()
  @ApiProperty({
    example: 'Started journaling today!\nI went to',
  })
  content!: string;

  @Expose()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'author key',
  })
  owner: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'author key',
  })
  author?: number;
}

export class CreateJournalResponseDto extends JournalResponseDto {}
