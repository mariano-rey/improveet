import express from "express";
import { createServer } from "http";
import { json } from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import initSocket from "./socket";
import CONFIG from "./utils/config";

const app = express();
const httpServer = createServer(app);
app.use(helmet());
app.use(morgan("tiny"));
app.use(json());

initSocket({ httpServer });
httpServer.listen(CONFIG.BACKEND_PORT, () =>
  console.log(`Server listening on port ${CONFIG.BACKEND_PORT}`)
);
