require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Groq } = require("groq-sdk");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, // Store your API key in .env
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  try {
    // Define the prompt
    const prompt = `You are a helpful assistant for a news website. Help users find news articles, categories, or general information. User: ${message}`;

    // Generate content using Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for a news website. Help users find news articles, categories, or general information.",
        },
        { role: "user", content: message },
      ],
      model: "mixtral-8x7b-32768", // Use Groq's Mixtral model
    });

    const reply = completion.choices[0].message.content;
    res.status(200).json({ success: true, reply });
  } catch (error) {
    console.error("Groq error:", error.message);
    res.status(500).json({ success: false, error: "Failed to process your message." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
