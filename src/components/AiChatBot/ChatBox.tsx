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
import PlaneIcon from "../../../public/icons/custom/PlaneIcon";

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

  // scroll to bottom on message change

  useEffect(() => {
    const scrollContainer = document.querySelector(".custom-scroll");

    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="bg-[#F5F5F5] dark:bg-[#121212] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-95 h-[75vh] max-w-[95vw] overflow-hidden flex flex-col border border-[#E7ECFF] dark:border-[#222222] p-2 relative z-50">
      <div className="flex items-start justify-between gap-3 bg-[#071F4D] p-3 text-white rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D33E3E] border border-white">
            <BotIcon className="text-white" />
          </div>
          <div>
            <p className="text-xl uppercase font-bebas text-[#F8FAFE]/90 tracking-[0.5px] leading-[100%]">
              Brightside AI
            </p>
            <p className="text-sm text-[#5FC696] flex items-center text-nowrap leading-[100%]">
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
        <div className="flex h-full flex-col rounded-xl p-4 ">
          {sessionId ? (
            <>
              <div
                className="flex- space-y-6 overflow-y-auto custom-scroll  pr-2"
                style={{ maxHeight: "calc(100% )" }}
              >
                {isSessionLoading ? (
                  <div className="text-sm text-[#64748B]">
                    Starting your chat session…
                  </div>
                ) : messages?.length === 0 ? (
                  <div className="text-sm text-[#64748B]">
                    Type a question to begin the conversation.
                  </div>
                ) : (
                  <>
                    {messages?.map((message, index) => {
                      const isUser = message.role === "user";
                      return (
                        <div
                          key={`${message.role}-${index}`}
                          className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-full px-4 py-3 leading-[160%]  ${
                              isUser
                                ? "bg-[#B72B2B] text-white rounded-l-3xl rounded-t-3xl "
                                : "bg-[#F8FAFB] dark:bg-[#092544] text-[#0F172A] dark:text-white rounded-r-3xl rounded-t-3xl"
                            }`}
                            dangerouslySetInnerHTML={{ __html: message?.content ?? "" }}
                          />
                        </div>
                      );
                    })}
                    {isLoading && (
                      <div className="flex flex-col items-start">
                        <div className="max-w-full px-4 py-3 bg-[#F8FAFB] text-[#0F172A] rounded-r-3xl rounded-t-3xl">
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-[#64748B] rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1 h-1 bg-[#64748B] rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1 h-1 bg-[#64748B] rounded-full animate-bounce" />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-[#334155] dark:text-white font-bold">
                To start chatting, please enter your Name and Email.
              </p>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] dark:border-none bg-[#F8FAFB] dark:bg-[#092544] px-4 py-3 text-sm outline-none transition focus:border-[#0F172A] dark:placeholder:text-white"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white">
                  Email
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] dark:border-none bg-[#F8FAFB] dark:bg-[#092544]  px-4 py-3 text-sm outline-none transition focus:border-[#0F172A] dark:placeholder:text-white"
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

        <div className=" bg-[#F8FAFB] dark:bg-[#00060e] p-3 rounded-xl border border-[#E7ECFF] dark:border-[#222222]">
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
                className="flex items-center gap-2 rounded-[10px] border border-[#DCE7FF] dark:border-[#1d1d1d] bg-[#E6F5FD] dark:bg-[#092544] px-4 py-2 text-left text-xs text-[#33ADED] font-semibold transition hover:bg-[#E2E8F0] dark:hover:bg-[#092544]"
              >
                <Icon size={16} className="text-[#33ADED]" />
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
            className="flex-1 text-sm rounded-xl border border-[#E7ECFF] dark:border-[#383838] p-4 bg-[#F8FAFB] dark:bg-[#092544] text-[#0F172A] outline-none dark:text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-60  placeholder:text-white dark:placeholder:text-[#ffffff]"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || isSessionLoading || isLoading}
            className="inline-flex p-2.5 items-center justify-center rounded-xl hover:bg-[#0F172A] text-[#0F172A] hover:text-white transition disabled:cursor-not-allowed disabled:opacity-40 duration-300 cursor-pointer dark:bg-[#092544] dark:text-[#d1d1d1] dark:hover:bg-[#eeeeee] dark:hover:text-[#092544]"
            aria-label="Send message"
          >
            <PlaneIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
