import { Router } from "express";
import {
  createdWantedJob,
  deletedWantendJob,
  getAllWantedJob,
  getByPkWantedJob,
  updateWatendJob,
} from "../controller/wantedJob.controller.js";
import { validator } from "../middleware/validator.js";
import {
  createdWantedJobValidation,
  deletedWantendJobValidation,
  updateWatendJobValidation,
} from "../middleware/validations/wantedJob.validations.js";

export const WantedJobRoutes = Router();

WantedJobRoutes.post(
  "/auth/wantedjob",
  createdWantedJobValidation,
  validator,
  createdWantedJob
);

WantedJobRoutes.get("/auth/wantedjob", getAllWantedJob);

WantedJobRoutes.get("/auth/wantedjob/:id", getByPkWantedJob);

WantedJobRoutes.put(
  "/auth/wantedjob/:id",
  updateWatendJobValidation,
  validator,
  updateWatendJob
);

WantedJobRoutes.delete(
  "/auth/wantedjob/:id",
  deletedWantendJobValidation,
  validator,
  deletedWantendJob
);
