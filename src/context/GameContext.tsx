import { GameActions, gameReducer, GameState, initialState } from "@/reducers/gameReducer";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

type GameContextProps = {
  state: GameState;
  dispatch: Dispatch<GameActions>;
};

type GameProviderProps = {
  children: ReactNode;
};

export const GameContext = createContext<GameContextProps>(null!);

export const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
