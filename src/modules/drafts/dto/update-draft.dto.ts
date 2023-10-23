import { IsString } from 'class-validator';

export class UpdateDraftDto {
  @IsString()
  draftContent: string;
}
