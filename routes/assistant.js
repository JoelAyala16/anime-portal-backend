// routes/assistant.js
import { Router } from "express";
const router = Router();

router.post("/", (req, res) => {
  const { message } = req.body || {};
  if (!message) {
    console.log("Chatbot recibió mensaje vacío");
    return res.status(400).json({ reply: "Escribe algo para que te ayude." });
  }

  const m = String(message).toLowerCase();
  let reply = "🤖 No entendí, prueba con otra pregunta.";

  if (m.includes("hola")) reply = "¡Hola! ¿En qué puedo ayudarte?";
  if (m.includes("anime")) reply = "Puedes ver la lista de animes en el portal.";
  if (m.includes("personaje")) reply = "También puedes gestionar personajes desde la sección correspondiente.";

  res.json({ reply });
});

export default router;

