import { ConversationsModel } from "../models/conversations.model.js";
import { MessagesModel } from "../models/messages.model.js";
import { ParticipantsModel } from "../models/participants.model.js";

export const sendMessage = async (req, res) => {
  const { content, receiver_id } = req.body;
  try {
    const setReceiver = await ConversationsModel.create({
      receiver_id: receiver_id,
      user_id: req.user.id,
    });
    const newMessage = await MessagesModel.create({
      content: content,
    });
    res.status(200).json({
      message: "Mensaje enviado",
      newMessage,
    });
    await ParticipantsModel.create({
      message_id: newMessage.id,
      conversation_id: setReceiver.id,
    });
  } catch (error) {
    return res.status(500).json("Error al enviar mensaje " + error);
  }
};

export const seeMessages = async (req, res) => {
  try {
    const listMessages = await MessagesModel.findAll();
    res.status(200).json({
      listMessages,
    });
  } catch (error) {
    return res.status(500).json("Error al ver mensajes " + error);
  }
};
