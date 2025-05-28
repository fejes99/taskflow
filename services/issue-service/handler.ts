import Fastify from 'fastify';
import { issueRoutes } from './routes/issueRoutes';
import { errorHandler } from './infrastructure/http/plugins/errorHandler';
import awsLambdaFastify from '@fastify/aws-lambda';

const app = Fastify();

(async () => {
  await issueRoutes(app);
})();
(async () => {
  await errorHandler(app);
})();

const proxy = awsLambdaFastify(app);
export const handler = proxy;

// export const handler = async (event: any, context: any) => {
//   const res = await app.inject({
//     method: event.httpMethod,
//     url: event.path,
//     query: event.queryStringParameters,
//     payload: event.body,
//     headers: {
//       'Content-Type': event.headers?.['Content-Type'] ?? 'application/json',
//     },
//   });

//   return {
//     statusCode: res.statusCode,
//     body: res.body,
//     headers: { 'Content-Type': 'application/json' },
//   };
// };
