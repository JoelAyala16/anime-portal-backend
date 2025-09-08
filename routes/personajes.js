const express = require("express");
const Personaje = require("../models/Personaje");

const router = express.Router();

// Obtener todos los personajes
router.get("/", async (req, res) => {
  try {
    const personajes = await Personaje.find();
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// Crear un personaje
router.post("/", async (req, res) => {
  try {
    const nuevoPersonaje = new Personaje(req.body);
    await nuevoPersonaje.save();
    res.json(nuevoPersonaje);
  } catch (err) {
    res.status(400).json({ error: "Error al crear personaje" });
  }
});

module.exports = router;

