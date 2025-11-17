import { ConversationsModel } from "../models/conversations.model.js";

export const setReceiver = async (req, res) => {
  const { receiver_id } = req.body;
  try {
    const newConversation = await ConversationsModel.create({
      receiver_id: receiver_id,
      user_id: req.user.id,
    });
    res.status(200).json({
      newConversation,
    });
  } catch (error) {
    return res.status(500).json("Error al crear conversación " + error);
  }
};
