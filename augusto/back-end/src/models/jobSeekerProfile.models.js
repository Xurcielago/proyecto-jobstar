import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";
import { SpecializationModel } from "./specialization.model.js";
import { WantedJobModel } from "./wantedJob.model.js";

export const JobSeekerProfileModel = sequelize.define(
  "Job_Seeker_Profile",
  {
    first_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(35),
      allowNull: false,
    },
    about_me: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    repository_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact: {
      type: DataTypes.STRING(100),
      validate: {
        isEmail: true,
      },
    },
    ambitions: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  { timestamps: false }
);

//RELACIÓN 1:1 - User:JobSeeker//

UserModel.hasOne(JobSeekerProfileModel, {
  foreignKey: "user_id",
  as: "seekerProfile",
});
JobSeekerProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "seekerProfile",
});

//RELACIÓN 1:N - Specialization:JobSeeker//

SpecializationModel.hasMany(JobSeekerProfileModel, {
  foreignKey: "specialization_id",
  as: "specializationProfile",
});
JobSeekerProfileModel.belongsTo(SpecializationModel, {
  foreignKey: "specialization_id",
  as: "specializationProfile",
});

//RELACIÓN 1:N - WantedJob:JobSeeker//

WantedJobModel.hasMany(JobSeekerProfileModel, {
  foreignKey: "wanted_job_id",
  as: "wanted_job",
});

JobSeekerProfileModel.belongsTo(WantedJobModel, {
  foreignKey: "wanted_job_id",
  as: "wanted_job",
});
