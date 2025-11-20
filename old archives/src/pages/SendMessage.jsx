import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";

export const SendMessage = () => {
  const [businessUsers, setBusinessUsers] = useState([]);

  const [status, setStatus] = useState(null);

  const { form, handleChange, handleReset } = useForm({
    content: "",
    receiver_id: "",
  });

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/company", {
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

  const sendMsg = async (e) => {
    e.preventDefault();
    setStatus("sending");

    if (!form.receiver_id || !form.content) {
      alert("Por favor seleccione un destinatario y escribe un mensaje");
      setStatus(null);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/messages", {
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
      if (handleReset) handleReset();
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setStatus("error");
    }
  };

  return (
    <div className="message-container">
      <h3>Enviar Mensaje</h3>
      <form onSubmit={sendMsg}>
        <div style={{ marginBottom: "10px" }}>
          <label>Para: </label>
          <select
            name="receiver_id"
            onChange={handleChange}
            value={form.receiver_id}
            required
          >
            <option value="">-- Selecciona un usuario --</option>
            {businessUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.company_name || user.email}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <textarea
            name="content"
            placeholder="Escriba su mensaje aquí..."
            onChange={handleChange}
            value={form.content}
            rows="4"
            style={{ width: "100%" }}
            required
          />
        </div>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
        </button>
        {status === "success" && (
          <p style={{ color: "green" }}>¡Mensaje enviado!</p>
        )}
        {status === "error" && <p style={{ color: "red" }}>Error al enviar.</p>}
      </form>
    </div>
  );
};
