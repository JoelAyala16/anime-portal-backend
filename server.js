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

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/animes", animeRoutes);
app.use("/api/personajes", personajesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB Atlas");
    await seedDatabase();
    app.listen(PORT, () => console.log(`🚀 Backend en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error("❌ Error de conexión a Mongo:", err);
    process.exit(1);
  });
