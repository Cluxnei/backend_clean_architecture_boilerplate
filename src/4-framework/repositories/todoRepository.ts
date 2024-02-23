import { Injectable, Logger } from '@nestjs/common';
import {
  InputCreateTodoRepositoryDto,
  InputDeleteTodoRepositoryDto,
  InputFindByTodoRepositoryDto,
  InputListTodoRepositoryDto,
  InputUpdateTodoRepositoryDto,
  ITodoRepository,
  OutputCountTodoRepositoryDto,
  OutputCreateTodoRepositoryDto,
  OutputDeleteTodoRepositoryDto,
  OutputFindByTodoRepositoryDto,
  OutputListTodoRepositoryDto,
  OutputUpdateTodoRepositoryDto,
} from '@business/repositories/todoRepository';
import { PrismaService } from '@framework/database/prisma.service';
import { handleErrorLog } from '@shared/error';
import { left, right } from '@shared/either';
import {
  todoCountError,
  todoCreateError,
  todoDeleteError,
  todoFindByError,
  todoListError,
  todoNotFoundError,
  todoUpdateError,
} from '@business/errors/todo';
import { plainToInstance } from 'class-transformer';
import { ITodo, TodoEntity } from '@domain/entities/todo';
import { DEFAULT_PAGE_SIZE } from '@shared/pagination';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodoRepository implements ITodoRepository {
  private readonly logger: Logger = new Logger(TodoRepository.name, {
    timestamp: true,
  });

  constructor(private readonly prismaService: PrismaService) {
    this.logger.debug('new instance');
  }

  async count(): Promise<OutputCountTodoRepositoryDto> {
    try {
      return right(await this.prismaService.todo.count());
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoCountError);
    }
  }

  async create(
    input: InputCreateTodoRepositoryDto,
  ): Promise<OutputCreateTodoRepositoryDto> {
    try {
      return right(
        plainToInstance(
          TodoEntity,
          await this.prismaService.todo.create({
            data: input as Omit<
              InputCreateTodoRepositoryDto,
              'top_secret_prop'
            >,
          }),
        ),
      );
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoCreateError);
    }
  }

  async delete(
    input: InputDeleteTodoRepositoryDto,
  ): Promise<OutputDeleteTodoRepositoryDto> {
    try {
      const todo = await this.findBy({
        value: input.id,
        type: 'id',
      });
      if (todo.isLeft()) {
        return left(todo.value);
      }
      return right(
        Boolean(
          await this.prismaService.todo.delete({
            where: {
              id: input.id,
            },
          }),
        ),
      );
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoDeleteError);
    }
  }

  async findBy(
    input: InputFindByTodoRepositoryDto,
  ): Promise<OutputFindByTodoRepositoryDto> {
    try {
      const todo = await this.prismaService.todo.findFirst({
        where: {
          [input.type]: input.value,
        },
      });
      if (!todo) {
        return left(todoNotFoundError);
      }
      return right(plainToInstance(TodoEntity, todo));
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoFindByError);
    }
  }

  async list(
    input: InputListTodoRepositoryDto,
  ): Promise<OutputListTodoRepositoryDto> {
    try {
      let filter: Prisma.TodoWhereInput = {
        ...(Boolean(input.filter?.title) && {
          OR: [
            {
              title: {
                contains: input.filter.title,
              },
            },
          ],
        }),
      };

      const todos = await this.prismaService.todo.findMany({
        take: Math.min(input.take, DEFAULT_PAGE_SIZE) || DEFAULT_PAGE_SIZE,
        skip: input.skip || 0,
        where: {
          ...filter,
        },
        orderBy: {
          created_at: 'desc',
        },
      });
      return right(plainToInstance(TodoEntity, todos) as ITodo[]);
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoListError);
    }
  }

  async update(
    input: InputUpdateTodoRepositoryDto,
  ): Promise<OutputUpdateTodoRepositoryDto> {
    try {
      const todo = await this.findBy({
        value: input.id,
        type: 'id',
      });
      if (todo.isLeft()) {
        return left(todo.value);
      }
      return right(
        plainToInstance(
          TodoEntity,
          await this.prismaService.todo.update({
            where: {
              id: input.id,
            },
            data: input.data,
          }),
        ),
      );
    } catch (error) {
      handleErrorLog(error, this.logger);
      return left(todoUpdateError);
    }
  }
}
