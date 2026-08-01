import { useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";

export default function AIChatPopup() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hello! I'm your AI Health Assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/chat`,
        {
          message: question,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Unable to connect to the AI Assistant.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-2xl shadow-2xl border flex flex-col z-50">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-t-2xl">

        <div className="flex items-center gap-3">

          <FaRobot size={28} />

          <div>

            <h2 className="font-bold text-lg">
              AI Health Assistant
            </h2>

            <p className="text-sm opacity-90">
              Powered by Gemini AI
            </p>

          </div>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white shadow text-gray-800"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}

        {loading && (
          <div className="text-gray-500 text-sm">
            🤖 AI is typing...
          </div>
        )}

      </div>

      {/* Suggested Questions */}

      <div className="px-3 pt-2 flex flex-wrap gap-2">

        {[
          "Explain my prescription",
          "Healthy diet",
          "Fever causes",
        ].map((item) => (
          <button
            key={item}
            onClick={() => setInput(item)}
            className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200"
          >
            {item}
          </button>
        ))}

      </div>

      {/* Input */}

      <div className="border-t p-3 flex gap-2">

        <input
          type="text"
          placeholder="Ask anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
        >
          <FaPaperPlane />
        </button>

        <button
          onClick={() =>
            setMessages([
              {
                sender: "ai",
                text: "👋 Hello! I'm your AI Health Assistant.",
              },
            ])
          }
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
        >
          <FaTrash />
        </button>

      </div>

    </div>
  );
}