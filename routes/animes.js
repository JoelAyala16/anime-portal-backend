const express = require("express");
const Anime = require("../models/Anime");

const router = express.Router();

// Obtener todos los animes
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener animes" });
  }
});

// Crear un anime
router.post("/", async (req, res) => {
  try {
    const nuevoAnime = new Anime(req.body);
    await nuevoAnime.save();
    res.json(nuevoAnime);
  } catch (err) {
    res.status(400).json({ error: "Error al crear anime" });
  }
});

module.exports = router;


