import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required");
  }
  return new GoogleGenAI({ apiKey });
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/concierge", async (req, res) => {
  try {
    const { message, history } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `You are Daely's expert Scent & Lifestyle Concierge. 
Daely is a premium lifestyle personal care brand — playful, optimistic, modern, and beautifully designed.
Your tone is warm, confident, optimistic, minimal, conversational, and design-first. You speak like a modern lifestyle brand (think Rhode, Glossier, Vacation Inc.), never using stuffy laboratory jargon or exaggerated marketing hype.
Help users pick fragrances, body care formulas, or curated daily rituals based on their mood, destination, or personal preference. Keep responses helpful, evocative, and concise.`;

    const chatHistory = (history || []).map((h: { role: string; content: string }) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.content }],
    }));

    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const result = await chat.sendMessage({ message });
    const responseText = result.text || "I'd love to help you find your signature Daely ritual. Tell me about your ideal morning vibe!";

    res.json({ reply: responseText });
  } catch (error: any) {
    console.error("Concierge Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate concierge response" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Daely server running on http://localhost:${PORT}`);
  });
}

startServer();
