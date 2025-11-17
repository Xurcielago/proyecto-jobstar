import { Router } from "express";
import {
  createdSpecialization,
  deletedSpecialization,
  getAllSpecialization,
  getByPkSpecialization,
  updateSpecialization,
} from "../controller/specialization.controller.js";

export const SpecializationRoutes = Router();

SpecializationRoutes.post("/specialization", createdSpecialization);

SpecializationRoutes.get("/specialization", getAllSpecialization);

SpecializationRoutes.get("/specialization/:id", getByPkSpecialization);

SpecializationRoutes.put("/specialization/:id", updateSpecialization);

SpecializationRoutes.delete("/specialization/:id", deletedSpecialization);
