import { Module } from '@nestjs/common';
import { IMailServiceToken } from '@business/services/mailService';
import { MailService } from '@framework/services/mailService';

@Module({
  imports: [],
  providers: [{ provide: IMailServiceToken, useClass: MailService }],
  exports: [IMailServiceToken],
})
export class MailModule {}
