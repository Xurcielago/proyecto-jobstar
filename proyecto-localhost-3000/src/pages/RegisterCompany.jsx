import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./RegisterCompany.css"; // Archivo CSS separado para los estilos

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

  const [activeOption, setActiveOption] = useState("Iniciar Registro");
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
      navigate("/companyprofile");
    } catch (error) {
      console.log("Error interno del servidor " + error);
      alert("Ocurrió un error");
    }
  };

  // Actualizar el panel de información según la selección
  const updateInfoPanel = (selection) => {
    setActiveOption(selection);
  };

  // Crear partículas para el fondo
  useEffect(() => {
    const createParticles = () => {
      const particlesContainer = document.getElementById("particles");
      if (!particlesContainer) return;

      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Tamaño aleatorio
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.5 + 0.1;

        // Duración de animación aleatoria
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = `${duration}s`;

        particlesContainer.appendChild(particle);
      }
    };

    // Crear líneas de cuadrícula
    const createGridLines = () => {
      const gridContainer = document.getElementById("gridLines");
      if (!gridContainer) return;

      const lineCount = 20;

      // Líneas horizontales
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement("div");
        line.classList.add("grid-line", "horizontal");
        line.style.top = `${(i / lineCount) * 100}%`;
        gridContainer.appendChild(line);
      }

      // Líneas verticales
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement("div");
        line.classList.add("grid-line", "vertical");
        line.style.left = `${(i / lineCount) * 100}%`;
        gridContainer.appendChild(line);
      }
    };

    createParticles();
    createGridLines();
  }, []);

  return (
    <div className="vr-container">
      {/* Efecto de partículas en el fondo */}
      <div className="particles" id="particles"></div>

      {/* Líneas de escaneo */}
      <div className="scan-line"></div>

      {/* Líneas de cuadrícula */}
      <div className="grid-lines" id="gridLines"></div>

      <div className="vr-content">
        {/* Esquinas decorativas */}
        <div className="corner corner-tl"></div>
        <div className="corner corner-tr"></div>
        <div className="corner corner-bl"></div>
        <div className="corner corner-br"></div>

        {/* Título */}
        <h1 className="main-title">Registro de Empresa</h1>

        {/* Panel del menú */}
        <div className="menu-panel">
          <div className="menu-options">
            <button
              className={`menu-item ${
                activeOption === "Iniciar Registro" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Iniciar Registro")}
            >
              Iniciar Registro
            </button>
            <button
              className={`menu-item ${
                activeOption === "Información Básica" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Información Básica")}
            >
              Información Básica
            </button>
            <button
              className={`menu-item ${
                activeOption === "Ubicación" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Ubicación")}
            >
              Ubicación
            </button>
            <button
              className={`menu-item ${
                activeOption === "Detalles" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Detalles")}
            >
              Detalles
            </button>
            <button
              className={`menu-item ${
                activeOption === "Contacto" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Contacto")}
            >
              Contacto
            </button>
            <button
              className={`menu-item ${
                activeOption === "Finalizar" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Finalizar")}
            >
              Finalizar
            </button>
          </div>

          {/* Panel de información */}
          <div className="info-panel active">
            {activeOption === "Iniciar Registro" && (
              <>
                <h2>Bienvenido al Sistema de Registro</h2>
                <p>
                  Complete el formulario para registrar su empresa en nuestra
                  plataforma.
                </p>
                <p>
                  Estado del sistema:{" "}
                  <span style={{ color: "#0f0" }}>Operativo</span>
                </p>
              </>
            )}

            {activeOption === "Información Básica" && (
              <>
                <h2>Información Básica de la Empresa</h2>
                <p>Proporcione los datos fundamentales de su organización.</p>
              </>
            )}

            {activeOption === "Ubicación" && (
              <>
                <h2>Ubicación de la Empresa</h2>
                <p>Seleccione la ubicación principal de operaciones.</p>
              </>
            )}

            {activeOption === "Detalles" && (
              <>
                <h2>Detalles Adicionales</h2>
                <p>Complete información adicional sobre su empresa.</p>
              </>
            )}

            {activeOption === "Contacto" && (
              <>
                <h2>Información de Contacto</h2>
                <p>Proporcione los datos para contactar a su empresa.</p>
              </>
            )}

            {activeOption === "Finalizar" && (
              <>
                <h2>Finalizar Registro</h2>
                <p>Revise la información y complete el registro.</p>
              </>
            )}
          </div>

          {/* Formulario de registro */}
          <form onSubmit={registerCompany} className="vr-form">
            <div className="form-section">
              <input
                type="text"
                name="company_name"
                placeholder="Nombre de Empresa"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
              <input
                type="text"
                name="about_us"
                placeholder="Acerca de..."
                onChange={handleChange}
                className="vr-input"
              />
              <br />
            </div>

            <div className="form-section">
              <label className="vr-label">Ubicación</label>
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                className="vr-select"
              >
                <option value="">Seleccione una ubicación</option>
                <option value="Patiño">Patiño</option>
                <option value="Formosa-Capital">Formosa Capital</option>
                <option value="Pirane">Pirané</option>
                <option value="Laishi">Laishi</option>
              </select>
              <br />
              <input
                type="text"
                name="website_url"
                placeholder="URL de su sitio"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
            </div>

            <div className="form-section">
              <input
                type="text"
                name="business_size"
                placeholder="Número de empleados"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
              <input
                type="text"
                name="headquarters"
                placeholder="Sede"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
            </div>

            <div className="form-section">
              <input
                type="text"
                name="extended_desc"
                placeholder="Más información (opcional)"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
              <input
                type="text"
                name="contact"
                placeholder="Contacto (email)"
                onChange={handleChange}
                className="vr-input"
              />
              <br />
            </div>

            <button className="vr-button">Crear Perfil</button>
          </form>
        </div>
      </div>
    </div>
  );
};
