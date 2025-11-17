import { Router } from "express";
import {
  createdJobType,
  deletedJobType,
  getAllJobType,
  getByPkJobType,
  updateJobType,
} from "../controller/jobType.controller.js";

export const jobTypeRoutes = Router();

jobTypeRoutes.post("/jobtype", createdJobType);

jobTypeRoutes.get("/jobtype", getAllJobType);

jobTypeRoutes.get("/jobtype/:id", getByPkJobType);

jobTypeRoutes.put("/jobtype/:id", updateJobType);

jobTypeRoutes.delete("/jobtype/:id", deletedJobType);
