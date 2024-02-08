import { Injectable, Logger, Scope } from '@nestjs/common';
import { IUseCase } from '@business/useCases/iUseCase';
import { envOrThrow } from '@shared/env';
import { Either, left, right } from '@shared/either';
import { bindGenericError, IError } from '@shared/error';

export type InputGetHealthCheckStatusDto = undefined;
export type OutputGetHealthCheckStatusDto = Either<
  IError,
  {
    status: 'ok' | 'nok';
    app_environment: string;
    node_environment: string;
  }
>;

@Injectable({ scope: Scope.TRANSIENT })
export class GetHealthCheckStatusUseCase
  implements
    IUseCase<InputGetHealthCheckStatusDto, OutputGetHealthCheckStatusDto>
{
  private readonly logger: Logger = new Logger(
    GetHealthCheckStatusUseCase.name,
    { timestamp: true },
  );

  constructor() {
    this.logger.debug('new instance');
  }

  async execute(): Promise<OutputGetHealthCheckStatusDto> {
    try {
      return right({
        node_environment: envOrThrow('NODE_ENV'),
        app_environment: envOrThrow('APP_ENV'),
        status: 'ok',
      });
    } catch (error) {
      return left(bindGenericError(error));
    }
  }
}
