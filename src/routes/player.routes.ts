import type { FastifyInstance } from 'fastify';
import { createPlayerController } from '../controllers/player.controller.js';
import type { PlayerService } from '../services/player.service.js';
import { createPlayerSchema } from './schemas/player.schema.js';

export interface PlayerRoutesOptions {
  playerService: PlayerService;
}

export async function playerRoutes(
  app: FastifyInstance,
  options: PlayerRoutesOptions
) {
  const playerController = createPlayerController(options.playerService);

  app.get('/players', playerController.getPlayers);

  app.get('/players/:id', playerController.getPlayerById);

  app.post(
    '/players',
    {
      schema: createPlayerSchema
    },
    playerController.createPlayer
  );
}
