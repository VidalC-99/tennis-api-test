import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Player } from "../models/player.js";

interface PlayersData {
    players: Player[]
}

let players: Player[] | null = null

export async function getPlayers(): Promise<Player[]> {
    
    if (players !== null){
        return players
    }

    const filePath = resolve(process.cwd(), 'data/headtohead.json')
    const file = await readFile(filePath, 'utf-8')
    const data: PlayersData = JSON.parse(file)

    players = data.players

    return players
}