import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const JobTypeModel = sequelize.define(
  "Job_Type",
  {
    type: {
      type: DataTypes.STRING(),
      unique: true,
    },
  },
  { timestamps: false }
);
