export class PlayerNotFoundError extends Error {
  constructor(playerId: number) {
    super(`Player with id ${playerId} was not found`);

    this.name = 'PlayerNotFoundError';
  }
}