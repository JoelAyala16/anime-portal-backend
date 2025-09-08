import express from "express";
import multer from "multer";
import Personaje from "../models/Personaje.js";

const router = express.Router();

// 📂 Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📌 Crear personaje
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, descripcion, anime } = req.body;
    const nuevoPersonaje = new Personaje({
      nombre,
      descripcion,
      anime,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await nuevoPersonaje.save();
    res.status(201).json(nuevoPersonaje);
  } catch (err) {
    console.error("❌ Error guardando personaje:", err);
    res.status(500).json({ error: "Error al guardar personaje" });
  }
});

// 📌 Obtener todos
router.get("/", async (req, res) => {
  try {
    const personajes = await Personaje.find().populate("anime"); 
    res.json(personajes);
  } catch (err) {
    console.error("❌ Error obteniendo personajes:", err);
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// 📌 Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const personaje = await Personaje.findById(req.params.id).populate("anime");
    if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json(personaje);
  } catch (err) {
    console.error("❌ Error obteniendo personaje:", err);
    res.status(500).json({ error: "Error al obtener personaje" });
  }
});

// 📌 Editar
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, descripcion, anime } = req.body;
    const updated = await Personaje.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        descripcion,
        anime,
        imagen: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error actualizando personaje:", err);
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
});

// 📌 Eliminar
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Personaje.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ message: "✅ Personaje eliminado" });
  } catch (err) {
    console.error("❌ Error eliminando personaje:", err);
    res.status(500).json({ error: "Error al eliminar personaje" });
  }
});

export default router;

