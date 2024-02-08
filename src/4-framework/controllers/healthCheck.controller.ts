import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { envOrThrow } from '@shared/env';

@ApiTags('Health-check')
@Controller('/healthcheck')
export class HealthCheckController {
  private readonly logger: Logger = new Logger(HealthCheckController.name, {
    timestamp: true,
  });

  constructor() {
    this.logger.debug('new controller instance');
  }
  @Get('/')
  @HttpCode(200)
  healthcheck() {
    return `ok, i'm alive in ${envOrThrow('APP_ENV')} environment`;
  }
}
