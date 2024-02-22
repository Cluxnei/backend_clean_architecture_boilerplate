import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../iUseCase';
import { Either, left, right } from '@shared/either';
import { IError } from '@shared/error';

import {
  ITodoRepository,
  ITodoRepositoryToken,
} from '@business/repositories/todoRepository';
import { InputTodo, TodoEntity } from '@domain/entities/todo';
import { pick } from '@utils/object';

export type InputCreateTodoDto = Omit<
  InputTodo,
  'id' | 'created_at' | 'updated_at'
>;
export type OutputCreateTodoDto = Either<IError, TodoEntity>;

@Injectable()
export class CreateTodoUseCase
  implements IUseCase<InputCreateTodoDto, OutputCreateTodoDto>
{
  private readonly logger: Logger = new Logger(CreateTodoUseCase.name, {
    timestamp: true,
  });

  constructor(
    @Inject(ITodoRepositoryToken)
    private readonly todoRepository: ITodoRepository,
  ) {
    this.logger.debug('new instance');
  }

  async execute(input: InputCreateTodoDto): Promise<OutputCreateTodoDto> {
    const createInput: InputTodo = pick(input, [
      'title',
      'description',
      'completed',
      'top_secret_prop',
    ]);

    const todo = await this.todoRepository.create(createInput);

    if (todo.isLeft()) {
      return left(todo.value);
    }
    return right(todo.value);
  }
}
