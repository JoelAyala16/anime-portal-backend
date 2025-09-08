const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Servir imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/api/animes", require("./routes/animes"));
app.use("/api/personajes", require("./routes/personajes"));

module.exports = app;
