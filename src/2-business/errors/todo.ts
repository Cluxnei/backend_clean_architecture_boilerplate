import { IError } from '@shared/error';

export const todoCountError: IError = {
  httpCode: 500,
  code: 'TOD-001',
  shortMessage: 'todoCountError',
  message: 'Houve um erro ao contar todos.',
};

export const todoCreateError: IError = {
  httpCode: 500,
  code: 'TOD-002',
  shortMessage: 'todoCreateError',
  message: 'Houve um erro ao criar um todo.',
};

export const todoDeleteError: IError = {
  httpCode: 500,
  code: 'TOD-003',
  shortMessage: 'todoDeleteError',
  message: 'Houve um erro ao deletar todo.',
};

export const todoNotFoundError: IError = {
  httpCode: 404,
  code: 'TOD-004',
  shortMessage: 'todoNotFoundError',
  message: 'Houve um erro ao buscar todo.',
};

export const todoFindByError: IError = {
  httpCode: 404,
  code: 'TOD-005',
  shortMessage: 'todoFindByError',
  message: 'Houve um erro ao buscar todo.',
};

export const todoListError: IError = {
  httpCode: 500,
  code: 'TOD-006',
  shortMessage: 'todoListError',
  message: 'Houve um erro ao listar todos.',
};

export const todoUpdateError: IError = {
  httpCode: 500,
  code: 'TOD-007',
  shortMessage: 'todoUpdateError',
  message: 'Houve um erro ao atualizar um todo.',
};
