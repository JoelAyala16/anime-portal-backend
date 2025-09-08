const express = require("express");
const Anime = require("../models/Anime");

const router = express.Router();

// Obtener todos
router.get("/", async (req, res) => {
  const animes = await Anime.find();
  res.json(animes);
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  const anime = await Anime.findById(req.params.id);
  if (!anime) return res.status(404).json({ error: "Anime no encontrado" });
  res.json(anime);
});

// Crear
router.post("/", async (req, res) => {
  const nuevo = new Anime(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// Actualizar
router.put("/:id", async (req, res) => {
  const actualizado = await Anime.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  await Anime.findByIdAndDelete(req.params.id);
  res.json({ msg: "Anime eliminado" });
});

module.exports = router;



