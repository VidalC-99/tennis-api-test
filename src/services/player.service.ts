import { PlayerNotFoundError } from '../errors/player-not-found.error.js';
import type { Player } from '../models/player.js';
import { getPlayers } from './player-data.service.js';

export async function getAllPlayers(): Promise<Player[]> {
  const players = await getPlayers();

  return players.toSorted((a, b) => a.data.rank - b.data.rank);
}

export async function getPlayerById(playerId: number): Promise<Player> {
  const players = await getPlayers();

  const player = players.find((player) => player.id === playerId);

  if (!player) {
    throw new PlayerNotFoundError(playerId);
  }

  return player;
}