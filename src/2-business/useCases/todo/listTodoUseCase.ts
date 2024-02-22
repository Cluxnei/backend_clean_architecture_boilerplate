import { Inject, Injectable, Logger } from '@nestjs/common';
import { IUseCase } from '@business/useCases/iUseCase';
import { Either, left, right } from '@shared/either';
import { Paginated, paginate } from '@shared/pagination';
import { IError } from '@shared/error';
import { ITodo } from '@domain/entities/todo';
import {
  InputListTodoRepositoryDto,
  ITodoRepository,
  ITodoRepositoryToken,
} from '@business/repositories/todoRepository';

export type InputListTodoDto = InputListTodoRepositoryDto;
export type OutputListTodoDto = Either<
  IError,
  Paginated<Omit<ITodo, 'top_secret_prop'>>
>;

@Injectable()
export class ListTodoUseCase
  implements IUseCase<InputListTodoDto, OutputListTodoDto>
{
  private readonly logger: Logger = new Logger(ListTodoUseCase.name, {
    timestamp: true,
  });
  constructor(
    @Inject(ITodoRepositoryToken)
    private readonly todoRepository: ITodoRepository,
  ) {
    this.logger.debug('new instance');
  }

  async execute(input: InputListTodoDto): Promise<OutputListTodoDto> {
    const [countOutput, listOutput] = await Promise.all([
      this.todoRepository.count(),
      this.todoRepository.list(input),
    ]);

    if (countOutput.isLeft()) {
      return left(countOutput.value);
    }

    if (listOutput.isLeft()) {
      return left(listOutput.value);
    }

    const count = countOutput.value;
    const todos = listOutput.value;

    return right(
      paginate({
        results: todos ?? [],
        total: count ?? 0,
        skip: input.skip,
        take: input.take,
      }),
    );
  }
}
