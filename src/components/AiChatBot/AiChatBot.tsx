"use client";
import { useEffect, useId, useRef, useState } from "react";
import BotIcon from "../icons/BotIcon";
import ChatBox from "./ChatBox";

export default function AiChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  const dialogId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();
  }, [isOpen]);

  function closeChat() {
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-50">
      <div
        id={dialogId}
        ref={dialogRef}
        role="dialog"
        aria-label="Brightside AI chat"
        aria-hidden={!isOpen}
        inert={!isOpen}
        onKeyDown={(event) => {
          if (event.key === "Escape" && !(event.target as HTMLElement).closest('[aria-modal="true"]')) {
            event.stopPropagation();
            closeChat();
          }
        }}
        className={`origin-bottom-right transition-all duration-300 ease-out ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <ChatBox onClose={closeChat} isOpen={isOpen} />
      </div>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        tabIndex={isOpen ? -1 : 0}
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex items-center justify-center gap-2 bg-[#FEC300] hover:bg-[#fcd824] p-3 rounded-xl fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-40 text-base lg:text-xl cursor-pointer shadow-[0_5.6px_5.6px_0_rgba(0,0,0,0.25)] transition-all duration-300 ease-out ${
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
