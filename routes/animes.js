import express from "express";
import multer from "multer";
import Anime from "../models/Anime.js";

const router = express.Router();

// 📂 Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// 📌 Crear anime
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { titulo, descripcion, genero } = req.body;
    const nuevoAnime = new Anime({
      titulo,
      descripcion,
      genero,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await nuevoAnime.save();
    res.json(nuevoAnime);
  } catch (err) {
    console.error("❌ Error guardando anime:", err);
    res.status(500).json({ error: "Error al guardar anime" });
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

// 📌 Obtener uno por ID
router.get("/:id", async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id);
    res.json(anime);
  } catch (err) {
    res.status(404).json({ error: "Anime no encontrado" });
  }
});

// 📌 Editar
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { titulo, descripcion, genero } = req.body;
    const updated = await Anime.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        genero,
        imagen: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar anime" });
  }
});

// 📌 Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Anime.findByIdAndDelete(req.params.id);
    res.json({ message: "Anime eliminado" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar anime" });
  }
});

export default router;
