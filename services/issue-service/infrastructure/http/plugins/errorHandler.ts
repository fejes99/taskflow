import {
  FastifyError,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { logger } from '../../logger';
import { BaseError } from '../../../shared/errors/BaseError';

export async function errorHandler(app: FastifyInstance) {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof BaseError) {
        logger.warn(
          {
            route: request.url,
            method: request.method,
            statusCode: error.statusCode,
            errorMessage: error.message,
          },
          'Handled known error',
        );

        return reply.status(error.statusCode).send(error.serialize());
      }

      logger.error(
        {
          route: request.url,
          method: request.method,
          error,
        },
        'Unhandled application error',
      );

      return reply.status(500).send({
        message: 'Internal server error',
      });
    },
  );
}
