import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '@business/useCases/iUseCase';
import { left, right } from '@shared/either';
import {
  ITodoRepository,
  ITodoRepositoryToken,
  OutputFindByTodoRepositoryDto,
} from '@business/repositories/todoRepository';

export type InputGetTodoDto = {
  id: string;
};
export type OutputGetTodoDto = OutputFindByTodoRepositoryDto;

@Injectable()
export class GetTodoUseCase
  implements IUseCase<InputGetTodoDto, OutputGetTodoDto>
{
  private readonly logger: Logger = new Logger(GetTodoUseCase.name, {
    timestamp: true,
  });
  constructor(
    @Inject(ITodoRepositoryToken)
    private readonly todoRepository: ITodoRepository,
  ) {
    this.logger.debug('new instance');
  }
  async execute(input: InputGetTodoDto): Promise<OutputGetTodoDto> {
    const getTodo = await this.todoRepository.findBy({
      type: 'id',
      value: input.id,
    });

    if (getTodo.isLeft()) {
      return left(getTodo.value);
    }

    return right(getTodo.value);
  }
}
