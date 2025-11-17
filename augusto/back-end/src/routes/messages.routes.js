import { Router } from "express";
import { sendMessage, seeMessages } from "../controller/messages.controller.js";
import { authMiddleware } from "../middleware/auth.js";

export const messagesRoutes = Router();

messagesRoutes.post("/messages", authMiddleware, sendMessage);
messagesRoutes.get("/messages", seeMessages);
