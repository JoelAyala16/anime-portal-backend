import mongoose from "mongoose";

const personajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  anime: String,
  imagen: String,
});

export default mongoose.model("Personaje", personajeSchema);
