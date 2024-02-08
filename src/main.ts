import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createLogger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { loggingWinstonSettings } from '@framework/config/logging';
import {
  setupInterceptors,
  setupPipes,
  setupPrisma,
  setupServer,
  setupStatic,
  setupSwagger,
} from '@framework/config/app';

async function bootstrap() {
  const loggerInstance = createLogger(loggingWinstonSettings());
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: WinstonModule.createLogger({
      instance: loggerInstance,
    }),
  });
  const logger = app.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
  logger.log('starting application!', 'Bootstrap');
  logger.log('setup static', 'Bootstrap');
  setupStatic(app as unknown as NestExpressApplication);
  logger.log('setup swagger', 'Bootstrap');
  setupSwagger(app);
  logger.log('setup swagger', 'Bootstrap');
  setupPipes(app);
  logger.log('setup interceptors', 'Bootstrap');
  setupInterceptors(app);
  logger.log('setup prisma', 'Bootstrap');
  await setupPrisma(app);
  logger.log('setup server', 'Bootstrap');
  await setupServer(app);
  return logger;
}
const start = Date.now();
bootstrap().then((logger) => {
  const end = Date.now();
  logger.log('application started', 'Bootstrap');
  logger.log(`application bootstrap time: ${end - start} ms`, 'Bootstrap');
});
