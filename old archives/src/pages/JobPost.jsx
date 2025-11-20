import { useForm } from "../hooks/useForm";
import { useState, useEffect, useRef } from "react";

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
  const [activeOption, setActiveOption] = useState("Iniciar Experiencia");
  const particlesRef = useRef(null);
  const gridLinesRef = useRef(null);

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
    createParticles();
    createGridLines();
  }, []);

  // Crear partículas para el fondo
  const createParticles = () => {
    const particlesContainer = particlesRef.current;
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
    const gridContainer = gridLinesRef.current;
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

  // Actualizar el panel de información
  const updateInfoPanel = (selection) => {
    setActiveOption(selection);
  };

  const createJobPost = async (event) => {
    event.preventDefault();
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

      if (!fetchJobPost.ok) {
        console.log("Error al realizar el fetch");
      }

      const data = await fetchJobPost.json();

      console.log(data.Create);

      alert(data.msg);
      handleReset();
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  return (
    <div className="vr-container">
      {/* Efecto de partículas en el fondo */}
      <div className="particles" ref={particlesRef}></div>

      {/* Líneas de escaneo */}
      <div className="scan-line"></div>

      {/* Líneas de cuadrícula */}
      <div className="grid-lines" ref={gridLinesRef}></div>

      {/* Esquinas decorativas */}
      <div className="corner corner-tl"></div>
      <div className="corner corner-tr"></div>
      <div className="corner corner-bl"></div>
      <div className="corner corner-br"></div>

      {/* Título */}
      <h1 className="main-title">JobStar - Crear Oferta Laboral</h1>

      {/* Panel del menú */}

      {/* Formulario de creación de oferta laboral */}
      <div className="menu-panel" style={{ marginTop: "30px" }}>
        <h2 className="subtitle">Crear Oferta Laboral</h2>
        <form onSubmit={createJobPost} className="vr-form">
          <div className="form-group">
            <input
              type="text"
              name="job_name"
              placeholder="Nombre del Trabajo"
              value={job_name}
              onChange={handleChange}
              className="vr-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="job_description"
              placeholder="Descripción"
              value={job_description}
              onChange={handleChange}
              className="vr-input"
            />
          </div>
          <div className="form-group">
            <label className="vr-label">Tipo de Jornada</label>
            <select
              name="job_type_id"
              value={job_type_id}
              onChange={handleChange}
              className="vr-select"
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
            <label className="vr-label">Modalidad</label>
            <select
              name="modality_id"
              value={modality_id}
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
          <button className="vr-button">Crear Oferta</button>
        </form>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Orbitron", sans-serif;
        }

        .vr-container {
          background: #000;
          color: #0ff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          position: relative;
          padding: 20px;
        }

        /* Fondo con efecto de partículas */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .particle {
          position: absolute;
          background: rgba(0, 255, 255, 0.5);
          border-radius: 50%;
          animation: float 15s infinite linear;
        }

        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
          }
        }

        /* Título principal */
        .main-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 4px;
          text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
          animation: pulse 3s infinite alternate;
        }

        .subtitle {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 5px #0ff, 0 0 10px #0ff;
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
            text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
          }
          100% {
            opacity: 1;
            text-shadow: 0 0 15px #0ff, 0 0 30px #0ff, 0 0 45px #0ff;
          }
        }

        /* Panel de menú */
        .menu-panel {
          background: rgba(10, 20, 30, 0.8);
          border: 2px solid #0ff;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5),
            inset 0 0 20px rgba(0, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          width: 90%;
          max-width: 800px;
          margin-bottom: 20px;
        }

        /* Opciones del menú */
        .menu-options {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .menu-item {
          background: transparent;
          border: 1px solid #0ff;
          border-radius: 5px;
          padding: 15px 20px;
          color: #0ff;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .menu-item:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
          transform: translateY(-3px);
        }

        .menu-item:before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
        }

        .menu-item:hover:before {
          left: 100%;
        }

        /* Indicador de selección */
        .menu-item.active {
          background: rgba(0, 255, 255, 0.2);
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
        }

        /* Panel de información */
        .info-panel {
          margin-top: 30px;
          padding: 20px;
          background: rgba(0, 20, 40, 0.7);
          border: 1px solid #0ff;
          border-radius: 5px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Efectos de líneas de cuadrícula */
        .grid-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
        }

        .grid-line {
          position: absolute;
          background: rgba(0, 255, 255, 0.1);
        }

        .grid-line.horizontal {
          width: 100%;
          height: 1px;
        }

        .grid-line.vertical {
          width: 1px;
          height: 100%;
        }

        /* Efectos de escaneo */
        .scan-line {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #0ff, transparent);
          animation: scan 4s linear infinite;
          opacity: 0.7;
          z-index: 2;
        }

        @keyframes scan {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }

        /* Efectos de esquina */
        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #0ff;
        }

        .corner-tl {
          top: 10px;
          left: 10px;
          border-right: none;
          border-bottom: none;
        }

        .corner-tr {
          top: 10px;
          right: 10px;
          border-left: none;
          border-bottom: none;
        }

        .corner-bl {
          bottom: 10px;
          left: 10px;
          border-right: none;
          border-top: none;
        }

        .corner-br {
          bottom: 10px;
          right: 10px;
          border-left: none;
          border-top: none;
        }

        /* Estilos del formulario */
        .vr-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .vr-label {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #0ff;
        }

        .vr-input,
        .vr-select {
          background: rgba(0, 20, 40, 0.7);
          border: 1px solid #0ff;
          border-radius: 5px;
          padding: 12px 15px;
          color: #0ff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .vr-input:focus,
        .vr-select:focus {
          outline: none;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.7);
          background: rgba(0, 30, 60, 0.7);
        }

        .vr-input::placeholder {
          color: rgba(0, 255, 255, 0.5);
        }

        .vr-button {
          background: transparent;
          border: 1px solid #0ff;
          border-radius: 5px;
          padding: 15px 20px;
          color: #0ff;
          font-size: 1.2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          margin-top: 10px;
        }

        .vr-button:hover {
          background: rgba(0, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
          transform: translateY(-3px);
        }

        .vr-button:before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(0, 255, 255, 0.4),
            transparent
          );
          transition: left 0.5s;
        }

        .vr-button:hover:before {
          left: 100%;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .main-title {
            font-size: 1.8rem;
          }

          .menu-item {
            font-size: 1rem;
            padding: 12px 15px;
          }

          .vr-button {
            font-size: 1rem;
            padding: 12px 15px;
          }
        }
      `}</style>
    </div>
  );
};
