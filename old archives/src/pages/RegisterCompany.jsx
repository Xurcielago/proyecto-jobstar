import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
import "./general.css";

export const RegisterCompany = () => {
  const { form, handleChange, handleReset } = useForm({
    company_name: "",
    about_us: "",
    location: "",
    website_url: "",
    business_size: "",
    headquarters: "",
    extended_desc: "",
    contact: "",
  });

  const navigate = useNavigate();

  const registerCompany = async (event) => {
    event.preventDefault();

    try {
      const fetchCompany = await fetch(
        "http://localhost:5000/api/auth/company",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!fetchCompany.ok) {
        console.log("Error al hacer fetch");
      }

      const data = await fetchCompany.json();

      console.log(data.Create);

      alert(data.msg);

      handleReset();
      navigate("/login");
    } catch (error) {
      console.log("Error interno del servidor " + error);
      alert("Ocurrió un error");
    }
  };

  return (
    <>
      <div className="body-container">
        <div className="chs-container">
          <header className="chs-header">Registre su empresa</header>

          <form onSubmit={registerCompany}>
            <input
              type="text"
              name="company_name"
              placeholder="Nombre de Empresa"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="about_us"
              placeholder="Acerca de..."
              onChange={handleChange}
            />
            <br />
            <label>Ubicación</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
            >
              <option value="">Seleccione una ubicación</option>
              <option value="Patiño">Patiño</option>
              <option value="Formosa Capital">Formosa Capital</option>
              <option value="Pirane">Pirané</option>
              <option value="Laishi">Laishi</option>
            </select>
            <br />
            <input
              type="text"
              name="website_url"
              placeholder="URL de su sitio"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="business_size"
              placeholder="Número de empleados"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="headquarters"
              placeholder="Sede"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="extended_desc"
              placeholder="Más información (opcional)"
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="contact"
              placeholder="Contacto (email)"
              onChange={handleChange}
            />
            <br />
            <button>Crear Perfil</button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
};
