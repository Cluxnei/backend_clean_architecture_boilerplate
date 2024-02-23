import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../iUseCase';
import { Either, left, right } from '@shared/either';
import { IError } from '@shared/error';

import {
  ITodoRepository,
  ITodoRepositoryToken,
} from '@business/repositories/todoRepository';
import { InputTodo, ITodo, TodoEntity } from '@domain/entities/todo';
import { pick } from '@utils/object';

export type InputUpdateTodoDto = Pick<ITodo, 'id'> & {
  data: Omit<InputTodo, 'created_at' | 'updated_at'>;
};
export type OutputUpdateTodoDto = Either<IError, TodoEntity>;

@Injectable()
export class UpdateTodoUseCase
  implements IUseCase<InputUpdateTodoDto, OutputUpdateTodoDto>
{
  private readonly logger: Logger = new Logger(UpdateTodoUseCase.name, {
    timestamp: true,
  });

  constructor(
    @Inject(ITodoRepositoryToken)
    private readonly todoRepository: ITodoRepository,
  ) {
    this.logger.debug('new instance');
  }

  async execute(input: InputUpdateTodoDto): Promise<OutputUpdateTodoDto> {
    const updateInput: InputTodo = pick(input.data, [
      'title',
      'description',
      'completed',
      'top_secret_prop',
    ]);

    const todo = await this.todoRepository.update({
      id: input.id,
      data: updateInput,
    });

    if (todo.isLeft()) {
      return left(todo.value);
    }
    return right(todo.value);
  }
}
