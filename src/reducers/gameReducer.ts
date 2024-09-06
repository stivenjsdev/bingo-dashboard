import { Socket } from "socket.io-client";

export type GameActions =
  | {
      type: "SET_SOCKET";
      payload: { socket: Socket };
    }
  | {
      type: "LOGOUT";
    };

export type GameState = {
  socket: Socket;
};

export const initialState: GameState = {
  socket: null!,
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
  if (action.type === "LOGOUT") {
    return initialState;
  }

  return state;
};
