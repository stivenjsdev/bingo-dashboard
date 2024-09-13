import bingoLogo from "@/assets/logoadmin.svg";
import { useGame } from "@/hooks/useGame";
import { Link, useNavigate } from "react-router-dom";

type HeaderProps = {
  logoutButton?: boolean;
};

const Header = ({ logoutButton = false }: HeaderProps) => {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    state.socket.disconnect();
    dispatch({ type: "LOGOUT" });
    navigate("/auth/login");
  };

  return (
    <header className="max-h-20 bg-indigo-600 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          <div className="flex items-center">
            <div className="flex items-center">
              <img className="w-11" src={bingoLogo} alt="logo Bingo" />
              {logoutButton ? (
                <Link to="/">
                  <span className="ml-2 text-white text-lg sm:text-xl font-semibold">
                    Bin<span className="text-purple-300">Go</span>!
                  </span>
                </Link>
              ) : (
                <span className="ml-2 text-white text-lg sm:text-xl font-semibold">
                  Bin<span className="text-purple-300">Go</span>!
                </span>
              )}
            </div>
          </div>
          {logoutButton && (
            <nav className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
              >
                Cerrar Sesión
              </button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
