import { starOn } from "./back-end/src/config/database.js";
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { routes } from "./back-end/src/routes/index.js";

//TEST//
import { BusinessOwnerModel } from "./back-end/src/models/businessOwner.model.js";
import { JobPostModel } from "./back-end/src/models/jobPost.model.js";
import { Job_Tag_Model } from "./back-end/src/models/job_tag.model.js";
import { JobSeekerProfileModel } from "./back-end/src/models/jobSeekerProfile.models.js";
import { JobTypeModel } from "./back-end/src/models/jobType.model.js";
import { ModalityModel } from "./back-end/src/models/modality.model.js";
import { SpecializationModel } from "./back-end/src/models/specialization.model.js";
import { TagModel } from "./back-end/src/models/tag.model.js";
import { UserModel } from "./back-end/src/models/user.model.js";
import { WantedJobModel } from "./back-end/src/models/wantedJob.model.js";
import { ConversationsModel } from "./back-end/src/models/conversations.model.js";
import { ParticipantsModel } from "./back-end/src/models/participants.model.js";
import { MessagesModel } from "./back-end/src/models/messages.model.js";

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", routes);

app.listen(PORT, async () => {
  try {
    await starOn();
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
  } catch (error) {
    console.log("Error al conectar con la base de datos " + error);
  }
});
