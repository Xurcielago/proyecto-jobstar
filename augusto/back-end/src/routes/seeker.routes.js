import { Router } from "express";
import { getCurrentProfile } from "../controller/authSeeker.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const seekerRoutes = Router()

seekerRoutes.get("/auth/seeker", authMiddleware, getCurrentProfile)