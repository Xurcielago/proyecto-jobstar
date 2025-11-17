import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { BusinessOwnerModel } from "./businessOwner.model.js";

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
      type: DataTypes.STRING(255),
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
UserModel.hasOne(BusinessOwnerModel, {
  foreignKey: "user_id",
  as: "companyProfile",
});
BusinessOwnerModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "User",
});
