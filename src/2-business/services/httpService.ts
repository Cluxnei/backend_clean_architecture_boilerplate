import { Either } from '@shared/either';
import { IError } from '@shared/error';

export interface IHttpService {
  post: <T, U extends any>(url: string, body?: U) => Promise<Either<IError, T>>;
}

export const IHttpServiceToken = Symbol('IHttpService');
