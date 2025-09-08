import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// 📌 Definir el esquema de Anime
const AnimeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  genero: { type: String },
  rating: { type: Number },
  personajes: [{ type: String }],
  imagenes: [{ type: String }],
});

const Anime = mongoose.model("Anime", AnimeSchema);

// 📌 Datos iniciales
const animes = [
  {
    titulo: "Naruto",
    descripcion: "Un joven ninja que busca el reconocimiento de su aldea.",
    genero: "Acción",
    rating: 9,
    personajes: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno"],
    imagenes: [],
  },
  {
    titulo: "One Piece",
    descripcion: "Un grupo de piratas busca el legendario tesoro One Piece.",
    genero: "Aventura",
    rating: 10,
    personajes: ["Monkey D. Luffy", "Zoro", "Nami"],
    imagenes: [],
  },
  {
    titulo: "Dragon Ball Z",
    descripcion: "Goku y sus amigos defienden la Tierra de poderosos enemigos.",
    genero: "Acción",
    rating: 8,
    personajes: ["Goku", "Vegeta", "Gohan"],
    imagenes: [],
  },
];

// 📌 Función de seed
const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    await Anime.deleteMany(); // limpia la colección
    await Anime.insertMany(animes); // inserta los datos iniciales

    console.log("✅ Seed completado con éxito");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error en el seed:", error);
    process.exit(1);
  }
};

runSeed();
