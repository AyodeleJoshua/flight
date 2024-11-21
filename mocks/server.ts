// eslint-disable-next-line import/no-extraneous-dependencies
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// eslint-disable-next-line import/prefer-default-export
export const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

server.events.on('response:mocked', ({ request, requestId, response }) => {
  console.log(
    '%s %s received %s %s %s',
    request.method,
    request.url,
    response.status,
    response.statusText,
    JSON.stringify(server.listHandlers()),
  );
});
