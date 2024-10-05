import { GameActions } from "@/reducers/gameReducer";
import type { Game, User } from "@/types/index";
import { Socket } from "socket.io-client";
import Swal, { SweetAlertIcon } from "sweetalert2";

export const gameSocket = (
  user: User,
  socket: Socket,
  dispatch: React.Dispatch<GameActions>
) => {
  // connect to socket
  socket.on("connect", () => {
    console.log("connected");
    console.log(user.username);
  });

  // listen for games obtained event
  socket.on("games", (games) => {
    console.log("games");
    dispatch({
      type: "SET_IS_GAMES_LOADING",
      payload: { isGamesLoading: false },
    });
    // validate errors
    if (!games) {
      dispatch({ type: "SET_IS_GAMES_ERROR", payload: { isGamesError: true } });
      return;
    }
    dispatch({ type: "SET_IS_GAMES_ERROR", payload: { isGamesError: false } });
    dispatch({ type: "SET_GAMES", payload: { games } });
  });

  // listen for selected game event
  socket.on("game", (selectedGame: Game) => {
    console.log("game event");
    console.log(selectedGame);
    dispatch({
      type: "SET_IS_SELECTED_GAME_LOADING",
      payload: { isSelectedGameLoading: false },
    });
    // validate errors
    if (!selectedGame) {
      dispatch({
        type: "SET_IS_SELECTED_GAME_ERROR",
        payload: { isSelectedGameError: true },
      });
      return;
    }
    dispatch({
      type: "SET_IS_SELECTED_GAME_ERROR",
      payload: { isSelectedGameError: false },
    });
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame } });
    // note: we don't send the third parameter to identify us as the host
    socket.emit("joinGame", selectedGame._id);
  });

  // listen for game deleted event
  socket.on("gameDeleted", (games) => {
    console.log("gameDeleted");
    if (!games) return;
    dispatch({ type: "SET_GAMES", payload: { games } });
  });

  // listen for message event
  socket.on("message", (message: string, icon: SweetAlertIcon) => {
    Swal.fire({
      title: "Mensaje del anfitrión",
      text: message,
      icon: icon,
      showConfirmButton: false,
      timer: 3300,
    });
  });

  // listen for game updated event
  socket.on("gameUpdate", (game: Game) => {
    console.log("gameUpdate", game);
    if (!game) return;
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
  });

  // todo: listen for create game event and game creates event
};
