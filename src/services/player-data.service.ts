import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { Player } from '../models/player.js';
import type { CreatePlayerInput } from '../models/player.js'; 
interface PlayersData {
  players: Player[];
}

export function createPlayerDataService() {
  let players: Player[] | null = null;

  async function loadPlayers(): Promise<Player[]> {
    const filePath = resolve(process.cwd(), 'data/headtohead.json');
    const file = await readFile(filePath, 'utf-8');
    const data: PlayersData = JSON.parse(file);

    return data.players;
  }

  async function getPlayers(): Promise<Player[]> {
    if (players === null) {
      players = await loadPlayers();
    }

    return players;
  }

  async function addPlayer(
    playerInput: CreatePlayerInput
  ): Promise<Player> {
    const currentPlayers = await getPlayers();

    const nextId =
      Math.max(...currentPlayers.map((player) => player.id), 0) + 1;

    const player: Player = {
      id: nextId,
      ...playerInput
    };

    currentPlayers.push(player);

    return player;
  }

  return {
    getPlayers,
    addPlayer
  };
}