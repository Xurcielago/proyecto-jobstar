import { Router } from "express";
import {
  createdUser,
  deletedUser,
  getAllUser,
  getByPkUser,
  updateUser,
} from "../controller/user.controller.js";

export const UserRoutes = Router();

UserRoutes.post("/user", createdUser);

UserRoutes.get("/user", getAllUser);

UserRoutes.get("/user/:id", getByPkUser);

UserRoutes.put("/user/:id", updateUser);

UserRoutes.delete("/user/:id", deletedUser);
