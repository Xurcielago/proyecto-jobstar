import { Router } from "express";
import {
  createdModality,
  deletedModality,
  getAllModality,
  getByPkModality,
  updateModality,
} from "../controller/modality.controller.js";

export const ModalityRoutes = Router();

ModalityRoutes.post("/modality", createdModality);

ModalityRoutes.get("/modality", getAllModality);

ModalityRoutes.get("/modality/:id", getByPkModality);

ModalityRoutes.put("/modality/:id", updateModality);

ModalityRoutes.delete("/modality/:id", deletedModality);
