import { Controller } from '@nestjs/common';

import { EmailsService } from './emails.service';

@Controller({ path: 'emails', version: '1.0' })
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}
}
