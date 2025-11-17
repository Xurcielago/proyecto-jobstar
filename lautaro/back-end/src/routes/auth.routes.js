import { Router } from "express";
import {
  register,
  login,
  logout,
} from "../controller/authGeneral.controller.js";
import { createdUserValidation } from "../middleware/validations/user.validations.js";
import { validator } from "../middleware/validator.js";

export const authGeneralRoutes = Router();

authGeneralRoutes.post(
  "/auth/register",
  createdUserValidation,
  validator,
  register
);
authGeneralRoutes.post("/auth/login", login);
authGeneralRoutes.post("/auth/logout", logout);
