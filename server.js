const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const seedDatabase = require("./seed"); // importar seed.js

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir imágenes desde /uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/animes", require("./routes/animes"));
app.use("/api/personajes", require("./routes/personajes"));

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Insertar datos de prueba si no existen
    await seedDatabase();

    // Iniciar servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  });
