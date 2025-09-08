import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import animeRoutes from "./routes/animes.js";
import personajesRoutes from "./routes/personajes.js";
import { seedDatabase } from "./seed.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/animes", animeRoutes);
app.use("/api/personajes", personajesRoutes);

// Ruta raíz para Render (evita Timed Out)
app.get("/", (req, res) => {
  res.send("✅ Backend del Anime Portal corriendo en Render");
});

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB Atlas");
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 Backend escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error de conexión a Mongo:", err);
    process.exit(1);
  });
