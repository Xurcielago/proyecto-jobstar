import { Router } from "express";
import {
  createdTag,
  deletedTag,
  getAllTag,
  getByPkTag,
  updateTag,
} from "../controller/tag.controller.js";

export const tagRoutes = Router();

tagRoutes.post("/tag", createdTag);

tagRoutes.get("/tag", getAllTag);

tagRoutes.get("/tag/:id", getByPkTag);

tagRoutes.put("/tag/:id", updateTag);

tagRoutes.delete("/tag/:id", deletedTag);
