import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
