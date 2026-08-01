const { generateResponse } = require("../services/geminiService");

// ======================================
// AI HEALTH ASSISTANT CHAT
// ======================================

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const prompt = `
You are an AI Health Assistant for AI Hospital Management System.

Rules:
- Give clear, simple, and helpful answers.
- Never diagnose diseases with certainty.
- Never prescribe medications.
- Always recommend consulting a qualified doctor for serious symptoms.
- Keep responses concise and easy to understand.

Patient Question:
${message}
`;

    const reply = await generateResponse(prompt);

    res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error("AI Chat Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
};