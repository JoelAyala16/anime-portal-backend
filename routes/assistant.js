import { Router } from "express";
import Anime from "../models/Anime.js";
import Personaje from "../models/Personaje.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    console.log("Chatbot recibió mensaje vacío");
    return res.status(400).json({ reply: "Escribe algo para que te ayude." });
  }

  const m = String(message).toLowerCase().trim();
  let reply = "🤖 No entendí, prueba con otra pregunta.";

  try {
    if (m.includes("hola") || m.includes("buenas")) {
      reply = "¡Hola! 👋 ¿Quieres información de *animes* o *personajes*?";
    } 
    else if (m.includes("anime")) {
      const animes = await Anime.find().limit(5); // trae hasta 5 animes
      if (animes.length > 0) {
        reply = "📺 Algunos animes que tengo en la base son:\n" +
          animes.map((a) => `- ${a.titulo}`).join("\n");
      } else {
        reply = "📭 Aún no hay animes registrados en la base de datos.";
      }
    } 
    else if (m.includes("personaje")) {
      const personajes = await Personaje.find().limit(5);
      if (personajes.length > 0) {
        reply = "🧑‍🎨 Algunos personajes que encontré son:\n" +
          personajes.map((p) => `- ${p.nombre}`).join("\n");
      } else {
        reply = "📭 Todavía no hay personajes en la base de datos.";
      }
    } 
    else if (m.includes("ayuda")) {
      reply = "🔍 Puedes preguntarme por:\n- *anime*: para ver títulos\n- *personajes*: para ver algunos\n- *hola*: para saludarme";
    }
  } catch (err) {
    console.error("❌ Error en chatbot:", err);
    reply = "⚠️ Ocurrió un error consultando la base de datos.";
  }

  res.json({ reply });
});

export default router;
