export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  shortname: string;
  sex: 'M' | 'F';
  country: {
    picture: string;
    code: string;
  };
  picture: string;
  data: {
    rank: number;
    points: number;
    weight: number;
    height: number;
    age: number;
    last: number[];
  };
}

export type CreatePlayerInput = Omit<Player, 'id'>;


export interface PlayerStats {
  bestCountry: {
    code: string;
    winRatio: number;
  };
  averageIMC: number;
  medianHeight: number;
}