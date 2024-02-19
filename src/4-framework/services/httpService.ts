import { Injectable, Logger } from '@nestjs/common';
import { Either, left, right } from '@shared/either';
import { handleErrorLog, IError } from '@shared/error';
import { IHttpService } from '@business/services/httpService';
import { HttpService as NestHttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpService implements IHttpService {
  private readonly logger: Logger = new Logger(HttpService.name, {
    timestamp: true,
  });

  constructor(private readonly httpService: NestHttpService) {
    this.logger.debug('new instance');
  }

  async post<T, U extends any>(
    url: string,
    body: U,
  ): Promise<Either<IError, T>> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post<T>(url, body),
      );
      return right(data);
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(error?.response?.data?.message ?? error?.message);
    }
  }
}
