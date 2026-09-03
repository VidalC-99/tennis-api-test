import Fastify from 'fastify';
import { playerRoutes } from './routes/player.routes.js';
import { registerErrorHandler } from './errors/error-handler.js';

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  registerErrorHandler(app);


  app.get('/health', async () => {
    return {
      status: 'ok'
    }
  })

  app.register(playerRoutes);

  return app;
}