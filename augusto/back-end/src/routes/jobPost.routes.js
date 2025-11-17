import { Router } from "express";
import {
  createdJobPost,
  deletedJobPost,
  getMyJobPosts,
  getByPkJobPost,
  updateJobPost,
} from "../controller/jobPost.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const jobPostRoutes = Router();

jobPostRoutes.post("/jobpost", authMiddleware, createdJobPost); // USUARIO COMPANY TIENE QUE PODER CREAR JOBPOSTS//

jobPostRoutes.get("/jobpost", authMiddleware, getMyJobPosts); // USUARIO COMPANY TIENE QUE PODER VER SUS POSTS//

jobPostRoutes.get("/jobpost/:id", getByPkJobPost);

jobPostRoutes.put("/jobpost/:id", updateJobPost);

jobPostRoutes.delete("/jobpost/:id", deletedJobPost);
