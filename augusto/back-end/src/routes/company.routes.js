import { Router } from "express";
import {
  getCurrentProfile,
} from "../controller/authBusinessOwner.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const companyRoutes = Router();

companyRoutes.get("/auth/company", authMiddleware, getCurrentProfile);
