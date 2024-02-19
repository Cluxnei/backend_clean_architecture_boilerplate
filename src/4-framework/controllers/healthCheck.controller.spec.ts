import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '@framework/controllers/healthCheck.controller';
import { HealthCheckModule } from '@container/ioc/healthCheck.module';
import { Response } from 'express';
import { mockExpressResponseObject } from '@utils/response';
import { OutputGetHealthCheckStatusOkDto } from '@business/useCases/healthCheck/getHealthCheckStatusUseCase';
import { IError } from '@shared/error';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return correct healthcheck information', async () => {
      const node_environment = 'testing';
      process.env['NODE_ENV'] = node_environment;
      process.env['APP_ENV'] = node_environment;
      const response = (await controller.healthcheck(
        mockExpressResponseObject() as Response,
      )) as OutputGetHealthCheckStatusOkDto;
      expect(response).toHaveProperty('node_environment');
      expect(response.node_environment).toBe(node_environment);
      expect(response).toHaveProperty('app_environment');
      expect(response.app_environment).toBe(node_environment);
      expect(response).toHaveProperty('status');
      expect(response.status).toBe('ok');
    });

    it('should return correct healthcheck information even with error', async () => {
      process.env['OMIT_ERROR_LOGGING_ONCE'] = 'once';
      process.env['NODE_ENV'] = 'testing';
      delete process.env['APP_ENV'];
      const response = (await controller.healthcheck(
        mockExpressResponseObject() as Response,
      )) as IError;
      expect(response).toHaveProperty('code');
      expect(response).toHaveProperty('httpCode');
      expect(response).toHaveProperty('message');
      expect(response).toHaveProperty('shortMessage');
      expect(response).toEqual({
        code: 500,
        httpCode: 500,
        message: 'The [APP_ENV] env key not exists.',
        shortMessage: '',
      });
    });
  });
});
