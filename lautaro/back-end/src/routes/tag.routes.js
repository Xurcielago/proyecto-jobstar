import { Router } from "express";
import {
  createdTag,
  deletedTag,
  getAllTag,
  getByPkTag,
  updateTag,
} from "../controller/tag.controller.js";
import { validator } from "../middleware/validator.js";
import {
  createdTagValidation,
  deletedTagValidation,
  updateTagValidation,
} from "../middleware/validations/tag.validation.js";

export const tagRoutes = Router();

tagRoutes.post("/auth/tag", createdTagValidation, validator, createdTag);

tagRoutes.get("/auth/tag", getAllTag);

tagRoutes.get("/auth/tag/:id", getByPkTag);

tagRoutes.put("/auth/tag/:id", updateTagValidation, validator, updateTag);

tagRoutes.delete("/auth/tag/:id", deletedTagValidation, validator, deletedTag);
