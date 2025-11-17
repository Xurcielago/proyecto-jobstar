import { Router } from "express";
import {
  createdSpecialization,
  deletedSpecialization,
  getAllSpecialization,
  getByPkSpecialization,
  updateSpecialization,
} from "../controller/specialization.controller.js";
import { validator } from "../middleware/validator.js";
import {
  createdSpecializationValidation,
  deletedSpecializationValidation,
  updateSpecializationValidation,
} from "../middleware/validations/specialization.validation.js";

export const SpecializationRoutes = Router();

SpecializationRoutes.post(
  "/auth/specialization",
  createdSpecializationValidation,
  validator,
  createdSpecialization
);

SpecializationRoutes.get("/auth/specialization", getAllSpecialization);

SpecializationRoutes.get("/auth/specialization/:id", getByPkSpecialization);

SpecializationRoutes.put(
  "/auth/specialization/:id",
  updateSpecializationValidation,
  validator,
  updateSpecialization
);

SpecializationRoutes.delete(
  "/auth/specialization/:id",
  deletedSpecializationValidation,
  validator,
  deletedSpecialization
);
