export type User = {
  _id: string;
  username: string;
};

export type Player = {
  _id: string;
  name: string;
  wpNumber: string;
  code: string;
  bingoCard: number[][];
  game: Game;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Game = {
  _id: string;
  gameName: string;
  date: Date;
  players: Player[];
  unsortedNumbers: number[];
  chosenNumbers: number[];
  userAdmin: User;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  winner: Player | null;
};

export type UserLoginForm = {
  email: string;
  password: string;
};

export type NewGameForm = {
  gameName: string;
  date: Date;
};
