import { Module } from '@nestjs/common';
import { IAwsSqsServiceToken } from '@business/services/awsSqsService';
import { AwsSqsService } from '@framework/services/awsSqsService';

@Module({
  providers: [
    {
      provide: IAwsSqsServiceToken,
      useClass: AwsSqsService,
    },
  ],
  exports: [IAwsSqsServiceToken],
})
export class AwsSqsModule {}
