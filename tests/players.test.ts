import { afterEach, describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('GET /players', () => {
  let app: ReturnType<typeof buildApp>;

  afterEach(async () => {
    await app?.close();
  });

  it('should return players sorted by rank', async () => {
    app = buildApp();

    const response = await app.inject({
      method: 'GET',
      url: '/players'
    });

    expect(response.statusCode).toBe(200);

    const players = response.json();

    expect(players).toHaveLength(5);

    expect(players.map((player: { id: number }) => player.id)).toEqual([
      17,
      52,
      102,
      65,
      95
    ]);
  });
});