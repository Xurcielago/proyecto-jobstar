import { Router } from "express";

import {
  adminCreateJSProfile,
  deletedJobSeekerProfile,
  getAllJobSeekerProfile,
  getByPkJobSeekerProfile,
  updateJobSeekerProfile,
} from "../controller/jobSeeker.controller.js";
import {
  adminCreateJSProfileValidation,
  deletedJobSeekerProfileValidation,
  updateJobSeekerProfileValidation,
} from "../middleware/validations/jobSeeker.validations.js";
import { authMiddleware } from "../middleware/auth.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import { validator } from "../middleware/validator.js";

export const jobSeekerRoutes = Router();

jobSeekerRoutes.post(
  "/auth/jobseeker",
  authMiddleware,
  adminCreateJSProfileValidation,
  validator,
  adminCreateJSProfile
);

jobSeekerRoutes.get("/auth/jobseeker", getAllJobSeekerProfile);

jobSeekerRoutes.get("/auth/jobseeker/:id", getByPkJobSeekerProfile);

jobSeekerRoutes.put(
  "/auth/jobseeker/:id",
  authMiddleware,
  authAdminMiddleware,
  updateJobSeekerProfileValidation,
  validator,
  updateJobSeekerProfile
);

jobSeekerRoutes.delete(
  "/auth/jobseeker/:id",
  authMiddleware,
  authAdminMiddleware,
  deletedJobSeekerProfileValidation,
  validator,
  deletedJobSeekerProfile
);
