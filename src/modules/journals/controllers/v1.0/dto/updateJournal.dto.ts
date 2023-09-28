import { PartialType } from '@nestjs/swagger';

import { CreateJournalRequestDto } from './createJournal.dto';
import { JournalResponseDto } from './journal.dto';

export class UpdateJournalRequestDto extends PartialType(
  CreateJournalRequestDto
) {}

export class UpdateJournalResponseDto extends JournalResponseDto {}
