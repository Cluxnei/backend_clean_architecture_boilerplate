import { Module } from '@nestjs/common';
import { IHttpServiceToken } from '@business/services/httpService';
import { HttpService } from '@framework/services/httpService';
import { HttpModule as NestHttpModule } from '@nestjs/axios';

@Module({
  imports: [NestHttpModule],
  providers: [{ provide: IHttpServiceToken, useClass: HttpService }],
  exports: [IHttpServiceToken],
})
export class HttpModule {}
