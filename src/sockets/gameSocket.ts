import { GameActions } from "@/reducers/gameReducer";
import type { Game, Player, User } from "@/types/index";
import { capitalizeWords } from "@/utils/game";
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

  // listen for join game event
  socket.on("player-joined-game", (game: Game) => {
    console.log("joined-game", game.gameName);
    if (!game) {
      console.error('joined-game Error joining game');
      // todo: maybe logout user
      return
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    // show an alert when an error happens
  });

  // listen for disconnect event
  socket.on("player-disconnected", (game: Game) => {
    console.log("player-disconnected", game);
    if (!game) return;
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
  });

  // listen for game restarted event
  socket.on("game-restarted", (game: Game) => {
    console.log("game restarted", game._id);
    if (!game) {
      dispatch({ type: "TOKEN_EXPIRED" });
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    Swal.fire({
      title: "Juego Reiniciado!",
      text: "El juego comenzará de nuevo",
      icon: "warning",
      confirmButtonText: "Ok",
    });
  });

  // listen for game over event
  socket.on("game-over", (game) => {
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    console.log("game over", game?.winner?.name);
    Swal.fire({
      title: "¡BINGO!",
      text: `${
        game?.winner?.name ? capitalizeWords(game?.winner?.name) : "Anónimo"
      } ha ganado el juego! 🥳`,
      icon: "success",
      confirmButtonText: "Wow!",
    });
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
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al cargar los juegos, por favor recargue la página",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    console.log(message);
    dispatch({ type: "SET_IS_GAMES_ERROR", payload: { isGamesError: false } });
    dispatch({ type: "SET_GAMES", payload: { games } });
  });

  // listen for selected game event
  socket.on("game", (selectedGame: Game, message: string) => {
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
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al cargar el juego, por favor vuelva a la página de inicio",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    console.log(message);
    dispatch({
      type: "SET_IS_SELECTED_GAME_ERROR",
      payload: { isSelectedGameError: false },
    });
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame } });
    // note: we don't send the third parameter to identify us as the host
    socket.emit("join-game", selectedGame._id);
  });

  

  // listen for player created event
  socket.on("player-created", (game, message) => {
    console.log("player-created", message);
    if (!game) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al crear el jugador, por favor intente de nuevo",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
  });

  // listen for number chosen event
  socket.on("ball-takenOut", (ball, game, message) => {
    console.log("ball-takenOut", message);
    if (!game || !ball) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al tomar el número, por favor intente de nuevo",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
  });

  // listen for played deleted event
  socket.on("player-deleted", (game, message) => {
    console.log("player-deleted", message);
    if (!game) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al eliminar el jugador, por favor recargue la página",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    Swal.fire({
      title: "Jugador Eliminado!",
      text: "El jugador ha sido eliminado exitosamente",
      icon: "success",
      confirmButtonText: "Ok",
    });
  });

  // listen for game deleted event
  socket.on("game-deleted", (games, message) => {
    console.log("game-deleted", message);
    if (!games) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al eliminar el juego, por favor recargue la página",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
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

  // listen for card changed event
  socket.on("card-changed", (game: Game, player: Player, message: string) => {
    console.log("card-changed", game._id);
    if (!game) {
      console.error(message);
      if (message.includes("Unauthorized")) {
        dispatch({ type: "TOKEN_EXPIRED" });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Error al cambiar el carton, por favor recargue la página",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      return;
    }
    dispatch({ type: "SET_SELECTED_GAME", payload: { selectedGame: game } });
    Swal.fire({
      title: "Cartón Cambiado!",
      text: `El cartón de ${player.name} ha sido cambiado exitosamente`,
      icon: "success",
      confirmButtonText: "Ok",
    });
  });

  // todo: listen for create game event and game creates event
};
