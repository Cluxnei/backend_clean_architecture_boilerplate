import { Module } from '@nestjs/common';
import { HealthCheckController } from '@framework/controllers/healthCheck.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
