import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; // Importando o middleware CORS

// Importa as rotas
import userRoutes from "./routes/users.js";
import studentRoutes from "./routes/students.js";
import generalNoticeRoutes from "./routes/generalNotices.js";
import announcementRoutes from "./routes/announcements.js";

dotenv.config();

const app = express();
app.use(cors()); // Adicionando o middleware CORS
app.use(express.json());

// Rotas
app.use("/users", userRoutes);
app.use("/students", studentRoutes);
app.use("/general-notices", generalNoticeRoutes);
app.use("/announcements", announcementRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Banco de dados conectado"))
    .catch((error) => console.log("Erro ao conectar ao banco de dados:", error));

export default app;