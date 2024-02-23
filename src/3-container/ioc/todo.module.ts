import { Module } from '@nestjs/common';
import { ITodoRepositoryToken } from '@business/repositories/todoRepository';
import { TodoRepository } from '@framework/repositories/todoRepository';
import { TodoController } from '@framework/controllers/todo.controller';
import { GetTodoUseCase } from '@business/useCases/todo/getTodoUseCase';
import { ListTodoUseCase } from '@business/useCases/todo/listTodoUseCase';
import { UpdateTodoUseCase } from '@business/useCases/todo/updateTodoUseCase';
import { DeleteTodoUseCase } from '@business/useCases/todo/deleteTodoUseCase';
import { CreateTodoUseCase } from '@business/useCases/todo/createTodoUseCase';

@Module({
  providers: [
    {
      provide: ITodoRepositoryToken,
      useClass: TodoRepository,
    },
    GetTodoUseCase,
    ListTodoUseCase,
    CreateTodoUseCase,
    UpdateTodoUseCase,
    DeleteTodoUseCase,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
