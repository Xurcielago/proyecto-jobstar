import { Router } from "express";
import {
  createdWantedJob,
  deletedWantendJob,
  getAllWantedJob,
  getByPkWantedJob,
  updateWatendJob,
} from "../controller/wantedJob.controller.js";

export const WantedJobRoutes = Router();

WantedJobRoutes.post("/wantedjob", createdWantedJob);

WantedJobRoutes.get("/wantedjob", getAllWantedJob);

WantedJobRoutes.get("/wantedjob/:id", getByPkWantedJob);

WantedJobRoutes.put("/wantedjob/:id", updateWatendJob);

WantedJobRoutes.delete("/wantedjob/:id", deletedWantendJob);
