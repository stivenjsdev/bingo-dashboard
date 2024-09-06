import { useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const socket = io("http://localhost:4000");
function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("game over", (playerName) => {
      console.log(playerName);
    });
    return () => {};
  }, []);

  const handleTakeOutBall = () => {
    socket.emit("takeOut ball", "66da942b9c07c98f77e0ef08");
  }
  const handleResetGame = () => {
    socket.emit("reset game", "66da942b9c07c98f77e0ef08");
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleTakeOutBall}>
          take out Ball
        </button>
        <button onClick={handleResetGame}>
          reset game
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
