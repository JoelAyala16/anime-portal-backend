const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  genero: { type: String },
  rating: { type: Number },
  personajes: [{ type: String }],
  imagenes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Anime", AnimeSchema);


