const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Anime = require("../models/Anime");

// Configuración de multer para imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// 📌 Crear anime con imágenes
router.post("/", upload.array("imagenes", 10), async (req, res) => {
  try {
    const { titulo, descripcion, genero, rating } = req.body;

    let personajes = [];
    if (req.body.personajes) {
      personajes = Array.isArray(req.body.personajes)
        ? req.body.personajes
        : [req.body.personajes];
    }

    const imagenes = req.files.map((f) => `/uploads/${f.filename}`);

    const nuevoAnime = new Anime({
      titulo,
      descripcion,
      genero,
      rating,
      personajes,
      imagenes,
    });

    await nuevoAnime.save();
    res.json({ message: "✅ Anime creado", anime: nuevoAnime });
  } catch (err) {
    console.error("Error al crear anime:", err);
    res.status(500).json({ error: "Error al crear anime" });
  }
});

// 📌 Obtener todos
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener animes" });
  }
});

module.exports = router;
