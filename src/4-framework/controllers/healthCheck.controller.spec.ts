import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '@framework/controllers/healthCheck.controller';
import { HealthCheckModule } from '@container/ioc/healthCheck.module';
import { Response } from 'express';
import { mockExpressResponseObject } from '@utils/response';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(
        controller.healthcheck(mockExpressResponseObject() as Response),
      ).toHaveProperty('message');
    });
  });
});
