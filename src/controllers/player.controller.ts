import type { FastifyReply, FastifyRequest } from 'fastify';
import type { PlayerService } from '../services/player.service.js';
import type { CreatePlayerInput } from '../models/player.js';

interface GetPlayerByIdRequest {
  Params: {
    id: string;
  };
}

interface CreatePlayerRequest {
  Body: CreatePlayerInput;
}

export function createPlayerController(playerService: PlayerService) {
  async function getPlayers(_request: FastifyRequest, reply: FastifyReply) {
    const players = await playerService.getAllPlayers();

    return reply.status(200).send(players);
  }

  async function getPlayerById(
    request: FastifyRequest<GetPlayerByIdRequest>,
    reply: FastifyReply
  ) {
    const playerId = Number(request.params.id);

    const player = await playerService.getPlayerById(playerId);

    return reply.status(200).send(player);
  }

  async function createPlayer(
    request: FastifyRequest<CreatePlayerRequest>,
    reply: FastifyReply
  ) {
    const player = await playerService.createPlayer(request.body);

    return reply.status(201).send(player);
  }

  return {
    getPlayers,
    getPlayerById,
    createPlayer
  };
}
