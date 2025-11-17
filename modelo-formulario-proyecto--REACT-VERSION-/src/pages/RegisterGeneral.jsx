import { useNavigate } from "react-router";
import { useForm } from "../hooks/useForm";

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
      <form onSubmit={register}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="company"
              checked={form.role === "company"}
              onChange={handleChange}
            />
            Empresa
          </label>
          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="role"
              value="graduated"
              checked={form.role === "graduated"}
              onChange={handleChange}
            />
            Graduado
          </label>
        </div>
        <button>Registrar</button>
      </form>
    </>
  );
};
