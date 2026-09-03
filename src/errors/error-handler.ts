import type { FastifyError, FastifyInstance } from 'fastify';
import { PlayerNotFoundError } from './player-not-found.error.js';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler<FastifyError>((error, _request, reply) => {
    if (error instanceof PlayerNotFoundError) {
      return reply.status(404).send({
        error: 'PLAYER_NOT_FOUND',
        message: error.message
      });
    }

    if (error.validation) {
      return reply.status(400).send({
        error: 'VALIDATION_ERROR',
        message: error.message
      });
    }

    app.log.error(error);

    return reply.status(500).send({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    });
  });
}
