import { Module } from '@nestjs/common';
import { IMailServiceToken } from '@business/services/mailService';
import { MailService } from '@framework/services/mailService';
import { IMailQueueToken } from '@business/queues/mailQueue';
import { MailQueue } from '@framework/queues/mailQueue';

@Module({
  imports: [],
  providers: [
    { provide: IMailServiceToken, useClass: MailService },
    { provide: IMailQueueToken, useClass: MailQueue },
  ],
  exports: [IMailServiceToken],
})
export class MailModule {}
