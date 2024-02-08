import { Either } from '@shared/either';
import { IError } from '@shared/error';

export type MailDriver = 'AWS-SES';
export type MailOptions = {
  to: string[];
  subject: string;
  html: string;
};

export type SendMailOutputDto = { messageId: string };

export interface IMailService {
  send: (
    options: MailOptions,
    driver?: MailDriver,
  ) => Promise<Either<IError, SendMailOutputDto>>;
}

export const IMailServiceToken = Symbol('IMailService');
