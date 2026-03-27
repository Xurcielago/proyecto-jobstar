import { useForm } from "../hooks/useForm";
import { useState, useEffect } from "react";
import "./JobPost.css"; // Archivo CSS para los estilos

export const JobPost = () => {
  const { form, handleChange, handleReset } = useForm({
    job_name: "",
    job_description: "",
    job_type_id: "",
    modality_id: "",
  });

  const { job_name, job_description, job_type_id, modality_id } = form;

  const [jobTypes, setJobTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [activeOption, setActiveOption] = useState("Crear Oferta");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [typeRes, modRes] = await Promise.all([
        fetch("http://localhost:5000/api/auth/jobtype", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/auth/modality", {
          credentials: "include",
        }),
      ]);

      const types = await typeRes.json();
      const mods = await modRes.json();

      setJobTypes(types.getAll);
      setModalities(mods.getAll);
    } catch (error) {
      console.log("Error cargando jobtypes o modalities" + error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createJobPost = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const fetchJobPost = await fetch(
        "http://localhost:5000/api/auth/jobpost",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      console.log(fetchJobPost)

      if (!fetchJobPost.ok) {
        console.log("Error al realizar el fetch");
        alert("Error al crear la oferta laboral");
        return;
      }

      const data = await fetchJobPost.json();

      console.log(data.Create);

      alert(data.msg);
      handleReset();
    } catch (error) {
      console.log("Error interno del servidor " + error);
      alert("Error interno del servidor");
    } finally {
      setIsSubmitting(false);
    }
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

  // Actualizar el panel de información según la selección
  const updateInfoPanel = (selection) => {
    setActiveOption(selection);
  };

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
        <h1 className="main-title">Sistema de Publicación</h1>

        {/* Panel del menú */}
        <div className="menu-panel">
          <div className="menu-options">
            <button
              className={`menu-item ${
                activeOption === "Crear Oferta" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Crear Oferta")}
              type="button"
            >
              Crear Oferta
            </button>
            <button
              className={`menu-item ${
                activeOption === "Configuración" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Configuración")}
              type="button"
            >
              Configuración
            </button>
            <button
              className={`menu-item ${
                activeOption === "Plantillas" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Plantillas")}
              type="button"
            >
              Plantillas
            </button>
            <button
              className={`menu-item ${
                activeOption === "Estadísticas" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Estadísticas")}
              type="button"
            >
              Estadísticas
            </button>
          </div>

          {/* Panel de información */}
          <div className="info-panel active">
            {activeOption === "Crear Oferta" && (
              <>
                <h2>Crear Nueva Oferta Laboral</h2>
                <p>
                  Complete todos los campos para publicar una nueva oferta
                  laboral en la plataforma.
                </p>
                <p>
                  Campos requeridos:{" "}
                  <span style={{ color: "#0f0" }}>Todos</span>
                </p>
              </>
            )}

            {activeOption === "Configuración" && (
              <>
                <h2>Configuración de Publicación</h2>
                <p>
                  Configure los parámetros de visibilidad y duración de sus
                  ofertas laborales.
                </p>
                <p>
                  Tipos de jornada disponibles:{" "}
                  <span style={{ color: "#ff0" }}>{jobTypes.length}</span>
                </p>
                <p>
                  Modalidades disponibles:{" "}
                  <span style={{ color: "#ff0" }}>{modalities.length}</span>
                </p>
              </>
            )}

            {activeOption === "Plantillas" && (
              <>
                <h2>Plantillas Predefinidas</h2>
                <p>
                  Utilice plantillas predefinidas para agilizar el proceso de
                  publicación.
                </p>
                <p>
                  Plantillas activas: <span style={{ color: "#0f0" }}>3</span>
                </p>
              </>
            )}

            {activeOption === "Estadísticas" && (
              <>
                <h2>Estadísticas de Publicación</h2>
                <p>Revise el rendimiento de sus publicaciones anteriores.</p>
                <p>
                  Tasa de éxito: <span style={{ color: "#0f0" }}>85%</span>
                </p>
              </>
            )}
          </div>

          {/* Formulario de creación de oferta */}
          <form onSubmit={createJobPost} className="vr-form">
            <div className="form-section">
              <h3 className="form-section-title">Información Básica</h3>

              <div className="form-group">
                <label className="vr-label">Nombre del Puesto</label>
                <input
                  type="text"
                  name="job_name"
                  placeholder="Ej: Desarrollador Frontend Senior"
                  value={job_name}
                  onChange={handleChange}
                  className="vr-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="vr-label">Descripción del Puesto</label>
                <textarea
                  name="job_description"
                  placeholder="Describa las responsabilidades, requisitos y beneficios del puesto..."
                  value={job_description}
                  onChange={handleChange}
                  className="vr-textarea"
                  rows="5"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Configuración Laboral</h3>

              <div className="form-row">
                <div className="form-group">
                  <label className="vr-label">Tipo de Jornada</label>
                  <select
                    name="job_type_id"
                    value={job_type_id}
                    onChange={handleChange}
                    className="vr-select"
                    required
                  >
                    <option value="">Seleccioná el tipo de jornada</option>
                    {jobTypes.map((jt) => (
                      <option key={jt.id} value={jt.id}>
                        {jt.type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="vr-label">Modalidad de Trabajo</label>
                  <select
                    name="modality_id"
                    value={modality_id}
                    onChange={handleChange}
                    className="vr-select"
                    required
                  >
                    <option value="">Seleccioná modalidad</option>
                    {modalities.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.modality}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="vr-button submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Publicando...
                  </>
                ) : (
                  "Publicar Oferta"
                )}
              </button>

              <button
                type="button"
                className="vr-button reset-btn"
                onClick={handleReset}
                disabled={isSubmitting}
              >
                Limpiar Formulario
              </button>
            </div>

            <div className="form-status">
              <div className="status-item">
                <span className="status-label">Nombre:</span>
                <span
                  className={`status-value ${job_name ? "active" : "inactive"}`}
                >
                  {job_name ? "✓ Completado" : "✗ Pendiente"}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Descripción:</span>
                <span
                  className={`status-value ${
                    job_description ? "active" : "inactive"
                  }`}
                >
                  {job_description ? "✓ Completado" : "✗ Pendiente"}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Jornada:</span>
                <span
                  className={`status-value ${
                    job_type_id ? "active" : "inactive"
                  }`}
                >
                  {job_type_id ? "✓ Completado" : "✗ Pendiente"}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Modalidad:</span>
                <span
                  className={`status-value ${
                    modality_id ? "active" : "inactive"
                  }`}
                >
                  {modality_id ? "✓ Completado" : "✗ Pendiente"}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
