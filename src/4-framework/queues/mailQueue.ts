import { IMailQueue } from '@business/queues/mailQueue';
import { Injectable, Logger } from '@nestjs/common';
import { MailChannel, MailOptions } from '@business/services/mailService';

@Injectable()
export class MailQueue implements IMailQueue {
  private readonly logger: Logger = new Logger(MailQueue.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('new queue instance');
  }

  async add(input: MailOptions, channel?: MailChannel): Promise<void> {
    // TODO add to queue
    this.logger.verbose('added job to queue');
  }
}
