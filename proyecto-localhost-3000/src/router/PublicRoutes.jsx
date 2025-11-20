import { Navigate, Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const PublicRoutes = () => {
  const isLogged = localStorage.getItem("token");

  return !isLogged ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/home" />
  );
};
