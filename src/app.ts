import Fastify from 'fastify';
import { registerErrorHandler } from './errors/error-handler.js';
import { createPlayerDataService } from './services/player-data.service.js';
import { createPlayerService } from './services/player.service.js';
import { playerRoutes } from './routes/player.routes.js';

export function buildApp() {
  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        // Reject unknown body properties instead of silently stripping them.
        removeAdditional: false
      }
    }
  });

  const playerDataService = createPlayerDataService();
  const playerService = createPlayerService(playerDataService);

  registerErrorHandler(app);

  app.get('/health', async () => {
    return {
      status: 'ok'
    };
  });

  app.register(playerRoutes, {
    playerService
  });

  return app;
}