import { Router } from "express";
import {
  createdUser,
  deletedUser,
  getAllUser,
  getByPkUser,
  updateUser,
} from "../controller/user.controller.js";
import { validator } from "../middleware/validator.js";
import {
  createdUserValidation,
  deletedUserValidation,
  updateUserValidation,
} from "../middleware/validations/user.validations.js";
import { authMiddleware } from "../middleware/auth.js";

export const UserRoutes = Router();

UserRoutes.post("/auth/user", createdUserValidation, validator, createdUser);

UserRoutes.get("/auth/user", getAllUser);

UserRoutes.get("/auth/user/myuser", authMiddleware, getByPkUser);

UserRoutes.put("/auth/user/:id", updateUserValidation, validator, updateUser);

UserRoutes.delete(
  "/auth/user/:id",
  deletedUserValidation,
  validator,
  deletedUser
);
