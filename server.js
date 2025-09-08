// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

// Rutas
import animesRouter from "./routes/animes.js";
import personajesRouter from "./routes/personajes.js";
import assistantRouter from "./routes/assistant.js"; // Chatbot

dotenv.config();

const app = express();

// Para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear carpeta /uploads si no existe
const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
  console.log("📂 Carpeta 'uploads' creada automáticamente");
}

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // ✅ usa FRONTEND_URL en producción
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

// Servir imágenes de /uploads
app.use("/uploads", express.static(uploadsPath));

// Rutas API
app.use("/api/animes", animesRouter);
app.use("/api/personajes", personajesRouter);
app.use("/api/assistant", assistantRouter);

// Ruta raíz (comprobación)
app.get("/", (req, res) => {
  res.send("✅ Backend Anime Portal corriendo correctamente");
});

// Conexión MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error de conexión:", err));

