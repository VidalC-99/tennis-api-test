import Fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { registerErrorHandler } from './errors/error-handler.js';
import { createPlayerDataService } from './services/player-data.service.js';
import { createPlayerService } from './services/player.service.js';
import { healthRoutes } from './routes/health.routes.js';
import { playerRoutes } from './routes/player.routes.js';
import {
  playerSchema,
  playerStatsSchema
} from './routes/schemas/player.schema.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        removeAdditional: false
      }
    }
  });

  const playerDataService = createPlayerDataService();
  const playerService = createPlayerService(playerDataService);

  registerErrorHandler(app);

  app.addSchema(playerSchema);
  app.addSchema(playerStatsSchema);

  app.get('/', { schema: { hide: true } }, async (_request, reply) => {
    return reply.redirect('/docs');
  });

  app.register(fastifySwagger, {
    refResolver: {
      buildLocalReference(json, _baseUri, _fragment, index) {
        return String(json.$id ?? `def-${index}`);
      }
    },
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Tennis players API',
        description:
          'REST API exposing tennis players, their ranking and aggregated statistics.',
        version: '1.0.0'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local development server'
        }
      ],
      tags: [
        {
          name: 'Players',
          description: 'Read and create tennis players.'
        },
        {
          name: 'Health',
          description: 'Service availability.'
        }
      ]
    }
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    }
  });

  app.register(healthRoutes);

  app.register(playerRoutes, {
    playerService
  });

  return app;
}
