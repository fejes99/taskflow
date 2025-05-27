import Fastify from 'fastify';
import { issueRoutes } from './routes/issueRoutes';
import { errorHandler } from './infrastructure/http/plugins/errorHandler';

const app = Fastify();

(async () => {
  await issueRoutes(app);
})();
(async () => {
  await errorHandler(app);
})();

export const handler = async (event: any, context: any) => {
  const res = await app.inject({
    method: event.httpMethod,
    url: event.path,
    query: event.queryStringParameters,
    payload: event.body,
  });

  return {
    statusCode: res.statusCode,
    body: res.body,
    headers: { 'Content-Type': 'application/json' },
  };
};
