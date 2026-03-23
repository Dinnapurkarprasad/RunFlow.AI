import axios from "axios";
import Interaction from "../models/Interaction.js";

export const askAi = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.1-8b-instruct:free.",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    const answer = aiResponse.data.choices[0].message.content;
    res.json({ response: answer });
  } catch (error) {
    console.error(
      "Error calling OpenRouter:",
      error?.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to communicate with AI model" });
  }
};

// Save interaction to MongoDB
export const saveInteraction = async (req, res) => {
  try {
    const { prompt, response } = req.body;

    if (!prompt || !response) {
      return res.status(400).json({
        error: "Prompt and response are required",
      });
    }

    // ✅ Directly create and save in one step
    const newInteraction = await Interaction.create({
      prompt,
      response,
    });

    res.status(201).json({
      message: "Interaction saved successfully",
      data: newInteraction,
    });
  } catch (error) {
    console.error("Error saving to DB:", error);
    res.status(500).json({
      error: "Failed to save interaction",
    });
  }
};
