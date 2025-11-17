import { Link } from "react-router";
import { Logout } from "./Logout";
import "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/home">Home</Link> <br />
      <Link to="/login">Iniciar Sesión</Link> <br />
      <Link to="/register">Registro</Link> <br />
      <Link to="/jobpost">Crear Trabajo</Link>
      <br />
      <Logout />
    </nav>
  );
};
