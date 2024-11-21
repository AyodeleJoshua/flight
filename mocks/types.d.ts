import {
  ApiResponseError,
  AuthApiSuccessfulResponse,
} from '../src/utils/types';

export type LoginRequestBodyType = {
  email: string;
  password: string;
};

export type LoginRequestParamsType = {};

export type LoginRequestResponseType =
  | ApiResponseError
  | AuthApiSuccessfulResponse
  | string;
