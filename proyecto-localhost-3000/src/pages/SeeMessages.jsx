import React, { useEffect, useState } from "react";
import "./SeeMessages.css"; // Archivo CSS para los estilos

export const SeeMessages = () => {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [activeOption, setActiveOption] = useState("Bandeja de Entrada");
  const [selectedConversation, setSelectedConversation] = useState(null);

  const getAllMessages = async () => {
    try {
      const fetchMessages = await fetch("http://localhost:5000/api/messages", {
        method: "GET",
        credentials: "include",
      });

      if (!fetchMessages.ok) {
        console.log("Error al hacer fetch");
      }

      const data = await fetchMessages.json();
      const msgData = data.listMessages;

      console.log(msgData);
      setData(msgData);
    } catch (error) {
      console.log("Error interno del servidor " + error);
    }
  };

  useEffect(() => {
    getAllMessages();
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
    setSelectedConversation(null);
  };

  // Agrupar mensajes por conversación
  const groupMessagesByConversation = () => {
    const conversations = {};

    data.forEach((item) => {
      const convId = item.conversations.id;
      if (!conversations[convId]) {
        conversations[convId] = {
          conversation: item.conversations,
          messages: [],
        };
      }
      conversations[convId].messages.push(item.messages);
    });

    return Object.values(conversations);
  };

  const conversations = groupMessagesByConversation();

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
        <h1 className="main-title">Centro de Comunicaciones</h1>

        {/* Panel del menú */}
        <div className="menu-panel">
          <div className="menu-options">
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
                activeOption === "Mensajes Enviados" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Mensajes Enviados")}
              type="button"
            >
              Mensajes Enviados
            </button>
            <button
              className={`menu-item ${
                activeOption === "Importantes" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Importantes")}
              type="button"
            >
              Importantes
            </button>
            <button
              className={`menu-item ${
                activeOption === "Archivados" ? "active" : ""
              }`}
              onClick={() => updateInfoPanel("Archivados")}
              type="button"
            >
              Archivados
            </button>
          </div>

          {/* Panel de información */}
          <div className="info-panel active">
            {activeOption === "Bandeja de Entrada" && (
              <>
                <h2>Bandeja de Entrada</h2>
                <p>Mensajes recibidos de otros usuarios de la plataforma.</p>
                <p>
                  Conversaciones activas:{" "}
                  <span style={{ color: "#0f0" }}>{conversations.length}</span>
                </p>
                <p>
                  Mensajes totales:{" "}
                  <span style={{ color: "#ff0" }}>{data.length}</span>
                </p>
              </>
            )}

            {activeOption === "Mensajes Enviados" && (
              <>
                <h2>Mensajes Enviados</h2>
                <p>Historial de mensajes que has enviado a otros usuarios.</p>
                <p>
                  Mensajes enviados:{" "}
                  <span style={{ color: "#0f0" }}>{data.length}</span>
                </p>
              </>
            )}

            {activeOption === "Importantes" && (
              <>
                <h2>Mensajes Importantes</h2>
                <p>
                  Mensajes marcados como importantes para seguimiento
                  prioritario.
                </p>
                <p>
                  Mensajes importantes: <span style={{ color: "#ff0" }}>0</span>
                </p>
              </>
            )}

            {activeOption === "Archivados" && (
              <>
                <h2>Mensajes Archivados</h2>
                <p>Mensajes archivados para referencia futura.</p>
                <p>
                  Mensajes archivados: <span style={{ color: "#0f0" }}>0</span>
                </p>
              </>
            )}
          </div>

          {/* Contenido principal de mensajes */}
          <div className="messages-container">
            {selectedConversation ? (
              // Vista de conversación individual
              <div className="conversation-view">
                <div className="conversation-header">
                  <button
                    className="vr-button back-btn"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <span className="icon-back">←</span>
                    Volver a la bandeja
                  </button>
                  <h3 className="conversation-title">
                    Conversación con:{" "}
                    {selectedConversation.conversation.sender.email}
                  </h3>
                </div>

                <div className="messages-list">
                  {selectedConversation.messages.map((message) => (
                    <div key={message.id} className="message-bubble">
                      <div className="message-header">
                        <span className="message-sender">
                          {selectedConversation.conversation.sender.email}
                        </span>
                        <span className="message-time">
                          {new Date(
                            message.created_at || Date.now()
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="message-content">{message.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Vista de lista de conversaciones
              <div className="conversations-list">
                <h3 className="section-title">Conversaciones Activas</h3>

                {conversations.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h4>No hay mensajes</h4>
                    <p>No has recibido ningún mensaje todavía.</p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <div
                      key={conv.conversation.id}
                      className="conversation-item"
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="conversation-avatar">
                        {conv.conversation.sender.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="conversation-content">
                        <div className="conversation-header">
                          <h4 className="conversation-sender">
                            {conv.conversation.sender.email}
                          </h4>
                          <span className="message-count">
                            {conv.messages.length} mensaje
                            {conv.messages.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="conversation-preview">
                          {conv.messages[
                            conv.messages.length - 1
                          ]?.content.substring(0, 100)}
                          {conv.messages[conv.messages.length - 1]?.content
                            .length > 100
                            ? "..."
                            : ""}
                        </div>
                        <div className="conversation-time">
                          Último mensaje: {new Date().toLocaleDateString()}
                        </div>
                      </div>
                      <div className="conversation-arrow">
                        <span className="icon-arrow">→</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Estadísticas rápidas */}
          <div className="stats-panel">
            <div className="stat-item">
              <span className="stat-value">{conversations.length}</span>
              <span className="stat-label">Conversaciones</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{data.length}</span>
              <span className="stat-label">Mensajes Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">0</span>
              <span className="stat-label">No Leídos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{conversations.length}</span>
              <span className="stat-label">Activos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
