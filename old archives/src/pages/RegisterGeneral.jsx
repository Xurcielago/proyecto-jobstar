import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";
import "./login.css";

export const RegisterGeneral = () => {
  const navigate = useNavigate();

  const { form, handleChange, handleReset } = useForm({
    email: "",
    password: "",
    role: "",
  });

  const register = async (event) => {
    event.preventDefault();
    try {
      const fetchRegister = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!fetchRegister.ok) {
        console.log("Error al hacer fetch");
      }

      const data = await fetchRegister.json();

      if (!data.ok) {
        console.log("Error interno " + data.msg);
      }

      console.log(data.newUser);

      alert(data.msg);

      navigate("/login");

      handleReset();
    } catch (error) {
      console.log("Error interno del server " + error);
    }
  };

  return (
    <>
      <div className="background-container">
        <div className="left-panel">{}</div>
        <div className="right-panel">
          <h2>Registro</h2>
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
              />
              <div>
                <div>
                  <label className="radio-group">
                    Empresa
                    <input
                      type="radio"
                      name="role"
                      value="company"
                      checked={form.role === "company"}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <label className="radio-group">
                    Graduado
                    <input
                      type="radio"
                      name="role"
                      value="graduated"
                      checked={form.role === "graduated"}
                      onChange={handleChange}
                    />
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
            <button>Registrar</button>
          </form>
        </div>
      </div>
    </>
  );
};
