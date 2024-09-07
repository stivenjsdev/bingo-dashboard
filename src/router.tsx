import AuthLayout from "@/layouts/AuthLayout";
import Layout from "@/layouts/Layout";
import IndexPage from "@/pages/IndexPage";
import LoginPage from "@/pages/LoginPage";
import NewGamePage from "@/pages/NewGamePage";
import NotFoundPage from "@/pages/NotFoundPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/games/new" element={<NewGamePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
