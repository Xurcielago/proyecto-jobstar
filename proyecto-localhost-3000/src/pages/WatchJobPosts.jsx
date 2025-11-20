import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import "./WatchJobPosts.css"; // Archivo CSS para los estilos

export const WatchJobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [modalities, setModalities] = useState([]);
  const [role, setRole] = useState("");
  const [activeOption, setActiveOption] = useState("Ver Ofertas");
  const [editingPost, setEditingPost] = useState(null);

  const { form, handleChange } = useForm({
    job_name: "",
    job_description: "",
    job_type_id: "",
    modality_id: "",
  });

  const loadData = async () => {
    try {
      const [typeRes, modRes] = await Promise.all([
        fetch("http://localhost:3000/api/auth/jobtype", {
          credentials: "include",
        }),
        fetch("http://localhost:3000/api/auth/modality", {
          credentials: "include",
        }),
      ]);

      const types = await typeRes.json();
      const mods = await modRes.json();

      setJobTypes(types.getAll);
      setModalities(mods.getAll);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  const getRole = async () => {
    try {
      const fetchUser = await fetch(
        "http://localhost:3000/api/auth/user/myuser",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await fetchUser.json();
      setRole(data.getByID.role);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  useEffect(() => {
    loadData();
    getRole();
  }, []);

  const getAllPosts = async () => {
    try {
      const fetchPosts = await fetch("http://localhost:3000/api/auth/jobpost", {
        method: "GET",
        credentials: "include",
      });

      const data = await fetchPosts.json();
      setJobs(data.getAll);
      console.log(data.getAll);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  const updatePost = async (postID) => {
    try {
      const fetchUpdate = await fetch(
        `http://localhost:3000/api/auth/jobpost/${postID}`,
        {
          method: "PUT",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (fetchUpdate.ok) {
        alert("Post actualizado correctamente");
        setEditingPost(null);
        getAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

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
        <h1 className="main-title">Sistema de Ofertas Laborales</h1>

        {/* Panel del menú */}
        <div className="menu-panel">
          <div className="menu-options">
            <button
              className={`menu-item ${
                activeOption === "Ver Ofertas" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Ver Ofertas")}
            >
              Ver Ofertas
            </button>
            <button
              className={`menu-item ${
                activeOption === "Filtrar" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Filtrar")}
            >
              Filtrar
            </button>
            <button
              className={`menu-item ${
                activeOption === "Estadísticas" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Estadísticas")}
            >
              Estadísticas
            </button>
            {role === "company" && (
              <button
                className={`menu-item ${
                  activeOption === "Gestión" ? "active" : ""
                }`}
                onClick={() => updateInfoPanel("Gestión")}
              >
                Gestión
              </button>
            )}
          </div>

          {/* Panel de información */}
          <div className="info-panel active">
            {activeOption === "Ver Ofertas" && (
              <>
                <h2>Ofertas Laborales Disponibles</h2>
                <p>
                  Explora las oportunidades laborales publicadas en nuestra
                  plataforma.
                </p>
                <p>
                  Total de ofertas:{" "}
                  <span style={{ color: "#0f0" }}>{jobs.length}</span>
                </p>
              </>
            )}

            {activeOption === "Filtrar" && (
              <>
                <h2>Filtrar Ofertas</h2>
                <p>
                  Utiliza los filtros para encontrar ofertas específicas según
                  tus preferencias.
                </p>
              </>
            )}

            {activeOption === "Estadísticas" && (
              <>
                <h2>Estadísticas del Mercado</h2>
                <p>
                  Información general sobre las ofertas laborales disponibles.
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

            {activeOption === "Gestión" && (
              <>
                <h2>Gestión de Ofertas</h2>
                <p>
                  Como empresa, puedes editar y gestionar tus ofertas laborales
                  publicadas.
                </p>
                <p>
                  Ofertas activas:{" "}
                  <span style={{ color: "#0f0" }}>
                    {jobs.filter((job) => job.company).length}
                  </span>
                </p>
              </>
            )}
          </div>

          {/* Lista de trabajos */}
          <div className="jobs-container">
            {jobs.map((job) => {
              const currentType = jobTypes.find(
                (t) => t.id === job.job_type_id
              );
              const currentModality = modalities.find(
                (m) => m.id === job.modality_id
              );

              return (
                <div key={job.id} className="job-card">
                  <div className="job-header">
                    <h3 className="job-title">{job.job_name}</h3>
                    <div className="job-company">
                      <strong>Compañía:</strong>{" "}
                      {job.company ? job.company.company_name : "Sin compañía"}
                    </div>
                  </div>

                  <div className="job-content">
                    <p className="job-description">{job.job_description}</p>

                    <div className="job-details">
                      <div className="detail-item">
                        <span className="detail-label">Tipo de Jornada:</span>
                        <span className="detail-value">
                          {currentType ? currentType.type : "Sin dato"}
                        </span>
                      </div>

                      <div className="detail-item">
                        <span className="detail-label">Modalidad:</span>
                        <span className="detail-value">
                          {currentModality
                            ? currentModality.modality
                            : "Sin dato"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {role === "company" && (
                    <div className="job-actions">
                      <button
                        className="vr-button edit-btn"
                        onClick={() => {
                          setEditingPost(job.id);
                          handleChange({
                            target: { name: "job_name", value: job.job_name },
                          });
                          handleChange({
                            target: {
                              name: "job_description",
                              value: job.job_description,
                            },
                          });
                          handleChange({
                            target: {
                              name: "job_type_id",
                              value: job.job_type_id,
                            },
                          });
                          handleChange({
                            target: {
                              name: "modality_id",
                              value: job.modality_id,
                            },
                          });
                        }}
                      >
                        Editar Oferta
                      </button>

                      {editingPost === job.id && (
                        <div className="edit-form">
                          <h4>Editar Oferta Laboral</h4>

                          <div className="form-group">
                            <label className="vr-label">
                              Nombre del Puesto
                            </label>
                            <input
                              type="text"
                              value={form.job_name}
                              name="job_name"
                              onChange={handleChange}
                              className="vr-input"
                            />
                          </div>

                          <div className="form-group">
                            <label className="vr-label">Descripción</label>
                            <textarea
                              value={form.job_description}
                              name="job_description"
                              onChange={handleChange}
                              className="vr-textarea"
                              rows="4"
                            />
                          </div>

                          <div className="form-row">
                            <div className="form-group">
                              <label className="vr-label">
                                Tipo de Jornada
                              </label>
                              <select
                                name="job_type_id"
                                value={form.job_type_id}
                                onChange={handleChange}
                                className="vr-select"
                              >
                                <option value="">
                                  Seleccioná el tipo de jornada
                                </option>
                                {jobTypes.map((jt) => (
                                  <option key={jt.id} value={jt.id}>
                                    {jt.type}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="form-group">
                              <label className="vr-label">Modalidad</label>
                              <select
                                name="modality_id"
                                value={form.modality_id}
                                onChange={handleChange}
                                className="vr-select"
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

                          <div className="form-actions">
                            <button
                              className="vr-button save-btn"
                              onClick={() => updatePost(job.id)}
                            >
                              Guardar Cambios
                            </button>
                            <button
                              className="vr-button cancel-btn"
                              onClick={() => setEditingPost(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
