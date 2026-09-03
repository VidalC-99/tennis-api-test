import { describe, expect, it } from 'vitest';
import { getPlayers } from '../src/services/player-data.service.js';

describe('Player data service', () => {
  it('should load players from the data source', async () => {
    const players = await getPlayers();

    expect(players).toHaveLength(5);
    expect(players[0]).toMatchObject({
      id: 52,
      firstname: 'Novak',
      lastname: 'Djokovic'
    });
  });
});