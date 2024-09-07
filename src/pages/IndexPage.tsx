// import { useGame } from "../hooks/useGame";
import active from "@/assets/active.svg";
import calendar from "@/assets/calendar.svg";
import game from "@/assets/game.svg";
import inactive from "@/assets/inactive.svg";

const IndexPage = () => {
  // const { state } = useGame();

  const games = [
    { id: "1", name: "Friday Night Bingo", isActive: true, date: "2023-06-02" },
    { id: "2", name: "Weekend Special", isActive: false, date: "2023-06-03" },
    {
      id: "3",
      name: "Charity Bingo Event",
      isActive: true,
      date: "2023-06-05",
    },
    {
      id: "4",
      name: "Senior Citizens Bingo",
      isActive: true,
      date: "2023-06-07",
    },
    {
      id: "5",
      name: "Monthly Mega Bingo",
      isActive: false,
      date: "2023-06-15",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="w-full bg-indigo-600 p-4 sm:pt-1">
        <p className="text-white text-xs">Hola Stiven Trujillo,</p>
        {/* <h1 className="text-white text-2xl font-bold">Gestiona tus Juegos</h1> */}
        <h1 className="text-white text-2xl font-bold">Juegos</h1>
      </div>
      {/* Content */}
      <div className="min-h-screen bg-gray-100 pb-16">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Bingo Games Dashboard
          </h1> */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <ul className="divide-y divide-gray-200">
                {games.map((game) => (
                  <li key={game.id} className="p-4 hover:bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="mb-2 sm:mb-0">
                        <h2 className="text-lg font-medium text-gray-900">
                          {game.name}
                        </h2>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <img
                            src={calendar}
                            alt="calendar"
                            className="h-4 w-4 mr-1"
                          />
                          {game.date}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            game.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {game.isActive ? (
                            <img src={active} alt="active icon" className="h-4 w-4 mr-1" />
                          ) : (
                            <img src={inactive} alt="inactive icon" className="h-4 w-4 mr-1" />
                          )}
                          {game.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg p-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => console.log("Add new game")}
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
