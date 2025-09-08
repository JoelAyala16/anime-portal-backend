const mongoose = require("mongoose");

const PersonajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: "" },
  imagen: { type: String, default: null }, // ruta relativa
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Personaje", PersonajeSchema);
