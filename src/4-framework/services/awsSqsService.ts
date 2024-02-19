import { Either, right } from '@shared/either';
import { IError } from '@shared/error';
import { envOrThrow } from '@shared/env';
import {
  IAwsSqsService,
  InputSendSqsMessageDto,
  OutputSendSqsMessageDto,
} from '@business/services/awsSqsService';
import { Injectable, Logger } from '@nestjs/common';
import {
  SendMessageCommand,
  SendMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { SendMessageCommandInput } from '@aws-sdk/client-sqs/dist-types/commands/SendMessageCommand';

@Injectable()
export class AwsSqsService implements IAwsSqsService {
  private readonly logger: Logger = new Logger(AwsSqsService.name, {
    timestamp: true,
  });

  private sqsClient: SQSClient | null;

  constructor() {
    this.logger.debug('new instance');
  }

  async sendMessage(
    input: InputSendSqsMessageDto,
  ): Promise<Either<IError, OutputSendSqsMessageDto>> {
    this.buildClient();
    const command: SendMessageCommand = new SendMessageCommand(
      input as SendMessageCommandInput,
    );
    const response: SendMessageCommandOutput =
      await this.sqsClient.send(command);
    return right({
      messageId: response.MessageId,
    });
  }

  private buildClient() {
    if (this.sqsClient) {
      return;
    }
    this.sqsClient = new SQSClient({
      region: envOrThrow('AWS_SQS_REGION'),
      credentials: {
        accessKeyId: envOrThrow('AWS_SQS_KEY'),
        secretAccessKey: envOrThrow('AWS_SQS_SECRET'),
      },
    });
  }
}
