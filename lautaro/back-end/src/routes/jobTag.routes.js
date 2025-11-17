import { Router } from "express";
import {
  createdJobTag,
  deletedJobTag,
  getAllJobTag,
  getByPkJobTag,
  updateJobTag,
} from "../controller/job_tag.controller.js";

export const jobTagRoutes = Router();

jobTagRoutes.post("/auth/jobtag", createdJobTag);

jobTagRoutes.get("/auth/jobtag", getAllJobTag);

jobTagRoutes.get("/auth/jobtag/:id", getByPkJobTag);

jobTagRoutes.put("/auth/jobtag/:id", updateJobTag);

jobTagRoutes.delete("/auth/jobtag/:id", deletedJobTag);
