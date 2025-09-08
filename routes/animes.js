import express from "express";
import multer from "multer";
import Anime from "../models/Anime.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

function parseArrayField(val) {
  if (val === undefined) return [];
  if (Array.isArray(val)) return val;
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [String(val)];
  } catch {
    return [String(val)];
  }
}

router.get("/", async (_req, res) => {
  const items = await Anime.find().sort({ createdAt: -1 });
  res.json(items);
});

router.post("/", upload.array("images", 8), async (req, res) => {
  const { title, genre, rating, year, studio, seasons, description } = req.body;
  if (!title || title.trim().length < 2) return res.status(400).json({ error: "Título inválido" });
  const images = (req.files || []).map(f => `/uploads/${f.filename}`);
  const characters = parseArrayField(req.body.characters).map(s => String(s).trim()).filter(Boolean);
  const doc = new Anime({
    title: title.trim(),
    genre: (genre || "").trim(),
    rating: Number(rating || 0),
    year: year ? Number(year) : null,
    studio: (studio || "").trim(),
    seasons: seasons ? Number(seasons) : 1,
    description: (description || "").trim(),
    characters,
    images
  });
  await doc.save();
  res.status(201).json(doc);
});

router.put("/:id", upload.array("images", 8), async (req, res) => {
  const { id } = req.params;
  const { title, genre, rating, year, studio, seasons, description, replaceImages } = req.body;
  const update = {};
  if (title !== undefined) update.title = String(title).trim();
  if (genre !== undefined) update.genre = String(genre).trim();
  if (rating !== undefined) update.rating = Number(rating);
  if (year !== undefined) update.year = year ? Number(year) : null;
  if (studio !== undefined) update.studio = String(studio).trim();
  if (seasons !== undefined) update.seasons = Number(seasons);
  if (description !== undefined) update.description = String(description).trim();
  if (req.body.characters !== undefined) {
    update.characters = parseArrayField(req.body.characters).map(s => String(s).trim()).filter(Boolean);
  }
  if (req.files && req.files.length) {
    if (String(replaceImages) === "true") {
      update.images = req.files.map(f => `/uploads/${f.filename}`);
    } else {
      const current = (await Anime.findById(id))?.images || [];
      update.images = [...current, ...req.files.map(f => `/uploads/${f.filename}`)];
    }
  }
  const updated = await Anime.findByIdAndUpdate(id, update, { new: true });
  if (!updated) return res.status(404).json({ error: "No encontrado" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Anime.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "No encontrado" });
  res.json({ ok: true });
});

export default router;
