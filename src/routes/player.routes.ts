import type { FastifyInstance } from 'fastify';
import { getPlayersController } from '../controllers/player.controller.js';

export async function playerRoutes(app: FastifyInstance) {
  app.get('/players', getPlayersController);
}