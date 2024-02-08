import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@framework/database/prisma.module';
import { envValidationSchema } from '@framework/config/env';
import { loggingWinstonSettings } from '@framework/config/logging';
import { WinstonModule } from 'nest-winston';
import { HealthCheckModule } from '@container/ioc/healthCheck.module';
import { registerHttp } from '@framework/config/http';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    WinstonModule.forRoot(loggingWinstonSettings()),
    registerHttp(),
    PrismaModule,
    HealthCheckModule,
  ],
  providers: [],
})
export class AppModule {}
