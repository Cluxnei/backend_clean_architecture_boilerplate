import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LoggingInterceptor.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('new instance');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method.toUpperCase();
    const start = process.hrtime();
    const memory = process.memoryUsage();
    this.logger.log({ message: `processing: [${method}] ${url}` });
    return next.handle().pipe(
      tap(() => {
        const ms = this.getDurationInMilliseconds(start).toFixed(2);
        const mb = this.getMemoryUsageInMb(memory).toFixed(2);
        this.logger.log({
          message: `processed: [${method}] ${url}`,
          measure: { ms, mb },
        });
      }),
    );
  }

  private getDurationInMilliseconds(start: [number, number]): number {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  }

  private getMemoryUsageInMb(start: NodeJS.MemoryUsage) {
    return (process.memoryUsage().heapUsed - start.heapUsed) / 1000000;
  }
}
