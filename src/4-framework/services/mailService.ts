import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { failedSendMail } from '@business/errors/mail';
import {
  IMailService,
  MailDriver,
  MailOptions,
  SendMailOutputDto,
} from '@business/services/mailService';
import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '@shared/either';
import { handleErrorLog, IError } from '@shared/error';
import { envOrThrow } from '@shared/env';

@Injectable()
export class MailService implements IMailService {
  private readonly logger: Logger = new Logger(MailService.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('new service instance');
  }

  private buildAwsSesClient(): SESClient {
    return new SESClient({
      region: envOrThrow('AWS_SES_REGION'),
      credentials: {
        accessKeyId: envOrThrow('AWS_SES_KEY'),
        secretAccessKey: envOrThrow('AWS_SES_SECRET'),
      },
    });
  }

  private async sendViaAwsSes(
    options: MailOptions,
  ): Promise<Either<IError, SendMailOutputDto>> {
    try {
      const client = this.buildAwsSesClient();
      const sendMailCommand = new SendEmailCommand({
        Destination: {
          ToAddresses: options.to,
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: options.html,
            },
          },
          Subject: {
            Data: options.subject,
            Charset: 'UTF-8',
          },
        },
        Source: envOrThrow('AWS_SES_FROM_EMAIL'),
      });
      const response = await client.send(sendMailCommand);
      return right({ messageId: response.MessageId });
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(failedSendMail);
    }
  }

  async send(
    options: MailOptions,
    driver: MailDriver = 'AWS-SES',
  ): Promise<Either<IError, SendMailOutputDto>> {
    if (driver === 'AWS-SES') {
      return this.sendViaAwsSes(options);
    }
    return left(failedSendMail);
  }
}
