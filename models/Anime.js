import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, default: "" },
  rating: { type: Number, default: 0, min: 0, max: 10 },
  year: { type: Number, default: null },
  studio: { type: String, default: "" },
  seasons: { type: Number, default: 1 },
  description: { type: String, default: "" },
  characters: { type: [String], default: [] },
  images: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Anime", animeSchema);
