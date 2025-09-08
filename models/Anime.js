import mongoose from "mongoose";

const animeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  genero: String,
  imagen: String,
});

export default mongoose.model("Anime", animeSchema);



