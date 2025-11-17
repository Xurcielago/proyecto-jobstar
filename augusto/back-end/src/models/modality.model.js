import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ModalityModel = sequelize.define(
  "Modality",
  {
    modality: {
      type: DataTypes.STRING(),
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);
