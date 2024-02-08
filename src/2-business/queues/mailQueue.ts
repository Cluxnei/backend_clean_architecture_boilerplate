import { MailChannel, MailOptions } from '@business/services/mailService';

export interface IMailQueue {
  add: (input: MailOptions, channel?: MailChannel) => Promise<void>;
}

export const IMailQueueToken = Symbol('IMailQueue');
