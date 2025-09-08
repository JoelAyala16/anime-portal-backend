const express = require("express");
const Anime = require("../models/Anime");
const router = express.Router();

// Obtener todos los animes
router.get("/", async (req, res) => {
  try {
    const animes = await Anime.find();
    res.json(animes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un anime
router.post("/", async (req, res) => {
  try {
    const anime = new Anime(req.body);
    await anime.save();
    res.status(201).json(anime);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un anime
router.put("/:id", async (req, res) => {
  try {
    const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(anime);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un anime
router.delete("/:id", async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: "Anime eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



