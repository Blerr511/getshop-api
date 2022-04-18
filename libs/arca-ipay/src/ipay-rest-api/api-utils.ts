import { AxiosResponse } from 'axios';

export type AnyRecord = any;

export interface IPayErrorResponse {
  errorCode: number;

  errorCodeString: string;

  error: true;
}

export type IPaySuccessResponse<R extends AnyRecord> = {
  errorCode: 0;

  errorCodeString: '';

  error: false;
} & R;

export type IPayResponse<R extends AnyRecord> =
  | IPayErrorResponse
  | IPaySuccessResponse<R>;

export const isOK = <R extends AnyRecord>(
  response: IPayErrorResponse | IPaySuccessResponse<R>,
): response is IPaySuccessResponse<R> => {
  return !response.error;
};

export const isOkPipe = <R extends IPayResponse<D>, D>(
  response: AxiosResponse<R>,
): IPaySuccessResponse<R> => {
  if (isOK(response.data)) return response.data;
  throw response.data;
};
