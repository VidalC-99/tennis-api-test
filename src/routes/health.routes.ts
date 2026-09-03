import type { FastifyInstance } from 'fastify';
import { healthSchema } from './schemas/common.schema.js';

export async function healthRoutes(app: FastifyInstance) {
  app.get(
    '/health',
    {
      schema: healthSchema
    },
    async () => {
      return {
        status: 'ok'
      };
    }
  );
}
