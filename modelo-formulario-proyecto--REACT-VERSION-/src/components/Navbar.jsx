import { Link } from "react-router";
import { Logout } from "./Logout";
import "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/register">Registro</Link>
        </li>
        <li>
          <Link to="/jobpost">Crear Trabajo</Link>
        </li>
        <li>
          <Link to="/jobs">Ver Ofertas</Link>
        </li>
        <li>
          <Link to="/messages">Enviar mensaje</Link>
        </li>
        <li>
          <Link to="/mymessages">Mis mensajes</Link>
        </li>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        <Logout />
      </ul>
    </nav>
  );
};
