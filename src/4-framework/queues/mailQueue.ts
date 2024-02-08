import { IMailQueue } from '@business/queues/mailQueue';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailChannel, MailOptions } from '@business/services/mailService';
import {
  IAwsSqsService,
  IAwsSqsServiceToken,
} from '@business/services/awsSqsService';
import { envOrThrow } from '@shared/env';
import md5 from 'crypto-js/md5';
import CryptoJS from 'crypto-js';

@Injectable()
export class MailQueue implements IMailQueue {
  private readonly logger: Logger = new Logger(MailQueue.name, {
    timestamp: true,
  });

  constructor(
    @Inject(IAwsSqsServiceToken) private readonly awsSqsService: IAwsSqsService,
  ) {
    this.logger.debug('new queue instance');
  }

  async add(input: MailOptions, channel?: MailChannel): Promise<void> {
    const payload = JSON.stringify({ ...input, channel });
    await this.awsSqsService.sendMessage({
      QueueUrl: envOrThrow('SQS_MAIL_QUEUE_URL'),
      MessageBody: payload,
      MessageGroupId: `MAIL-${channel}`.toUpperCase(),
      MessageDeduplicationId: md5(payload).toString(CryptoJS.enc.Hex),
    });
    this.logger.verbose('added job to queue');
  }
}
