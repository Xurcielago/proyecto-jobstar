import { Router } from "express";
import {
  createdModality,
  deletedModality,
  getAllModality,
  getByPkModality,
  updateModality,
} from "../controller/modality.controller.js";
import {
  createdModalityValidation,
  deletedModalityValidations,
  updateModalityValidation,
} from "../middleware/validations/modality.validation.js";
import { validator } from "../middleware/validator.js";

export const ModalityRoutes = Router();

ModalityRoutes.post(
  "/auth/modality",
  createdModalityValidation,
  validator,
  createdModality
);

ModalityRoutes.get("/auth/modality", getAllModality);

ModalityRoutes.get("/auth/modality/:id", getByPkModality);

ModalityRoutes.put(
  "/auth/modality/:id",
  updateModalityValidation,
  validator,
  updateModality
);

ModalityRoutes.delete(
  "/auth/modality/:id",
  deletedModalityValidations,
  validator,
  deletedModality
);
