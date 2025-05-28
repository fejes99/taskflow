import {
  FastifyError,
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';
import { logger } from '../../logger';
import { BaseError } from '../../../shared/errors/BaseError';
import { ZodError } from 'zod/v4';
import { formatZodError } from '../../../shared/utils/zodErrorFormatter';

export const errorHandler = async (app: FastifyInstance) => {
  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof ZodError) {
        const message = formatZodError(error);

        logger.warn(
          {
            route: request.url,
            method: request.method,
            statusCode: 400,
            errorMessage: message,
          },
          'Handled validation error',
        );

        return reply.status(400).send({
          statusCode: 400,
          error: 'Bad Request',
          message,
        });
      }

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
};
