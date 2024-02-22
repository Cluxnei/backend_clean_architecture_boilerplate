import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '../iUseCase';
import { Either, left, right } from '@shared/either';
import { IError } from '@shared/error';

import {
  ITodoRepository,
  ITodoRepositoryToken,
} from '@business/repositories/todoRepository';
import { ITodo } from '@domain/entities/todo';

export type InputDeleteTodoDto = Pick<ITodo, 'id'>;
export type OutputDeleteTodoDto = Either<IError, boolean>;

@Injectable()
export class DeleteTodoUseCase
  implements IUseCase<InputDeleteTodoDto, OutputDeleteTodoDto>
{
  private readonly logger: Logger = new Logger(DeleteTodoUseCase.name, {
    timestamp: true,
  });

  constructor(
    @Inject(ITodoRepositoryToken)
    private readonly todoRepository: ITodoRepository,
  ) {
    this.logger.debug('new instance');
  }

  async execute(input: InputDeleteTodoDto): Promise<OutputDeleteTodoDto> {
    const remove = await this.todoRepository.delete({
      id: input.id,
    });
    if (remove.isLeft()) {
      return left(remove.value);
    }
    return right(remove.value);
  }
}
