import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Personaje from "../models/Personaje.js";

const router = express.Router();

// Config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/uploads/personajes");
  },
  filename: function (req, file, cb) {
    let filename = file.originalname;
    let filePath = path.join("backend/uploads/personajes", filename);
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    let i = 1;
    while (fs.existsSync(filePath)) {
      filename = `${base}-${i}${ext}`;
      filePath = path.join("backend/uploads/personajes", filename);
      i++;
    }
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const ok = allowed.test(file.mimetype) && allowed.test(path.extname(file.originalname).toLowerCase());
    ok ? cb(null, true) : cb(new Error("Solo se permiten imágenes (jpg, png, gif)"));
  }
});

// Crear personaje
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, descripcion, animeId } = req.body;
    const imagen = req.file ? `/uploads/personajes/${req.file.filename}` : null;
    const doc = await Personaje.create({ nombre, descripcion, animeId, imagen });
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Listar personajes (populate anime)
router.get("/", async (_req, res) => {
  const list = await Personaje.find().populate("animeId", "title");
  res.json(list);
});

// Obtener uno
router.get("/:id", async (req, res) => {
  const item = await Personaje.findById(req.params.id).populate("animeId", "title");
  if (!item) return res.status(404).json({ error: "No encontrado" });
  res.json(item);
});

// Actualizar
router.put("/:id", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, descripcion, animeId } = req.body;
    const update = { nombre, descripcion, animeId };
    if (req.file) update.imagen = `/uploads/personajes/${req.file.filename}`;
    const doc = await Personaje.findByIdAndUpdate(req.params.id, update, { new: true }).populate("animeId", "title");
    if (!doc) return res.status(404).json({ error: "No encontrado" });
    res.json(doc);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
