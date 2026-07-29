"use client";
import { useState } from "react";
import BotIcon from "../../../public/icons/custom/BotIcon";
import ChatBox from "./ChatBox";

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-50">
      <div
        className={`origin-bottom-right transition-all duration-300 ease-out ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <ChatBox onClose={() => setIsOpen(false)} />
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex items-center justify-center gap-2 bg-[#FEC300] hover:bg-[#fcd824] p-3 rounded-xl fixed bottom-6 right-6 z-40 text-base lg:text-xl cursor-pointer shadow-[0_5.6px_5.6px_0_rgba(0,0,0,0.25)] transition-all duration-300 ease-out ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div>
          <BotIcon />
        </div>
        Chat with us
      </button>
    </div>
  );
}
