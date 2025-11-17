import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ConversationsModel = sequelize.define(
  "Conversations",
  {
    receiver_id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

UserModel.hasMany(ConversationsModel, { foreignKey: "user_id", as: "sender" });
ConversationsModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "sender",
});
