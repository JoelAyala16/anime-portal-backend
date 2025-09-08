const express = require("express");
const Personaje = require("../models/Personaje");
const router = express.Router();

// Obtener todos los personajes
router.get("/", async (req, res) => {
  try {
    const personajes = await Personaje.find();
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un personaje
router.post("/", async (req, res) => {
  try {
    const personaje = new Personaje(req.body);
    await personaje.save();
    res.status(201).json(personaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar un personaje
router.put("/:id", async (req, res) => {
  try {
    const personaje = await Personaje.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(personaje);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un personaje
router.delete("/:id", async (req, res) => {
  try {
    await Personaje.findByIdAndDelete(req.params.id);
    res.json({ message: "Personaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
