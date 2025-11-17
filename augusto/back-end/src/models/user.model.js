import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const UserModel = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING(),
      validate: {
        isEmail: true,
      },
      unique: true,
      required: true,
    },
    password: {
      type: DataTypes.STRING(),
      required: true,
    },
    role: {
      type: DataTypes.ENUM(["graduated", "company"]),
    },
  },
  {
    timestamps: false,
  }
);
