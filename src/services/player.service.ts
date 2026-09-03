import type { Player } from '../models/player.js';
import type { CreatePlayerInput } from '../models/player.js';
import { PlayerNotFoundError } from '../errors/player-not-found.error.js';
import type { createPlayerDataService } from './player-data.service.js';

type PlayerDataService = ReturnType<typeof createPlayerDataService>;

export type PlayerService = ReturnType<typeof createPlayerService>;

export function createPlayerService(
  playerDataService: PlayerDataService
) {
  async function getAllPlayers(): Promise<Player[]> {
    const players = await playerDataService.getPlayers();

    return players.toSorted(
      (a, b) => a.data.rank - b.data.rank
    );
  }

  async function getPlayerById(playerId: number): Promise<Player> {
    const players = await playerDataService.getPlayers();

    const player = players.find(
      (player) => player.id === playerId
    );

    if (!player) {
      throw new PlayerNotFoundError(playerId);
    }

    return player;
  }

  async function createPlayer(
    playerInput: CreatePlayerInput
  ): Promise<Player> {
    return playerDataService.addPlayer(playerInput);
  }

  return {
    getAllPlayers,
    getPlayerById,
    createPlayer
  };
}