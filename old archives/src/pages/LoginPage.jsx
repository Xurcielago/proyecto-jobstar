import { useForm } from "../hooks/useForm.js";
import { useNavigate } from "react-router";
import "./login.css";

export const Login = () => {
  const { form, handleChange } = useForm({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = form;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const fetchLogin = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!fetchLogin.ok) {
        console.log("Error al realizar el fetch");
      }

      const data = await fetchLogin.json();

      localStorage.setItem("token", data.token);
      alert(data.msg);

      console.log(data);

      navigate("/home");
    } catch (error) {
      console.log("Error interno del server " + error);
    }
  };

  return (
    <div className="background-container">
      <div className="left-panel">{}</div>
      <div className="right-panel">
        <h2>Iniciar Sesión</h2>
        {
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
              />
            </div>
            <br />
            <button className="class-button">Login</button>
          </form>
        }
      </div>
    </div>
  );
};
