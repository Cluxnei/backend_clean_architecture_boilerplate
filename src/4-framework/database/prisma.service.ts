import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isLocal } from '@shared/env';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger = new Logger(PrismaService.name, {
    timestamp: true,
  });

  constructor() {
    super(
      isLocal()
        ? {
            log: [
              { level: 'query', emit: 'event' },
              { level: 'info', emit: 'event' },
              { level: 'warn', emit: 'event' },
              { level: 'error', emit: 'event' },
            ],
          }
        : {},
    );
    this.logger.debug('new service instance');
  }

  async onModuleInit() {
    if (isLocal()) {
      (this as any).$on('query', (e: any) =>
        this.logger.debug(e?.query ?? e?.message),
      );
      (this as any).$on('info', (e: any) =>
        this.logger.debug(e?.query ?? e?.message),
      );
      (this as any).$on('warn', (e: any) =>
        this.logger.debug(e?.query ?? e?.message),
      );
      (this as any).$on('error', (e: any) =>
        this.logger.debug(e?.query ?? e?.message),
      );
    }
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
