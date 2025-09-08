const express = require("express");
const router = express.Router();

// Chatbot sencillo
router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Escribe algo para que te ayude." });
  }

  const text = String(message).toLowerCase();

  let reply = "No entendí tu mensaje.";
  if (text.includes("hola")) reply = "¡Hola! ¿Cómo estás?";
  if (text.includes("anime")) reply = "Me encantan los animes, ¿cuál es tu favorito?";
  if (text.includes("adiós")) reply = "¡Hasta pronto!";

  res.json({ reply });
});

module.exports = router;
