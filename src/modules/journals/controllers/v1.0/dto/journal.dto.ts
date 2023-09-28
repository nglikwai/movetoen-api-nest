import { ApiProperty, PartialType } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { MONGO_OBJECT_ID_FIELD, USER_KEY_FIELD } from '@constants/fakers';
import { CONTENT_FIELD } from '@constants/fakers/journal.faker.constants';

export const journalEntityValidExample = {
  _id: MONGO_OBJECT_ID_FIELD,
  content: CONTENT_FIELD,
  author: USER_KEY_FIELD,
  owner: USER_KEY_FIELD,
};

export class JournalEntity {
  @Expose()
  @ApiProperty({
    // eslint-disable-next-line no-underscore-dangle
    example: journalEntityValidExample._id,
  })
  @IsString()
  _id: string;

  @Expose()
  @ApiProperty({
    example: journalEntityValidExample.content,
  })
  @IsString()
  content: string;

  @Expose()
  @ApiProperty({
    example: journalEntityValidExample.owner,
  })
  @IsString()
  owner: string;

  @Expose()
  @ApiProperty({
    example: journalEntityValidExample.author,
  })
  @IsOptional()
  @IsString()
  author?: string;

  constructor(partial: Partial<JournalEntity>) {
    Object.assign(this, partial);
  }
}

export const journalResponseValidExample = {
  _id: MONGO_OBJECT_ID_FIELD,
  content: CONTENT_FIELD,
  owner: USER_KEY_FIELD,
  author: USER_KEY_FIELD,
};

export class JournalResponseDto extends PartialType(JournalEntity) {}
