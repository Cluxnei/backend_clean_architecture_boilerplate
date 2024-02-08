import { Module } from '@nestjs/common';
import { HealthCheckController } from '@framework/controllers/healthCheck.controller';
import { GetHealthCheckStatusUseCase } from '@business/useCases/healthCheck/getHealthCheckStatusUseCase';

@Module({
  providers: [GetHealthCheckStatusUseCase],
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
