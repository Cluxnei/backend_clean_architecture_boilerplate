import { Either } from '@shared/either';
import { IError } from '@shared/error';

export type InputSendSqsMessageDto = {
  QueueUrl: string;
  MessageBody: string;
  DelaySeconds: number;
  MessageAttributes: Record<string, { StringValue: string }>;
  MessageSystemAttributes: Record<string, { StringValue: string }>;
  MessageDeduplicationId: string;
  MessageGroupId: string;
};
export type OutputSendSqsMessageDto = {
  messageId: string;
};

export interface IAwsSqsService {
  sendMessage: (
    input: InputSendSqsMessageDto,
  ) => Promise<Either<IError, OutputSendSqsMessageDto>>;
}

export const IAwsSqsServiceToken = Symbol('IAwsSqsService');
