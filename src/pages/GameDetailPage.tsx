import calendar from "@/assets/calendar.svg";
import key from "@/assets/key.svg";
import start from "@/assets/start.svg";
import trophy from "@/assets/trophy.svg";
import whatsapp from "@/assets/whatsapp.svg";
import { useGame } from "@/hooks/useGame";
import { NewPlayerForm } from "@/types/index";
import { capitalizeWords } from "@/utils/game";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const GameDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    state: {
      socket,
      selectedGame: game,
      isSelectedGameLoading: isLoading,
      isSelectedGameError: isError,
      hasTokenExpired,
    },
    dispatch,
  } = useGame();
  
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewPlayerForm>();

  useEffect(() => {
    if (socket) {
      console.log("get-game");
      dispatch({
        type: "SET_IS_SELECTED_GAME_LOADING",
        payload: { isSelectedGameLoading: true },
      });
      const token = localStorage.getItem("AUTH_TOKEN");
      socket.emit("get-game", token, id);
    }
    
    return () => {
      if (socket) {
        socket.emit("leaveRoom", id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id]);

  useEffect(() => {
    if (hasTokenExpired) {
      console.log("token-expired");
      dispatch({ type: "LOGOUT" });
      navigate("/auth/login");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTokenExpired])
  

  const handleCreatePlayer = (formData: NewPlayerForm) => {
    console.log("create-player", formData);
    const newPlayer = { ...formData, gameId: id };
    const token = localStorage.getItem("AUTH_TOKEN");
    socket.emit("create-player", token, newPlayer);
    reset();
    setShowAddPlayer(false);
  };

  const handleTakeOutNumber = () => {
    console.log("takeOut-ball");
    const token = localStorage.getItem("AUTH_TOKEN");
    socket.emit("takeOut-ball", token, id);
  };

  const handleResetGame = () => {
    console.log("reset-game");
    const token = localStorage.getItem("AUTH_TOKEN");
    socket.emit("reset-game", token, id);
  };

  const handleDeletePlayer = (playerId: string) => {
    console.log("delete-player");
    const token = localStorage.getItem("AUTH_TOKEN");
    socket.emit("delete-player", token, playerId, id);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  if (isError) {
    Swal.fire({
      title: "Error!",
      text: "Error al cargar el juego, por favor vuelva a la página de inicio",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }

  if (game) {
    return (
      <div className="min-h-full bg-gray-100">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{game.gameName}</h2>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    game.active
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {game.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="mt-1 flex items-center text-sm">
                <img
                  className="w-4 h-4 mr-2"
                  src={calendar}
                  alt="calendar icon"
                />
                {game.date.toString().split("T")[0]}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Información del Juego
                </h3>
                {/* <button
                  onClick={() => console.log("onToggleGameStatus")}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    game.active
                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {game.active ? "Finalizar Juego" : "Activar Juego"}
                </button> */}
                <button
                  onClick={handleResetGame}
                  className={`px-3 py-1 rounded-md text-xs font-medium ${
                    game.active
                      ? "bg-red-100 text-red-800 hover:bg-red-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  Reiniciar Juego
                </button>
              </div>
              <div className="bg-gray-50 rounded-md p-4 mb-6">
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 mr-1"
                    src={trophy}
                    alt="trophy icon"
                  />
                  <span className="text-sm font-medium text-gray-500 mr-2">
                    Ganador:
                  </span>
                  {game.winner ? (
                    <span className="text-sm font-bold text-gray-900">
                      {game.winner.name}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No determinado aún
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Jugadores
              </h3>
              <ul className="divide-y divide-gray-200">
                {game.players.map((player) => (
                  <li
                    key={player._id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {player.name && capitalizeWords(player.name)}
                      </span>
                      <span className="text-base text-gray-500 flex items-center mt-1">
                        <img
                          src={key}
                          alt="key icon"
                          className="h-4 w-4 mr-1"
                        />
                        {player.code}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center mt-1">
                        <img
                          src={whatsapp}
                          alt="whatsapp icon"
                          className="h-4 w-4 mr-1"
                        />
                        {player.wpNumber}
                      </span>
                    </div>
                    {!game.winner && (
                      <button
                        onClick={() => handleDeletePlayer(player._id)}
                        className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium hover:bg-yellow-200"
                      >
                        Eliminar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {!showAddPlayer && (
                <button
                  onClick={() => setShowAddPlayer(true)}
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {/* <UserPlusIcon className="h-5 w-5 mr-2" /> */}
                  Agregar Jugador
                </button>
              )}
              {showAddPlayer && (
                <form
                  onSubmit={handleSubmit(handleCreatePlayer)}
                  className="mt-4 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="player-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre del Jugador
                    </label>
                    <input
                      type="text"
                      id="player-name"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="player-phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      WhatsApp del Jugador
                    </label>
                    <input
                      type="tel"
                      id="player-phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      {...register("wpNumber", {
                        required: "WhatsApp is required",
                      })}
                    />
                  </div>
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.name.message}
                    </div>
                  )}
                  {errors.wpNumber && (
                    <div className="text-red-500 text-sm mt-2">
                      {errors.wpNumber.message}
                    </div>
                  )}
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPlayer(false)}
                      className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Agregar Jugador
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                <img
                  className="w-6 h-6 mr-2 inline-block"
                  src={start}
                  alt="start icon"
                />
                Sacar Balotas
              </h3>
              <button
                onClick={handleTakeOutNumber}
                disabled={!game.active || game.chosenNumbers.length === 75}
                className={`mb-6 w-full px-4 py-2 rounded-md flex items-center justify-center ${
                  game.active && game.chosenNumbers.length < 75
                    ? "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {/* <CircleDotIcon className="h-5 w-5 mr-2" /> */}
                Sacar Siguiente Balota
              </button>
              <div className="grid grid-cols-5 gap-2">
                {game.chosenNumbers.map((number) => (
                  <div
                    key={number}
                    className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full text-center"
                  >
                    {number}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default GameDetailPage;
