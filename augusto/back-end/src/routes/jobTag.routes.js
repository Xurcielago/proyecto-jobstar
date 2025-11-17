import { Router } from "express";
import {
  createdJobTag,
  deletedJobTag,
  getAllJobTag,
  getByPkJobTag,
  updateJobTag,
} from "../controller/job_tag.controller.js";

export const jobTagRoutes = Router();

jobTagRoutes.post("/jobtag", createdJobTag);

jobTagRoutes.get("/jobtag", getAllJobTag);

jobTagRoutes.get("/jobtag/:id", getByPkJobTag);

jobTagRoutes.put("/jobtag/:id", updateJobTag);

jobTagRoutes.delete("/jobtag/:id", deletedJobTag);
