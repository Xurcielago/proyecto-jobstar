import { Router } from "express";
import {
  createdJobType,
  deletedJobType,
  getAllJobType,
  getByPkJobType,
  updateJobType,
} from "../controller/jobType.controller.js";
import {
  createdJobTypeValidation,
  deletedJobTypeValidation,
  updateJobTypeValidation,
} from "../middleware/validations/jobType.validation.js";
import { validator } from "../middleware/validator.js";

export const jobTypeRoutes = Router();

jobTypeRoutes.post(
  "/auth/jobtype",
  createdJobTypeValidation,
  validator,
  createdJobType
);

jobTypeRoutes.get("/auth/jobtype", getAllJobType);

jobTypeRoutes.get("/auth/jobtype/:id", getByPkJobType);

jobTypeRoutes.put(
  "/auth/jobtype/:id",
  updateJobTypeValidation,
  validator,
  updateJobType
);

jobTypeRoutes.delete(
  "/auth/jobtype/:id",
  deletedJobTypeValidation,
  validator,
  deletedJobType
);
