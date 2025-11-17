import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobTypeModel } from "./jobType.model.js";

export const WantedJobModel = sequelize.define(
  "Wanted_Job",
  {
    occupation: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    job_location: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
  },
  { timestamps: false }
);

//RELACIÓN 1:N - JobType:WantedJob//

JobTypeModel.hasMany(WantedJobModel, {
  foreignKey: "job_type_id",
  as: "jobType",
});

WantedJobModel.belongsTo(JobTypeModel, {
  foreignKey: "job_type_id",
  as: "jobType",
});
