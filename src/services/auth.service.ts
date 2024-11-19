import { postRequest } from '../api/apiMethods';

const LOGIN_URL = '/auth/login';

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  postRequest(LOGIN_URL, {
    email,
    password,
  });

const REGISTER_URL = '/auth/register';

export const register = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) =>
  postRequest(REGISTER_URL, {
    email,
    password,
    name,
  });
