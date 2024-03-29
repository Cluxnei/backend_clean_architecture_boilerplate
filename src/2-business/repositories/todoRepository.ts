import { Either } from '@shared/either';
import { IError } from '@shared/error';
import { InputTodo, ITodo } from '@domain/entities/todo';

// create
export type InputCreateTodoRepositoryDto = InputTodo;
export type OutputCreateTodoRepositoryDto = Either<IError, ITodo>;

// update
export type InputUpdateTodoRepositoryDto = {
  id: string;
  data: Partial<InputTodo>;
};
export type OutputUpdateTodoRepositoryDto = Either<IError, ITodo>;

// list
export type InputListTodoRepositoryDto = {
  take: number;
  skip: number;
  filter?: Partial<Record<keyof ITodo, string>>;
};
export type OutputListTodoRepositoryDto = Either<IError, ITodo[]>;

// count
export type OutputCountTodoRepositoryDto = Either<IError, number>;

// findBy
export type InputFindByTodoRepositoryDto = {
  type: keyof ITodo;
  value: string | number;
};
export type OutputFindByTodoRepositoryDto = Either<IError, ITodo>;

// delete
export type InputDeleteTodoRepositoryDto = { id: string };
export type OutputDeleteTodoRepositoryDto = Either<IError, boolean>;

export interface ITodoRepository {
  create: (
    todo: InputCreateTodoRepositoryDto,
  ) => Promise<OutputCreateTodoRepositoryDto>;
  list: (
    input: InputListTodoRepositoryDto,
  ) => Promise<OutputListTodoRepositoryDto>;
  count: () => Promise<OutputCountTodoRepositoryDto>;
  findBy: (
    input: InputFindByTodoRepositoryDto,
  ) => Promise<OutputFindByTodoRepositoryDto>;
  update: (
    input: InputUpdateTodoRepositoryDto,
  ) => Promise<OutputUpdateTodoRepositoryDto>;
  delete: (
    input: InputDeleteTodoRepositoryDto,
  ) => Promise<OutputDeleteTodoRepositoryDto>;
}

export const ITodoRepositoryToken = Symbol('ITodoRepository');
