import { Module } from '@nestjs/common';
import { IMailServiceToken } from '@business/services/mailService';
import { MailService } from '@framework/services/mailService';
import { IMailQueueToken } from '@business/queues/mailQueue';
import { MailQueue } from '@framework/queues/mailQueue';
import { AwsSqsModule } from '@container/ioc/awsSqs.module';

@Module({
  imports: [AwsSqsModule],
  providers: [
    { provide: IMailServiceToken, useClass: MailService },
    { provide: IMailQueueToken, useClass: MailQueue },
  ],
  exports: [IMailServiceToken, IMailQueueToken],
})
export class MailModule {}
