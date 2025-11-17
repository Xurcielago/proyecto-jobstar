import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const BusinessOwnerModel = sequelize.define(
  "Business_Owner",
  {
    company_name: {
      type: DataTypes.STRING(50),
      required: true,
      unique: true,
    },
    about_us: {
      type: DataTypes.STRING(400),
      required: false,
    },
    location: {
      type: DataTypes.STRING(200),
      required: true,
    },
    website_url: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    business_size: {
      type: DataTypes.FLOAT(),
      required: false,
    },
    headquarters: {
      type: DataTypes.STRING(200),
      required: true,
    },
    extended_desc: {
      type: DataTypes.TEXT(),
      required: false,
    },
    contact: {
      type: DataTypes.STRING(200),
      validate: {
        isEmail: true,
      },
      required: true,
    },
  },
  { timestamps: false }
);

UserModel.hasOne(BusinessOwnerModel, {
  foreignKey: "user_id",
  as: "companyProfile",
});
BusinessOwnerModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "companyProfile",
});
