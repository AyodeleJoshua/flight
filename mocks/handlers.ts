// eslint-disable-next-line import/no-extraneous-dependencies
import { http, HttpResponse } from 'msw';
import { environmentVariables } from '../src/utils/appConfig';
import {
  LoginRequestBodyType,
  LoginRequestParamsType,
  LoginRequestResponseType,
} from './types';
import { userLoginData } from './mock';

const baseUrl = environmentVariables.baseUrl;

export const handlers = [
  http.post(`${baseUrl}/auth/login`, () => {
    console.log('gdgd');
    return new HttpResponse('Hello world!');
  }),
];

// const loginData = await request.json();
//     if (loginData.email !== 'joshua@gmail.com') {
//       return HttpResponse.json(
//         {
//           response: {
//             data: {
//               code: 103,
//               type: 'unauthenticated',
//               message: 'Invalid user and password combination',
//             },
//           },
//         },
//         { status: 401 },
//       );
//     }

//     return HttpResponse.json(
//       {
//         id: '123',
//         name: 'Joshua Ayodele',
//         email: 'joshua@gmail.com',
//         token: '123',
//         refreshToken: '123',
//       },
//       { status: 200 },
//     );
//   }),
// export default handlers;
