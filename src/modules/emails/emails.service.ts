import { Injectable } from '@nestjs/common';

import { CreateEmailDto } from './dto/create-email.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailsService {
  createEmail(createEmailDto: CreateEmailDto) {
    console.log(process.env.SENDGRID_API_KEY);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = createEmailDto;
    sgMail
      .send(msg)
      .then(() => {
        return 'Email sent';
      })
      .catch((error) => {
        throw new Error('Email not sent');
      });
  }
}
