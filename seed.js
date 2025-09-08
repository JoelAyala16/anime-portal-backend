import Anime from './models/Anime.js';

export const seedDatabase = async () => {
  const count = await Anime.countDocuments();
  if (count === 0) {
    await Anime.insertMany([
  {
    "title": "Naruto",
    "genre": "Shonen",
    "rating": 9,
    "year": 2002,
    "studio": "Pierrot",
    "seasons": 20,
    "description": "Naruto — Shonen. Serie de anime lanzada en 2002.",
    "characters": [
      "Naruto Uzumaki",
      "Sasuke Uchiha",
      "Sakura Haruno"
    ],
    "images": [
      "/uploads/naruto_1.jpg",
      "/uploads/naruto_2.jpg",
      "/uploads/naruto_3.jpg"
    ]
  },
  {
    "title": "One Piece",
    "genre": "Shonen/Aventura",
    "rating": 10,
    "year": 1999,
    "studio": "Toei Animation",
    "seasons": 20,
    "description": "One Piece — Shonen/Aventura. Serie de anime lanzada en 1999.",
    "characters": [
      "Monkey D. Luffy",
      "Roronoa Zoro",
      "Nami"
    ],
    "images": [
      "/uploads/one_piece_1.jpg",
      "/uploads/one_piece_2.jpg",
      "/uploads/one_piece_3.jpg"
    ]
  },
  {
    "title": "Pokémon",
    "genre": "Aventura/Fantasía",
    "rating": 8,
    "year": 1997,
    "studio": "OLM",
    "seasons": 25,
    "description": "Pokémon — Aventura/Fantasía. Serie de anime lanzada en 1997.",
    "characters": [
      "Ash Ketchum",
      "Pikachu",
      "Misty"
    ],
    "images": [
      "/uploads/pokémon_1.jpg",
      "/uploads/pokémon_2.jpg",
      "/uploads/pokémon_3.jpg"
    ]
  },
  {
    "title": "Dragon Ball",
    "genre": "Shonen/Acción",
    "rating": 10,
    "year": 1986,
    "studio": "Toei Animation",
    "seasons": 9,
    "description": "Dragon Ball — Shonen/Acción. Serie de anime lanzada en 1986.",
    "characters": [
      "Goku",
      "Vegeta",
      "Bulma"
    ],
    "images": [
      "/uploads/dragon_ball_1.jpg",
      "/uploads/dragon_ball_2.jpg",
      "/uploads/dragon_ball_3.jpg"
    ]
  },
  {
    "title": "Attack on Titan",
    "genre": "Acción/Dark Fantasy",
    "rating": 10,
    "year": 2013,
    "studio": "Wit Studio / MAPPA",
    "seasons": 4,
    "description": "Attack on Titan — Acción/Dark Fantasy. Serie de anime lanzada en 2013.",
    "characters": [
      "Eren Yeager",
      "Mikasa Ackerman",
      "Armin Arlert"
    ],
    "images": [
      "/uploads/attack_on_titan_1.jpg",
      "/uploads/attack_on_titan_2.jpg",
      "/uploads/attack_on_titan_3.jpg"
    ]
  },
  {
    "title": "Fullmetal Alchemist",
    "genre": "Aventura/Acción",
    "rating": 9,
    "year": 2003,
    "studio": "Bones",
    "seasons": 2,
    "description": "Fullmetal Alchemist — Aventura/Acción. Serie de anime lanzada en 2003.",
    "characters": [
      "Edward Elric",
      "Alphonse Elric",
      "Roy Mustang"
    ],
    "images": [
      "/uploads/fullmetal_alchemist_1.jpg",
      "/uploads/fullmetal_alchemist_2.jpg",
      "/uploads/fullmetal_alchemist_3.jpg"
    ]
  },
  {
    "title": "Death Note",
    "genre": "Thriller/Suspenso",
    "rating": 9,
    "year": 2006,
    "studio": "Madhouse",
    "seasons": 1,
    "description": "Death Note — Thriller/Suspenso. Serie de anime lanzada en 2006.",
    "characters": [
      "Light Yagami",
      "L",
      "Misa Amane"
    ],
    "images": [
      "/uploads/death_note_1.jpg",
      "/uploads/death_note_2.jpg",
      "/uploads/death_note_3.jpg"
    ]
  }
]);
    console.log('✅ Seed insertado (v3).');
  } else {
    console.log('ℹ️ Seed omitido, colección ya poblada.');
  }
};
