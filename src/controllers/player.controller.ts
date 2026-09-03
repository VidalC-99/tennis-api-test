import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllPlayers, getPlayerById } from "../services/player.service.js";

interface GetPlayerByIdRequest {
    Params: {
        id: string
    }
}

export async function getPlayersController(_request: FastifyRequest, reply: FastifyReply) {
    
    const player = await getAllPlayers()

    return reply.send(player).status(200)
}


export async function getPlayerByIdController(
  request: FastifyRequest<GetPlayerByIdRequest>,
  reply: FastifyReply
) {
  const playerId = Number(request.params.id);

  const player = await getPlayerById(playerId);

  return reply.status(200).send(player);
}