import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isLocal } from '@shared/env';

@Injectable()
export class PrismaService extends PrismaClient {
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
}
