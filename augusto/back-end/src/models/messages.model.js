import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const MessagesModel = sequelize.define(
  "Messages",
  {
    content: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE(),
      defaultValue: DataTypes.NOW(),
    },
  },
  { timestamps: false }
);
