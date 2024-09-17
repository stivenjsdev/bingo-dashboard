import calendar from "@/assets/calendar.svg";
import key from "@/assets/key.svg";
import logoAdmin from "@/assets/logoadmin.svg";
import change from "@/assets/reload.svg";
import trophy from "@/assets/trophy.svg";
import whatsapp from "@/assets/whatsapp.svg";
import TakeOutButton from "@/components/TakeOutButton";
import { useGame } from "@/hooks/useGame";
import { NewPlayerForm, Player } from "@/types/index";
import { capitalizeWords, dateFormatter, getBingoLetter } from "@/utils/game";
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
      socket.emit("getGame", id);
      socket.on("connect", () => {
        socket.emit("joinGame", id);
      });
    }

    return () => {
      if (socket) {
        socket.emit("leaveRoom", id);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, id]);

  useEffect(() => {
    if (hasTokenExpired) {
      console.log("token-expired");
      dispatch({ type: "LOGOUT" });
      navigate("/auth/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTokenExpired]);

  const handleCreatePlayer = (formData: NewPlayerForm) => {
    console.log("createPlayer", formData);
    const newPlayer = { ...formData, gameId: id };
    socket.emit("createPlayer", newPlayer);
    reset();
    setShowAddPlayer(false);
  };

  const handleTakeOutNumber = () => {
    console.log("takeBallOut");
    socket.emit("takeBallOut", id);
  };

  const handleResetGame = () => {
    console.log("resetGame");
    socket.emit("resetGame", id);
  };

  const handleDeletePlayer = (playerId: string) => {
    console.log("delete-player");
    socket.emit("deletePlayer", playerId, id);
  };

  const handleSendPlayer = (player: Player) => {
    console.log("send-player");
    const message = `Hola ${capitalizeWords(
      player.name
    )}, tu código para el juego es: ${
      player.code
    }. Puedes ingresar al juego en: https://bingost.netlify.app/auth/login/${
      player.code
    }`;
    // todo: add code in url automatically
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppUrl = `https://wa.me/${player.wpNumber}?text=${encodedMessage}`;
    window.open(WhatsAppUrl, "_blank");
  };

  const handleChangeCard = (playerId: string) => {
    console.log("changeCard");
    socket.emit("changeCard", playerId, id);
  };

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
                {/* {game.date.toString().split("T")[0]} */}
                {dateFormatter(new Date(game.date))}
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
                  className={`px-3 py-1 rounded-md text-xs font-medium transform active:scale-90 transition duration-150 ${
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
                      {capitalizeWords(game.winner.name)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No determinado aún
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Jugadores: <span className="text-base text-gray-700">{game.players.length}</span>
              </h3>
              <ul className="divide-y divide-gray-200">
                {game.players.map((player) => (
                  <li
                    key={player._id}
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex flex-col min-w-28">
                      <span className="text-sm font-medium text-gray-900 flex flex-row items-center">
                        {player.name && capitalizeWords(player.name)}
                        {player.online && (
                          <span className="rounded-full w-2  h-2 aspect-square bg-green-500 ml-1"></span>
                        )}
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
                      <>
                        <div>
                          <button
                            className="transform active:scale-90 transition duration-150"
                            onClick={() => handleChangeCard(player._id)}
                          >
                            <img
                              src={change}
                              alt="change icon"
                              className="w-10"
                            />
                          </button>
                        </div>
                        <div className="flex flex-col gap-2 py-2">
                          <button
                            onClick={() => handleDeletePlayer(player._id)}
                            className="px-3 py-1 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200"
                          >
                            Eliminar
                          </button>

                          <button
                            onClick={() => handleSendPlayer(player)}
                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-medium hover:bg-yellow-200"
                          >
                            Enviar
                          </button>
                        </div>
                      </>
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
            <div className="flex flex-col gap-4 px-4 py-5 sm:p-6 border-t border-gray-200">
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  <img
                    className="w-6 h-6 mr-2 inline-block"
                    src={logoAdmin}
                    alt="start icon"
                  />
                  Balotas
                </h3>
                <h4 className="text-sm">{game.chosenNumbers.length} de 75</h4>
              </div>
              {/* <button
                onClick={handleTakeOutNumber}
                disabled={!game.active || game.chosenNumbers.length === 75}
                className={`mb-6 w-full px-4 py-2 rounded-md flex items-center justify-center transform active:scale-90 transition duration-150 ${
                  game.active && game.chosenNumbers.length < 75
                    ? "bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Sacar Siguiente Balota
              </button> */}
              <TakeOutButton
                noActive={!game.active || game.chosenNumbers.length === 75}
                handleOnClick={handleTakeOutNumber}
              />
              <div className="grid grid-cols-5 gap-2">
                {game.chosenNumbers.map((number) => (
                  <div
                    key={number}
                    className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded-full text-center"
                  >
                    {getBingoLetter(number).toUpperCase()} {number}
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
