import mongoose from "mongoose";

const PersonajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: "" },
  imagen: { type: String, default: null }, // ruta relativa: /uploads/personajes/archivo.png
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: "Anime", required: true },
}, { timestamps: true });

export default mongoose.model("Personaje", PersonajeSchema);
