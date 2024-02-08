import { IError } from '@shared/error';

export const failedSendMail: IError = {
  httpCode: 500,
  code: 'MAI-001',
  shortMessage: 'failedSendMail',
  message: 'Houve um erro ao enviar o e-mail.',
};
