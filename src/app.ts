import Fastify from 'fastify';
import { playerRoutes } from './routes/player.routes.js';

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  app.get('/health', async () => {
    return {
      status: 'ok'
    }
  })

  app.register(playerRoutes);

  return app;
}