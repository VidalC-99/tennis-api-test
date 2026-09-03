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

  it('should return a player by id', async () => {
  app = buildApp();

  const response = await app.inject({
    method: 'GET',
    url: '/players/17'
  });

  expect(response.statusCode).toBe(200);

  expect(response.json()).toMatchObject({
    id: 17,
    firstname: 'Rafael',
    lastname: 'Nadal'
  });
});

it('should return 404 when the player does not exist', async () => {
    app = buildApp();

    const response = await app.inject({
        method: 'GET',
        url: '/players/999'
    });

    expect(response.statusCode).toBe(404);

    expect(response.json()).toEqual({
        error: 'PLAYER_NOT_FOUND',
        message: 'Player with id 999 was not found'
    });
});

it('should create a player', async () => {
  app = buildApp();

  const newPlayer = {
    firstname: 'Roger',
    lastname: 'Federer',
    shortname: 'R.FED',
    sex: 'M',
    country: {
      picture: 'https://example.com/switzerland.png',
      code: 'SUI'
    },
    picture: 'https://example.com/federer.png',
    data: {
      rank: 3,
      points: 2500,
      weight: 85000,
      height: 185,
      age: 37,
      last: [1, 1, 1, 1, 0]
    }
  };

  const response = await app.inject({
    method: 'POST',
    url: '/players',
    payload: newPlayer
  });

  expect(response.statusCode).toBe(201);

  expect(response.json()).toMatchObject({
    id: 103,
    firstname: 'Roger',
    lastname: 'Federer'
  });
});

it('should reject an invalid player', async () => {
  app = buildApp();

  const response = await app.inject({
    method: 'POST',
    url: '/players',
    payload: {
      firstname: 'Roger'
    }
  });

  expect(response.statusCode).toBe(400);
});

it('should reject unknown properties', async () => {
  app = buildApp();

  const response = await app.inject({
    method: 'POST',
    url: '/players',
    payload: {
      firstname: 'Roger',
      lastname: 'Federer',
      shortname: 'R.FED',
      sex: 'M',
      country: {
        picture: 'https://example.com/switzerland.png',
        code: 'SUI'
      },
      picture: 'https://example.com/federer.png',
      data: {
        rank: 3,
        points: 2500,
        weight: 85000,
        height: 185,
        age: 37,
        last: [1, 1, 1, 1, 0]
      },
      unexpectedField: 'should fail'
    }
  });

  expect(response.statusCode).toBe(400);
});
});
