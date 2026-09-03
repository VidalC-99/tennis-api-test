export class EmptyPlayerDataError extends Error {
  constructor() {
    super('Player statistics cannot be computed without players');

    this.name = 'EmptyPlayerDataError';
  }
}
