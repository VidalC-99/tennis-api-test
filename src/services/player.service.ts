import type { Player } from '../models/player.js';
import { getPlayers } from './player-data.service.js';

export async function getAllPlayers(): Promise<Player[]> {
  const players = await getPlayers();

  return players.toSorted((a, b) => a.data.rank - b.data.rank);
}