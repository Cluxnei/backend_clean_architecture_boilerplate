import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import {
  BadRequestException,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { envOrThrow, isLocal } from '@shared/env';
import { LoggingInterceptor } from '@framework/interceptors/logging.interceptor';

export function setupStatic(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '../../../', 'public'), {
    prefix: '/public/',
  });
}

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle(`Api documentation - ${envOrThrow('APP_NAME')}`)
    .setDescription(`Api for the ${envOrThrow('APP_NAME')} application`)
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    customCssUrl: `${envOrThrow('APP_URL')}/public/SwaggerDark.css`,
  });
}

export function setupPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors
          .filter((error) => error.constraints)
          .map((error) => Object.values({ ...error.constraints }))
          .flat()
          .shift();
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message,
        });
      },
    }),
  );
}

export function setupInterceptors(app: INestApplication) {
  app.useGlobalInterceptors(new LoggingInterceptor());
}

export async function setupServer(app: INestApplication) {
  app.use(compression());
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes,
      max: isLocal() ? 10000 : 100,
      message: 'Too many requests from this IP, please try again later.',
    }),
  );
  // @ts-ignore
  app.set('trust proxy', 1);
  await app.listen(+envOrThrow('SERVER_PORT'));
}
