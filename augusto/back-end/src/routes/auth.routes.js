import { Router } from "express";
import {
  logout,
  loginCompany,
  loginGraduated,
  registerCompany,
  registerGraduated,
} from "../controller/authGeneral.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const authGeneralRoutes = Router();

authGeneralRoutes.post("/auth/registerCompany", registerCompany);
authGeneralRoutes.post("/auth/registerGraduated", registerGraduated);
authGeneralRoutes.post("/auth/loginCompany", loginCompany);
authGeneralRoutes.post("/auth/loginGraduated", loginGraduated);
authGeneralRoutes.post("/auth/logout", authMiddleware, logout);
