import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const SpecializationModel = sequelize.define(
  "Specialization",
  {
    specialization: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
