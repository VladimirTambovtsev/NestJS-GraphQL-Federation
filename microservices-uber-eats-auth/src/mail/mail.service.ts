import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import Mailgun from 'mailgun.js';
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

import { IMailGunData } from './mail.interface';

@Injectable()
export class MailService {
  private mg;

  constructor(private readonly configService: ConfigService) {
    const mg = mailgun.client({
      username: 'api',
      key: this.configService.get<string>('MAILGUN_API_KEY'),
    });
    this.mg = mg;
  }

  send(mailData: IMailGunData) {
    this.mg.messages
      .create('sandboxc6ca8ab4fc434bb187f4d4d7923c8705.mailgun.org', {
        from: `${mailData.from} <mailgun@sandboxc6ca8ab4fc434bb187f4d4d7923c8705.mailgun.org>`,
        to: [mailData.to],
        subject: mailData.subject,
        html: mailData.html,
        'recipient-variables': JSON.stringify(mailData.recipientVars),
      })
      .then((msg) => console.log(msg))
      .catch((err) => console.log(err));
  }
}
