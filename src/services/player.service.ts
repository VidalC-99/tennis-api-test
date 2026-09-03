import type { Player, PlayerStats } from '../models/player.js';
import type { CreatePlayerInput } from '../models/player.js';
import { PlayerNotFoundError } from '../errors/player-not-found.error.js';
import { EmptyPlayerDataError } from '../errors/empty-player-data.error.js';
import type { createPlayerDataService } from './player-data.service.js';

type PlayerDataService = ReturnType<typeof createPlayerDataService>;

export type PlayerService = ReturnType<typeof createPlayerService>;

export interface GetPlayersOptions {
  country?: string | undefined;
}

export function createPlayerService(
  playerDataService: PlayerDataService
) {
  async function getAllPlayers(
    options: GetPlayersOptions = {}
  ): Promise<Player[]> {
    const players = await playerDataService.getPlayers();

    const filteredPlayers = options.country
      ? players.filter(
          (player) => player.country.code === options.country
        )
      : players;

    return filteredPlayers.toSorted(
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

  async function getPlayerStats(): Promise<PlayerStats> {
    const players = await playerDataService.getPlayers();

    const countryStats = new Map<string, { wins: number; matches: number }>();

    let totalImc = 0;

    for (const player of players) {
      const wins = player.data.last.reduce((sum, result) => sum + result, 0);
      const matches = player.data.last.length;

      const country = countryStats.get(player.country.code) ?? {
        wins: 0,
        matches: 0
      };

      country.wins += wins;
      country.matches += matches;

      countryStats.set(player.country.code, country);

      const weightKg = player.data.weight / 1000;
      const heightMeters = player.data.height / 100;

      totalImc += weightKg / heightMeters ** 2;
    }

    const [bestCountry] = [...countryStats.entries()]
      .map(([code, stats]) => ({
        code,
        winRatio: stats.wins / stats.matches
      }))
      .toSorted((a, b) => b.winRatio - a.winRatio);

    if (!bestCountry) {
      throw new EmptyPlayerDataError();
    }

    const heights = players
      .map((player) => player.data.height)
      .toSorted((a, b) => a - b);

    const middle = Math.floor(heights.length / 2);

    const upperHeight = heights[middle];
    const lowerHeight = heights[middle - 1];

    if (upperHeight === undefined) {
      throw new EmptyPlayerDataError();
    }

    const medianHeight =
      heights.length % 2 === 0 && lowerHeight !== undefined
        ? (lowerHeight + upperHeight) / 2
        : upperHeight;

    return {
      bestCountry,
      averageIMC: totalImc / players.length,
      medianHeight
    };
  }

  return {
    getAllPlayers,
    getPlayerById,
    createPlayer,
    getPlayerStats
  };
}