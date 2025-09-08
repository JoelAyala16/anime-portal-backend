const mongoose = require("mongoose");
const Anime = require("./models/Anime");

const seedDatabase = async () => {
  const count = await Anime.countDocuments();
  if (count === 0) {
    await Anime.insertMany([
      {
        titulo: "Naruto",
        genero: "Shonen",
        rating: 9,
        descripcion: "Naruto — Shonen. Serie de anime lanzada en 2002.",
        personajes: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno"],
        imagenes: ["/uploads/naruto_1.jpg", "/uploads/naruto_2.jpg", "/uploads/naruto_3.jpg"],
      },
      {
        titulo: "One Piece",
        genero: "Shonen/Aventura",
        rating: 10,
        descripcion: "One Piece — Shonen/Aventura. Serie de anime lanzada en 1999.",
        personajes: ["Monkey D. Luffy", "Roronoa Zoro", "Nami"],
        imagenes: ["/uploads/one_piece_1.jpg", "/uploads/one_piece_2.jpg", "/uploads/one_piece_3.jpg"],
      },
      {
        titulo: "Pokémon",
        genero: "Aventura/Fantasía",
        rating: 8,
        descripcion: "Pokémon — Aventura/Fantasía. Serie de anime lanzada en 1997.",
        personajes: ["Ash Ketchum", "Pikachu", "Misty"],
        imagenes: ["/uploads/pokemon_1.jpg", "/uploads/pokemon_2.jpg", "/uploads/pokemon_3.jpg"],
      },
      {
        titulo: "Dragon Ball",
        genero: "Shonen/Acción",
        rating: 10,
        descripcion: "Dragon Ball — Shonen/Acción. Serie de anime lanzada en 1986.",
        personajes: ["Goku", "Vegeta", "Bulma"],
        imagenes: ["/uploads/dragon_ball_1.jpg", "/uploads/dragon_ball_2.jpg", "/uploads/dragon_ball_3.jpg"],
      },
      {
        titulo: "Attack on Titan",
        genero: "Acción/Dark Fantasy",
        rating: 10,
        descripcion: "Attack on Titan — Acción/Dark Fantasy. Serie de anime lanzada en 2013.",
        personajes: ["Eren Yeager", "Mikasa Ackerman", "Armin Arlert"],
        imagenes: ["/uploads/attack_on_titan_1.jpg", "/uploads/attack_on_titan_2.jpg", "/uploads/attack_on_titan_3.jpg"],
      },
      {
        titulo: "Fullmetal Alchemist",
        genero: "Aventura/Acción",
        rating: 9,
        descripcion: "Fullmetal Alchemist — Aventura/Acción. Serie de anime lanzada en 2003.",
        personajes: ["Edward Elric", "Alphonse Elric", "Roy Mustang"],
        imagenes: ["/uploads/fullmetal_alchemist_1.jpg", "/uploads/fullmetal_alchemist_2.jpg", "/uploads/fullmetal_alchemist_3.jpg"],
      },
      {
        titulo: "Death Note",
        genero: "Thriller/Suspenso",
        rating: 9,
        descripcion: "Death Note — Thriller/Suspenso. Serie de anime lanzada en 2006.",
        personajes: ["Light Yagami", "L", "Misa Amane"],
        imagenes: ["/uploads/death_note_1.jpg", "/uploads/death_note_2.jpg", "/uploads/death_note_3.jpg"],
      }
    ]);
    console.log("✅ Seed insertado (v3).");
  } else {
    console.log("ℹ️ Seed omitido, colección ya poblada.");
  }
};

// Exportar para usarlo en server.js
module.exports = seedDatabase;
