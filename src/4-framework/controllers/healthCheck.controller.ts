import { Controller, Get, HttpCode, Logger, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetHealthCheckStatusUseCase } from '@business/useCases/healthCheck/getHealthCheckStatusUseCase';
import { Response } from 'express';
import { sendUseCaseHttpResponse } from '@utils/response';

@ApiTags('Health check')
@Controller('/healthcheck')
export class HealthCheckController {
  private readonly logger: Logger = new Logger(HealthCheckController.name, {
    timestamp: true,
  });

  constructor(
    private readonly getHealthCheckStatusUseCase: GetHealthCheckStatusUseCase,
  ) {
    this.logger.debug('new instance');
  }
  @Get('/')
  @HttpCode(200)
  @ApiOperation({
    description: 'Route to check if application in alive',
  })
  async healthcheck(@Res() res: Response) {
    return sendUseCaseHttpResponse({
      res,
      resource: await this.getHealthCheckStatusUseCase.execute(),
      loggerInstance: this.logger,
    });
  }
}
