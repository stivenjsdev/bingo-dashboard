import { GameActions } from "@/reducers/gameReducer";
import type { Game } from "@/types/index";
import { Socket } from "socket.io-client";

export const gameSocket = (
  socket: Socket,
  dispatch: React.Dispatch<GameActions>
) => {
  // connect to socket
  socket.on("connect", () => {
    console.log("connected");
  });

  // listen for game restarted event
  socket.on("game-restarted", (game: Game) => {
    console.log("game restarted", game._id);
    if (!game) {
      dispatch({ type: "TOKEN_EXPIRED" });
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    // todo: show an alert
  });

  // listen for game over event
  socket.on("game-over", (game) => {
    //todo: show an alert
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    console.log("game over", game?.winner?.name);
  });

  // listen for games event
  socket.on("games", (games, message) => {
    console.log("games");
    // validate errors
    dispatch({
      type: "SET_IS_GAMES_LOADING",
      payload: { isGamesLoading: false },
    });
    if (!games) {
      console.error(message);
      dispatch({ type: "SET_IS_GAMES_ERROR", payload: { isGamesError: true } });
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    console.log(message);
    dispatch({ type: "SET_IS_GAMES_ERROR", payload: { isGamesError: false } });
    dispatch({ type: "SET_GAMES", payload: { games } });
  });

  // listen for selected game event
  socket.on("game", (selectedGame: Game, message) => {
    console.log("game event");
    // validate errors
    dispatch({
      type: "SET_IS_SELECTED_GAME_LOADING",
      payload: { isSelectedGameLoading: false },
    });
    if (!selectedGame) {
      console.error(message);
      dispatch({
        type: "SET_IS_SELECTED_GAME_ERROR",
        payload: { isSelectedGameError: true },
      });
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    console.log(message);
    dispatch({
      type: "SET_IS_SELECTED_GAME_ERROR",
      payload: { isSelectedGameError: false },
    });
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame } });
    socket.emit("join-game", selectedGame._id);
  });

  // listen for join game event
  socket.on("joined-game", (game: Game) => {
    console.log("joined-game", game._id);
    // show an alert when an error happens
  });

  // listen for player created event
  socket.on("player-created", (game, message) => {
    console.log("player-created", message);
    if (!game) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    // show an alert when an error happens
  });

  // listen for number chosen event
  socket.on("ball-takenOut", (ball, game, message) => {
    console.log("ball-takenOut", message);
    if (!game || !ball) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    // show an alert when an error happens or there are no more balls
  });

  // listen for a channel message
  // todo: implement this

  // listen for played deleted event
  socket.on("player-deleted", (game, message) => {
    console.log("player-deleted", message);
    if (!game) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    // show an alert when an error happens
  });

  // listen for game deleted event
  socket.on("game-deleted", (games, message) => {
    console.log("game-deleted", message);
    if (!games) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      }
      return;
    }
    dispatch({ type: "SET_GAMES", payload: { games } });
    // show an alert when an error happens
  });
};
