import type { FastifyReply, FastifyRequest } from "fastify";
import { getAllPlayers } from "../services/player.service.js";

export async function getPlayersController(_request: FastifyRequest, reply: FastifyReply) {
    
    const player = await getAllPlayers()

    return reply.send(player).status(200)
}