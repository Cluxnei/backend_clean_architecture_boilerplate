import { Module } from '@nestjs/common';
import { ITodoRepositoryToken } from '@business/repositories/todoRepository';
import { TodoRepository } from '@framework/repositories/todoRepository';

@Module({
  providers: [
    {
      provide: ITodoRepositoryToken,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
