import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { gameSocket } from "@/sockets/gameSocket";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "../components/Header";

const Layout = () => {
  const { dispatch } = useGame();
  const { data, isError, isLoading } = useAuth();

  useEffect(() => {
    // data => admin user data
    if (data) {
      // create a socket connection
      const socket = io(import.meta.env.VITE_API_BASE_URL);

      // save socket connection to context
      dispatch({ type: "SET_SOCKET", payload: { socket } });

      // handle socket events
      gameSocket(socket);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" />;
  }

  if (data)
    return (
      <div className="flex flex-col h-screen">
        <Header logoutButton />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
};

export default Layout;
