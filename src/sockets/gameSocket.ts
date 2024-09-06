import { Socket } from "socket.io-client";

export const gameSocket = (
  socket: Socket,
) => {
  // connect to socket
  socket.on("connect", () => {
    console.log("connected");
  });

  // listen for game over event
  socket.on("game over", (playerName) => {
    //todo: show the winner de alguna forma
    console.log(playerName);
  });
};
