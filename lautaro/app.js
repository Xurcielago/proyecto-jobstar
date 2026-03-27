import { starOn } from "./back-end/src/config/database.js";
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";

import { routes } from "./back-end/src/routes/index.js";

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
