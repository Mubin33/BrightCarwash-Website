"use client";
import { useState } from "react";
import BotIcon from "../../../public/icons/custom/BotIcon";
import ChatBox from "./ChatBox";

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 bg-[#FEC300] hover:bg-[#fcd824] duration-300 p-3 rounded-xl fixed bottom-6 right-6 z-40 text-base lg:text-xl cursor-pointer shadow-[0_5.6px_5.6px_0_rgba(0,0,0,0.25)]"
      >
        <div>
          <BotIcon />
        </div>
        Chat with us
      </button>
      {isOpen && <ChatBox onClose={() => setIsOpen(false)} />}
    </div>
  );
}
