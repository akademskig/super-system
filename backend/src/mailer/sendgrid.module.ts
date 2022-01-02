import { Module } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import MailService from './mail.service';
import { config } from 'dotenv';
@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: config().parsed['SG_API_KEY'],
    }),
  ],
  providers: [MailService],
})
export class SendgridModule {}
