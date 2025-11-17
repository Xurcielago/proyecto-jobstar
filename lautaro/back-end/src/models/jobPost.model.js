import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { ModalityModel } from "./modality.model.js";
import { JobTypeModel } from "./jobType.model.js";
import { BusinessOwnerModel } from "./businessOwner.model.js";

export const JobPostModel = sequelize.define(
  "Job_Post",
  {
    job_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

//RELACIÓN 1:N - BusinessOwner:JobPost//

BusinessOwnerModel.hasMany(JobPostModel, {
  foreignKey: "company_id",
  as: "company",
});

JobPostModel.belongsTo(BusinessOwnerModel, {
  foreignKey: "company_id",
  as: "company",
});

//RELACIÓN 1:N - Modality:JobPost//

ModalityModel.hasMany(JobPostModel, {
  foreignKey: "modality_id",
  as: "modalityType",
});

JobPostModel.belongsTo(ModalityModel, {
  foreignKey: "modality_id",
  as: "modalityType",
});

//RELACIÓN 1:N - JobType:JobPost//

JobTypeModel.hasMany(JobPostModel, {
  foreignKey: "job_type_id",
  as: "job_type",
});

JobPostModel.belongsTo(JobTypeModel, {
  foreignKey: "job_type_id",
  as: "job_type",
});
