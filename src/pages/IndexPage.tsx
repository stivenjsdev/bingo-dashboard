import { getGames } from "@/api/AuthAPI";
import active from "@/assets/active.svg";
import calendar from "@/assets/calendar.svg";
import game from "@/assets/game.svg";
import inactive from "@/assets/inactive.svg";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleAddNewGame = () => {
    navigate("/game/new");
  };

  const handleSelectGame = (gameId: string) => {
    navigate(`/game/${gameId}`);
  };

  const {
    data: user,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useAuth();

  const {
    data: games,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {/* Content */}
      <div className="min-h-full bg-gray-100 pb-16">
        {/* Header */}
        <div className="w-full bg-indigo-600 p-4 sm:pt-1">
          <p className="text-white text-xs">
            Hola{" "}
            {isUserLoading || isUserError ? "Administrador" : user?.username},
          </p>
          {/* <h1 className="text-white text-2xl font-bold">Gestiona tus Juegos</h1> */}
          <h1 className="text-white text-2xl font-bold">Juegos</h1>
        </div>
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Cargando...</p>
          </div>
        )}
        {isError && (
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">Ha ocurrido un error</p>
          </div>
        )}
        {/* Games List */}
        {games && (
          <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Bingo Games Dashboard
            </h1> */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <ul className="divide-y divide-gray-200">
                  {games?.map((game) => (
                    <li
                      key={game._id}
                      className="p-4 hover:bg-gray-50"
                      onClick={() => handleSelectGame(game._id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h2 className="text-lg font-medium text-gray-900">
                            {game.gameName}
                          </h2>
                          <p className="text-sm text-gray-500 flex items-center mt-1">
                            <img
                              src={calendar}
                              alt="calendar"
                              className="h-4 w-4 mr-1"
                            />
                            {game.date.toString().split("T")[0]}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              game.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {game.active ? (
                              <img
                                src={active}
                                alt="active icon"
                                className="h-4 w-4 mr-1"
                              />
                            ) : (
                              <img
                                src={inactive}
                                alt="inactive icon"
                                className="h-4 w-4 mr-1"
                              />
                            )}
                            {game.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {/* Add new game button */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleAddNewGame}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
            >
              <img src={game} alt="game icon" className="h-6 w-6 mr-2" />
              Nuevo Juego
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
