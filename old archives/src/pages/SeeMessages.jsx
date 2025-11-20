import React, { useEffect, useState } from "react";

export const SeeMessages = () => {
  const [user, setUser] = useState([]);

  const [data, setData] = useState([]);

  const getAllMessages = async () => {
    try {
      const fetchMessages = await fetch("http://localhost:3000/api/messages", {
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

  const getUserData = async () => {
    try {
      const fetchUser = await fetch("http://localhost:3000/api/auth/");
    } catch (error) {}
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  return (
    <div>
      <h2>Mensajes Recientes</h2>
      {data.map((data) => (
        <h4 key={data.conversations.sender.id}>
          {" "}
          De: {data.conversations.sender.email}
        </h4>
      ))}
      {data.map((data) => (
        <p key={data.messages.id}>
          Contenido del mensaje: {data.messages.content}
        </p>
      ))}
    </div>
  );
};
