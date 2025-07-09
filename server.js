import express from "express"; 
import cors from "cors";
import dotenv from 'dotenv';
import router from "./src/routes/main.routes.js"; 
import { logEvents, logger } from "./src/middlewares/logger.middlewares.js";

dotenv.config();

const app = express(); 
const PORT = process.env.BACKEND_PORT || 5002; 

const cors_config = { 
    origin: process.env.FRONTEND_URL,
    credentials: true,
};

app.use(cors(cors_config));
app.use(logger);
app.use(express.json());

app.use("/", router);
app.use("/type/:type", type);
app.use("/language/:language", language);

app.listen(PORT,  () => {
   console.log(`✅ Servidor rodando na porta ${PORT}`);
   logEvents(`✅ Servidor rodando na porta ${PORT}`, "server.log")
});