import { Router } from "express";
import {
  createBusiness,
  deleteBusiness,
  getAllBusiness,
  getByPkBusiness,
  getCurrentProfile,
  updateBusiness,
} from "../controller/businessOwner.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { validator } from "../middleware/validator.js";
import {
  createBussinessOwnerValidation,
  deletedBusinessValidation,
  updateBusinessValidation,
} from "../middleware/validations/businessOwner.validations.js";

export const companyRoutes = Router();

companyRoutes.post(
  "/auth/company",
  authMiddleware,
  createBussinessOwnerValidation,
  validator,
  createBusiness
);
companyRoutes.get("/auth/mycompany", authMiddleware, getCurrentProfile);

companyRoutes.get("/auth/company", authMiddleware, getAllBusiness);

companyRoutes.get("/auth/company/:id", authMiddleware, getByPkBusiness);

companyRoutes.put(
  "/auth/company/:id",
  authMiddleware,
  updateBusinessValidation,
  validator,
  updateBusiness
);

companyRoutes.delete(
  "/auth/company/:id",
  authMiddleware,
  deletedBusinessValidation,
  validator,
  deleteBusiness
);
