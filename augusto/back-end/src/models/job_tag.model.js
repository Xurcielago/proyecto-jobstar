import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobPostModel } from "./jobPost.model.js";
import { TagModel } from "./tag.model.js";

export const Job_Tag_Model = sequelize.define(
  "Job_Tag",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      allowNull: false,
    },
  },
  { timestamp: false }
);

JobPostModel.belongsToMany(TagModel, {
  through: Job_Tag_Model,
  as: "jobs",
  foreignKey: "job_id",
});

TagModel.belongsToMany(JobPostModel, {
  through: Job_Tag_Model,
  as: "tags",
  foreignKey: "tag_id",
});

Job_Tag_Model.belongsTo(TagModel, {
  foreignKey: "tag_id",
  as: "tags",
});

Job_Tag_Model.belongsTo(JobPostModel, {
  foreignKey: "job_id",
  as: "jobs",
});
