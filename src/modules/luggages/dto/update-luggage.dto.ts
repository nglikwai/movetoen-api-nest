import { PartialType } from '@nestjs/swagger';

import { CreateLuggageDto } from './create-luggage.dto';

export class UpdateLuggageDto extends PartialType(CreateLuggageDto) {}
