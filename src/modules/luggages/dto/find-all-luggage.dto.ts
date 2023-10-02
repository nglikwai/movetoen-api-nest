import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class FindAllLuggageQuery {
  @ApiProperty({ example: '650774f61bf9ac26b2226eb8' })
  @IsString()
  tripId: string;
}
