import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { MessagesModel } from "./messages.model.js";
import { ConversationsModel } from "./conversations.model.js";

export const ParticipantsModel = sequelize.define(
  "Participants",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

MessagesModel.belongsToMany(ConversationsModel, {
  through: ParticipantsModel,
  as: "messages",
  foreignKey: "message_id",
});

ConversationsModel.belongsToMany(MessagesModel, {
  through: ParticipantsModel,
  as: "conversations",
  foreignKey: "conversation_id",
});

ParticipantsModel.belongsTo(MessagesModel, {
  foreignKey: "message_id",
  as: "messages",
});
ParticipantsModel.belongsTo(ConversationsModel, {
  foreignKey: "conversation_id",
  as: "conversations",
});
