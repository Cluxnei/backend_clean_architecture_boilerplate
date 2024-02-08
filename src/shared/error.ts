import { Logger } from '@nestjs/common';

export interface IError {
  httpCode: number;
  code: string;
  message: string;
  shortMessage: string;
}

export const bindGenericError = (error: Error & any): IError => ({
  code: error?.code ?? 500,
  httpCode: error?.httpCode ?? 500,
  message: error?.message ?? error?.response?.message ?? 'unknown',
  shortMessage: error?.shortMessage ?? '',
});

export const handleErrorLog = (error: Error & any, loggerInstance?: Logger) => {
  loggerInstance?.error?.({
    message: error?.response?.data?.message ?? error?.message ?? 'unknown',
    ...error,
  });
  console.error(error);
};
