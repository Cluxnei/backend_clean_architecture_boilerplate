import { IError } from '@shared/error';

export const failedSendMail: IError = {
  httpCode: 500,
  code: 'MAI-001',
  shortMessage: 'failedSendMail',
  message: 'Houve um erro ao enviar o e-mail.',
};

export const unknownSendMailChannel: IError = {
  httpCode: 500,
  code: 'MAI-002',
  shortMessage: 'unknownSendMailChannel',
  message: 'Não foi possível enviar o e-mail para o canal especificado.',
};
