import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import "./SendMessage.css"; // Archivo CSS para los estilos

export const SendMessage = () => {
  const [businessUsers, setBusinessUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [activeOption, setActiveOption] = useState("Nuevo Mensaje");

  const { form, handleChange, handleReset } = useForm({
    content: "",
    receiver_id: "",
  });

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/company", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error cargando usuarios");

      const data = await response.json();
      const dataUsers = await data.getAll;

      console.log(dataUsers);
      setBusinessUsers(dataUsers);
    } catch (error) {
      console.error("Error al cargar usuarios " + error);
    }
  };

  useEffect(() => {
    loadData();
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

  const sendMsg = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (!form.receiver_id || !form.content) {
      alert("Por favor seleccione un destinatario y escribe un mensaje");
      setStatus(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error en la petición");
      }

      const data = await response.json();
      console.log("Mensaje enviado:", data);

      setStatus("success");
      handleReset();
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setStatus("error");
    }
  };

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
        <h1 className="main-title">Sistema de Comunicación</h1>

        {/* Panel del menú */}
        <div className="menu-panel">
          <div className="menu-options">
            <button
              className={`menu-item ${
                activeOption === "Nuevo Mensaje" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Nuevo Mensaje")}
              type="button"
            >
              Nuevo Mensaje
            </button>
            <button
              className={`menu-item ${
                activeOption === "Bandeja de Entrada" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Bandeja de Entrada")}
              type="button"
            >
              Bandeja de Entrada
            </button>
            <button
              className={`menu-item ${
                activeOption === "Contactos" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Contactos")}
              type="button"
            >
              Contactos
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
          </div>

          {/* Panel de información */}
          <div className="info-panel active">
            {activeOption === "Nuevo Mensaje" && (
              <>
                <h2>Nuevo Mensaje</h2>
                <p>Envía un mensaje a otros usuarios de la plataforma.</p>
                <p>
                  Contactos disponibles:{" "}
                  <span style={{ color: "#0f0" }}>{businessUsers.length}</span>
                </p>
              </>
            )}

            {activeOption === "Bandeja de Entrada" && (
              <>
                <h2>Bandeja de Entrada</h2>
                <p>Revisa los mensajes que has recibido de otros usuarios.</p>
                <p>
                  Mensajes no leídos: <span style={{ color: "#ff0" }}>0</span>
                </p>
              </>
            )}

            {activeOption === "Contactos" && (
              <>
                <h2>Lista de Contactos</h2>
                <p>Gestiona tu lista de contactos y empresas conectadas.</p>
                <p>
                  Contactos activos:{" "}
                  <span style={{ color: "#0f0" }}>{businessUsers.length}</span>
                </p>
              </>
            )}

            {activeOption === "Configuración" && (
              <>
                <h2>Configuración de Mensajes</h2>
                <p>
                  Configura tus preferencias de notificaciones y privacidad.
                </p>
                <p>
                  Estado: <span style={{ color: "#0f0" }}>Conectado</span>
                </p>
              </>
            )}
          </div>

          {/* Formulario de mensaje */}
          <form onSubmit={sendMsg} className="vr-form">
            <div className="form-section">
              <h3 className="form-section-title">Composición de Mensaje</h3>

              <div className="form-group">
                <label className="vr-label">Destinatario</label>
                <select
                  name="receiver_id"
                  onChange={handleChange}
                  value={form.receiver_id}
                  className="vr-select"
                  required
                >
                  <option value="">-- Selecciona un usuario --</option>
                  {businessUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.company_name || user.email}
                    </option>
                  ))}
                </select>
                <div className="form-hint">
                  {businessUsers.length} contactos disponibles
                </div>
              </div>

              <div className="form-group">
                <label className="vr-label">Mensaje</label>
                <textarea
                  name="content"
                  placeholder="Escriba su mensaje aquí..."
                  onChange={handleChange}
                  value={form.content}
                  rows="6"
                  className="vr-textarea message-textarea"
                  required
                />
                <div className="character-count">
                  {form.content.length} caracteres
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="vr-button send-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <span className="loading-spinner"></span>
                    Transmitiendo...
                  </>
                ) : (
                  <>
                    <span className="icon-send"></span>
                    Enviar Mensaje
                  </>
                )}
              </button>

              <button
                type="button"
                className="vr-button reset-btn"
                onClick={handleReset}
                disabled={status === "sending"}
              >
                <span className="icon-clear"></span>
                Limpiar
              </button>
            </div>

            {/* Estado del mensaje */}
            <div className="message-status">
              {status === "success" && (
                <div className="status-message success">
                  <span className="status-icon">✓</span>
                  ¡Mensaje transmitido exitosamente!
                </div>
              )}

              {status === "error" && (
                <div className="status-message error">
                  <span className="status-icon">✗</span>
                  Error en la transmisión del mensaje
                </div>
              )}

              {status === "sending" && (
                <div className="status-message sending">
                  <span className="status-icon">⟳</span>
                  Transmitiendo mensaje...
                </div>
              )}
            </div>

            {/* Información de estado del formulario */}
            <div className="form-status">
              <div className="status-item">
                <span className="status-label">Destinatario:</span>
                <span
                  className={`status-value ${
                    form.receiver_id ? "active" : "inactive"
                  }`}
                >
                  {form.receiver_id ? "✓ Seleccionado" : "✗ Pendiente"}
                </span>
              </div>

              <div className="status-item">
                <span className="status-label">Contenido:</span>
                <span
                  className={`status-value ${
                    form.content ? "active" : "inactive"
                  }`}
                >
                  {form.content
                    ? `${form.content.length} caracteres`
                    : "✗ Pendiente"}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
