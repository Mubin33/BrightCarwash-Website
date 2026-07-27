"use client";

import { useEffect, useState } from "react";
import {
  X,
  CalendarDays,
  MapPin,
  Sparkles,
  DollarSign,
  Bot,
} from "lucide-react";
import { chat, createSession, ChatMessage } from "@/services/ai-chatbot.api";
import BotIcon from "../../../public/icons/custom/BotIcon";
import CloseIcon from "../../../public/icons/custom/CloseIcon";

interface ChatBoxProps {
  onClose?: () => void;
}

const quickActions = [
  {
    icon: DollarSign,
    label: "View Pricing",
    value: "How much does an SUV wash cost?",
  },
  { icon: CalendarDays, label: "Book a Wash", value: "I want to book a wash." },
  {
    icon: MapPin,
    label: "Hours & Location",
    value: "What are your hours and location?",
  },
  {
    icon: Sparkles,
    label: "What's Included",
    value: "What does the wash include?",
  },
];

export default function ChatBox({ onClose }: ChatBoxProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleStartSession() {
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email to start the chat.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setIsSessionLoading(true);

    try {
      const session = await createSession({
        name: name.trim(),
        email: email.trim(),
      });
      setSessionId(session.session_id);
      setMessages(session.messages ?? []);
    } catch (err) {
      setError("Unable to start chat session. Please try again.");
    } finally {
      setIsSessionLoading(false);
    }
  }

  async function handleSend() {
    if (!sessionId || !input.trim()) {
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat(sessionId, userMessage.content);
      if (response.messages?.length) {
        setMessages(response.messages);
      } else if (response.answer) {
        setMessages((current) => [
          ...current,
          { role: "assistant", content: response.answer ?? "" },
        ]);
      }
    } catch (err) {
      setError(
        "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickAction(value: string) {
    setInput(value);
  }

  return (
    <div className="bg-[#F5F5F5] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-95 h-[75vh] max-w-[95vw] overflow-hidden flex flex-col border border-[#E7ECFF] mb-16 p-2">
      <div className="flex items-start justify-between gap-3 bg-[#071F4D] p-3 text-white rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#D33E3E]">
            <BotIcon />
          </div>
          <div>
            <p className="text-xl uppercase font-bebas text-[#F8FAFE]/90">
              Brightside AI
            </p>
            <p className="text-sm text-[#5FC696] flex items-center text-nowrap">
              <span className="text-2xl">•</span> Online - Typically replies
              instantly
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="flex-1 overflow-hidden ">
        <div className="flex h-full flex-col rounded-xl  p-4 ">
          {sessionId ? (
            <>
              <div
                className="flex- space-y-6 overflow-y-auto  pr-2"
                style={{ maxHeight: "" }}
              >
                {isSessionLoading ? (
                  <div className="text-sm text-[#64748B]">
                    Starting your chat session…
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-sm text-[#64748B]">
                    Type a question to begin the conversation.
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const isUser = message.role === "user";
                    return (
                      <div
                        key={`${message.role}-${index}`}
                        className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%]  px-4 py-3  leading-[160%] ${
                            isUser
                              ? "bg-[#B72B2B] text-white rounded-l-3xl rounded-t-3xl "
                              : "bg-[#F8FAFB] text-[#0F172A] shadow-sm rounded-r-3xl rounded-t-3xl"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#334155]">
                To start chatting, please enter your name and email.
              </p>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#0F172A]">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 text-sm outline-none transition focus:border-[#0F172A]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0F172A]">
                  Email
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] bg-[#F8FAFB] px-4 py-3 text-sm outline-none transition focus:border-[#0F172A]"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <button
                type="button"
                onClick={handleStartSession}
                disabled={isSessionLoading}
                className="inline-flex w-full items-center justify-center rounded-3xl bg-[#071f4d] px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isSessionLoading ? "Starting chat…" : "Start Chat"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className=" bg-white p-3 rounded-xl border border-[#E7ECFF]">
        {error ? <p className="mb-3 text-sm text-[#B91C1C]">{error}</p> : null}
        {/* Quick Actions */}
        <div className="mb-2 grid gap-2 sm:grid-cols-2">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                type="button"
                onClick={() => handleQuickAction(action.value)}
                className="flex items-center gap-2 rounded-[10px] border border-[#DCE7FF] bg-[#E6F5FD] px-4 py-2 text-left text-xs text-[#33ADED] font-semibold transition hover:bg-[#E2E8F0]"
              >
                <Icon size={16} className="text-[#071f4d]" />
                {action.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2  ">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleSend();
              }
            }}
            disabled={isSessionLoading || isLoading}
            placeholder={
              isSessionLoading
                ? "Loading chat session..."
                : "Type your message here..."
            }
            className="flex-1 text-sm rounded-xl border border-[#E7ECFF] px-3 py-2 bg-[#F8FAFB] text-[#0F172A] outline-none placeholder:text-[#94A3B8] disabled:cursor-not-allowed disabled:opacity-60"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isSessionLoading || isLoading}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0F172A] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send message"
          >
            <BotIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
