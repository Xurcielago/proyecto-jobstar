import { Router } from "express";
import {
  createdJobPost,
  deletedJobPost,
  getAllJobPost,
  getByPkJobPost,
  updateJobPost,
} from "../controller/jobPost.controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { authAdminMiddleware } from "../middleware/authAdmin.js";
import { ownerMiddleware } from "../middleware/authOwner.midleware.js";
import { validator } from "../middleware/validator.js";
import {
  createdJobPostValidation,
  deletedJobPostValidation,
  updateJobPostValidation,
} from "../middleware/validations/jobPost.validations.js";

export const jobPostRoutes = Router();

jobPostRoutes.post(
  "/auth/jobpost",
  authMiddleware,
  createdJobPostValidation,
  validator,
  createdJobPost
);

jobPostRoutes.get("/auth/jobpost", getAllJobPost);

jobPostRoutes.get("/auth/jobpost/:id", getByPkJobPost);

jobPostRoutes.put(
  "/auth/jobpost/:id",
  authMiddleware,
  updateJobPostValidation,
  validator,
  ownerMiddleware,
  updateJobPost
);

jobPostRoutes.delete(
  "/auth/jobpost/:id",
  authMiddleware,
  ownerMiddleware,
  deletedJobPostValidation,
  validator,
  deletedJobPost
);
