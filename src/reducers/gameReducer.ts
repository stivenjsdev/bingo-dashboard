import { Game, User } from "@/types";
import { Socket } from "socket.io-client";

export type GameActions =
  | {
      type: "SET_SOCKET";
      payload: { socket: Socket };
    }
  | {
      type: "LOGOUT";
    }
  | {
      type: "SET_USER";
      payload: { user: User };
    }
  | {
      type: "SET_GAMES";
      payload: { games: Game[] };
    }
  | {
      type: "SET_IS_GAMES_LOADING";
      payload: { isGamesLoading: boolean };
    }
  | {
      type: "SET_IS_GAMES_ERROR";
      payload: { isGamesError: boolean };
    }
  | {
      type: "SET_SELECTED_GAME";
      payload: { selectedGame: Game };
    }
  | {
      type: "SET_IS_SELECTED_GAME_LOADING";
      payload: { isSelectedGameLoading: boolean };
    }
  | {
      type: "SET_IS_SELECTED_GAME_ERROR";
      payload: { isSelectedGameError: boolean };
    }
  | {
      type: "TOKEN_EXPIRED";
    };

export type GameState = {
  user: User;
  games: Game[];
  isGamesLoading: boolean;
  isGamesError: boolean;
  selectedGame: Game;
  isSelectedGameLoading: boolean;
  isSelectedGameError: boolean;
  socket: Socket;
  hasTokenExpired: boolean;
};

export const initialState: GameState = {
  user: {
    _id: "",
    username: "",
    email: "",
  },
  games: [],
  isGamesLoading: false,
  isGamesError: false,
  selectedGame: {
    _id: "",
    gameName: "",
    gameType: 0,
    date: new Date(),
    players: [],
    balls: [],
    drawnBalls: [],
    userAdmin: {
      _id: "",
      username: "",
      email: "",
    },
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    winner: null,
  },
  isSelectedGameLoading: false,
  isSelectedGameError: false,
  socket: null!,
  hasTokenExpired: false,
};

export const gameReducer = (
  state: GameState = initialState,
  action: GameActions
) => {
  if (action.type === "SET_SOCKET") {
    return {
      ...state,
      socket: action.payload.socket,
    };
  }
  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === "SET_GAMES") {
    return {
      ...state,
      games: action.payload.games,
    };
  }
  if (action.type === "SET_IS_GAMES_LOADING") {
    return {
      ...state,
      isGamesLoading: action.payload.isGamesLoading,
    };
  }
  if (action.type === "SET_IS_GAMES_ERROR") {
    return {
      ...state,
      isGamesError: action.payload.isGamesError,
    };
  }
  if (action.type === "SET_SELECTED_GAME") {
    return {
      ...state,
      selectedGame: action.payload.selectedGame,
    };
  }
  if (action.type === "SET_IS_SELECTED_GAME_LOADING") {
    return {
      ...state,
      isSelectedGameLoading: action.payload.isSelectedGameLoading,
    };
  }
  if (action.type === "SET_IS_SELECTED_GAME_ERROR") {
    return {
      ...state,
      isSelectedGameError: action.payload.isSelectedGameError,
    };
  }
  if (action.type === "LOGOUT") {
    return initialState;
  }
  if (action.type === "TOKEN_EXPIRED") {
    return {
      ...state,
      hasTokenExpired: true,
    };
  }

  return state;
};
