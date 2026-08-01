import { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import AIChatPopup from "./AIChatPopup";

export default function AIFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
      >
        {open ? <FaTimes size={24} /> : <FaRobot size={28} />}
      </button>

      {/* Chat Window */}
      {open && <AIChatPopup close={() => setOpen(false)} />}
    </>
  );
}