import { Either } from '@shared/either';
import { handleErrorLog, IError } from '@shared/error';
import { HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

export const sendUseCaseHttpResponse = <
  T extends Either<IError, any>,
>(options: {
  resource: T;
  res: Response;
  loggerInstance?: Logger;
  statusCode?: HttpStatus;
}): Response<T['value']> => {
  const { resource, res, loggerInstance, statusCode = 200 } = options;
  if (resource.isLeft()) {
    handleErrorLog(resource.value, loggerInstance);
    return res.status(resource.value.httpCode).json(resource.value);
  }
  return res.status(statusCode).json(resource.value);
};

export const mockExpressResponseObject: () => Partial<Response> = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
});
