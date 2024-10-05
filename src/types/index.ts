export type User = {
  _id: string;
  username: string;
  email: string;
};

type BingoCard = {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
};

export type Player = {
  _id: string;
  name: string;
  wpNumber: string;
  code: string;
  bingoCard: BingoCard;
  game: Game;
  active: boolean;
  online: boolean;
  socketId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Game = {
  _id: string;
  gameName: string;
  gameType: number;
  date: Date;
  players: Player[];
  balls: number[];
  drawnBalls: number[];
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

export type NewPlayerForm = {
  name: string;
  wpNumber: string;
};
