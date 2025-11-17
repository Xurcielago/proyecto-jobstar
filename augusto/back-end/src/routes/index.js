import { Router } from "express";
import { authGeneralRoutes } from "./auth.routes.js";
import { seekerRoutes } from "./seeker.routes.js";
import { jobTagRoutes } from "./jobTag.routes.js";
import { jobPostRoutes } from "./jobPost.routes.js";
import { jobTypeRoutes } from "./jobType.routes.js";
import { ModalityRoutes } from "./modality.routes.js";
import { tagRoutes } from "./tag.routes.js";
import { UserRoutes } from "./user.routes.js";
import { WantedJobRoutes } from "./wantedJob.routes.js";
import { SpecializationRoutes } from "./specialization.routes.js";
import { companyRoutes } from "./company.routes.js";
import { messagesRoutes } from "./messages.routes.js";

export const routes = Router();

routes.use(authGeneralRoutes);
routes.use(seekerRoutes);
routes.use(jobTagRoutes);
routes.use(jobPostRoutes);
routes.use(jobTypeRoutes);
routes.use(ModalityRoutes);
routes.use(tagRoutes);
routes.use(UserRoutes);
routes.use(WantedJobRoutes);
routes.use(SpecializationRoutes);
routes.use(companyRoutes);
routes.use(messagesRoutes);
