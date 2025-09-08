// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Rutas
import animesRouter from "./routes/animes.js";
import personajesRouter from "./routes/personajes.js";
import assistantRouter from "./routes/assistant.js"; // 👈 importamos el chatbot

dotenv.config();

const app = express();

// Para __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: "*", // 🔧 en producción puedes poner la URL del frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Servir imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/animes", animesRouter);
app.use("/api/personajes", personajesRouter);
app.use("/api/assistant", assistantRouter); // 👈 montamos la ruta del chatbot

// Conexión MongoDB
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {})
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error de conexión:", err));
