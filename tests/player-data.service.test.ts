import { describe, expect, it } from 'vitest';
import { createPlayerDataService } from '../src/services/player-data.service.js';

describe('Player data service', () => {
  it('should load players from the data source', async () => {
    const playerDataService = createPlayerDataService();

    const players = await playerDataService.getPlayers();

    expect(players).toHaveLength(5);
    expect(players[0]).toMatchObject({
      id: 52,
      firstname: 'Novak',
      lastname: 'Djokovic'
    });
  });
});
