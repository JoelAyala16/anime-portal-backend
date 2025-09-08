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
    res.json(nuevoPersonaje);
  } catch (err) {
    console.error("❌ Error guardando personaje:", err);
    res.status(500).json({ error: "Error al guardar personaje" });
  }
});

// 📌 Obtener todos
router.get("/", async (req, res) => {
  try {
    const personajes = await Personaje.find();
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personajes" });
  }
});

// 📌 Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const personaje = await Personaje.findById(req.params.id);
    res.json(personaje);
  } catch (err) {
    res.status(404).json({ error: "Personaje no encontrado" });
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
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar personaje" });
  }
});

// 📌 Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Personaje.findByIdAndDelete(req.params.id);
    res.json({ message: "Personaje eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar personaje" });
  }
});

export default router;
