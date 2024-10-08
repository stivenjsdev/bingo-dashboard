import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/hooks/useGame";
import { gameSocket } from "@/sockets/gameSocket";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { io } from "socket.io-client";

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

      // save user data to context
      dispatch({ type: "SET_USER", payload: { user: data } });

      // handle socket events
      gameSocket(data, socket, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
        <LoadingSpinner />
      </div>
    );
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
