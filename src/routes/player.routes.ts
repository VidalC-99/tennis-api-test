import type { FastifyInstance } from 'fastify';
import { getPlayersController, getPlayerByIdController } from '../controllers/player.controller.js';

export async function playerRoutes(app: FastifyInstance) {
    app.get('/players', getPlayersController);
    app.get('/players/:id', getPlayerByIdController);
}

