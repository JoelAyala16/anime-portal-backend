const express = require("express");
const Personaje = require("../models/Personaje");

const router = express.Router();

// Obtener todos
router.get("/", async (req, res) => {
  const personajes = await Personaje.find();
  res.json(personajes);
});

// Obtener por ID
router.get("/:id", async (req, res) => {
  const personaje = await Personaje.findById(req.params.id);
  if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" });
  res.json(personaje);
});

// Crear
router.post("/", async (req, res) => {
  const nuevo = new Personaje(req.body);
  await nuevo.save();
  res.json(nuevo);
});

// Actualizar
router.put("/:id", async (req, res) => {
  const actualizado = await Personaje.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// Eliminar
router.delete("/:id", async (req, res) => {
  await Personaje.findByIdAndDelete(req.params.id);
  res.json({ msg: "Personaje eliminado" });
});

module.exports = router;
