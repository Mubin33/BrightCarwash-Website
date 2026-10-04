"use client";

import {
  Campaign,
  chat,
  ChatMessage,
  createSession,
} from "@/services/ai-chatbot.api";
import DOMPurify from "isomorphic-dompurify";
import { CalendarDays, DollarSign, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import BotIcon from "../icons/BotIcon";
import CloseIcon from "../icons/CloseIcon";
import PlaneIcon from "../icons/PlaneIcon";
import CampaignImageGallery from "./CampaignImageGallery";

interface ChatBoxProps {
  onClose?: () => void;
  isOpen?: boolean;
}

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 1000;

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

export default function ChatBox({ onClose, isOpen = true }: ChatBoxProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  function isValidEmail(value: string) {
    const trimmed = value.trim();
    return (
      trimmed.length <= MAX_EMAIL_LENGTH &&
      /^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)
    );
  }

  async function handleStartSession() {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      setError("Please enter your name and email to start the chat.");
      return;
    }

    if (trimmedName.length > MAX_NAME_LENGTH) {
      setError("Name must be 100 characters or fewer.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
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
      setCampaigns(session.campaigns ?? []);
    } catch {
      setError("Unable to start chat session. Please try again.");
    } finally {
      setIsSessionLoading(false);
    }
  }

  async function handleSend() {
    const trimmedInput = input.trim();
    if (!sessionId || !trimmedInput || isLoading) {
      return;
    }

    if (trimmedInput.length > MAX_MESSAGE_LENGTH) {
      setError("Message must be 1000 characters or fewer.");
      return;
    }

    const userMessage: ChatMessage = { role: "user", content: trimmedInput };
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
    } catch {
      setError(
        "Something went wrong while sending your message. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuickAction(value: string) {
    setInput(value.slice(0, MAX_MESSAGE_LENGTH));
  }

  // scroll to bottom on message change

  useEffect(() => {
    const scrollContainer = messagesContainerRef.current;

    if (scrollContainer) {
      requestAnimationFrame(() => {
        const lastMessage =
          scrollContainer.lastElementChild as HTMLElement | null;

        if (lastMessage) {
          lastMessage.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        } else {
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      });
    }
  }, [messages, sessionId, isLoading]);

  useEffect(() => {
    if (isOpen && sessionId) {
      messageInputRef.current?.focus();
    }
  }, [sessionId, isOpen]);

  return (
    <div
      className={`bg-[#F5F5F5] dark:bg-[#121212] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] w-95 max-w-[95vw] ${sessionId ? "h-[75vh]" : "max-h-[75vh]"} overflow-y-auto flex flex-col border border-[#E7ECFF] dark:border-[#222222] p-2 relative z-50`}
    >
      <div className="flex items-start justify-between gap-3 bg-[#071F4D] p-3 text-white rounded-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D33E3E] border border-white">
            <BotIcon className="text-white" />
          </div>
          <div>
            <p className="text-xl uppercase font-bebas text-[#F8FAFE]/90 tracking-[0.5px] leading-[100%]">
              Brightside AI
            </p>
            <p className="text-[10px] lg:text-sm text-[#5FC696] flex items-center text-nowrap leading-[100%]">
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

      <p role="alert" className={error ? "my-2 p-2 text-sm text-[#B91C1C] text-center border border-red-500 rounded-md bg-red-100" : "sr-only"}>
        {error}
      </p>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex h-full min-h-0 flex-col rounded-xl py-4">
          {sessionId ? (
            <>
              <div
                ref={messagesContainerRef}
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
                aria-relevant="additions text"
                aria-atomic="false"
                className="flex-1 min-h-0 space-y-6 overflow-y-auto custom-scroll pr-2 pb-2"
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
                          <span className="sr-only">{isUser ? "You" : "Brightside AI"}:</span>
                          <div
                            className={`max-w-full px-4 py-3 leading-[160%]  ${
                              isUser
                                ? "bg-[#B72B2B] text-white rounded-l-3xl rounded-t-3xl "
                                : "bg-[#F8FAFB] dark:bg-[#092544] text-[#0F172A] dark:text-white rounded-r-3xl rounded-t-3xl"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(
                                message?.content ?? "",
                              ),
                            }}
                          />
                          {!isUser && index === 0 ? (
                            <CampaignImageGallery campaigns={campaigns} />
                          ) : null}
                        </div>
                      );
                    })}
                    {isLoading && (
                      <div className="flex flex-col items-start">
                        <span className="sr-only">Brightside AI is typing.</span>
                        <div className="max-w-full px-4 py-3 bg-[#F8FAFB] dark:bg-[#092544] text-[#0F172A] rounded-r-3xl rounded-t-3xl">
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
            <div className="space-y-3 border border-[#E7ECFF] dark:border-[#383838] p-3 rounded-xl">
              <p className="text-sm text-[#334155] dark:text-white font-bold">
                To start chatting, please enter your Name and Email.
              </p>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white">
                  Name
                  <input
                    value={name}
                    maxLength={MAX_NAME_LENGTH}
                    onChange={(event) => setName(event.target.value.slice(0, MAX_NAME_LENGTH))}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] dark:border-none bg-[#F8FAFB] dark:bg-[#092544] px-4 py-3 text-sm outline-none transition focus:border-[#0F172A] dark:placeholder:text-white"
                    placeholder="Your name"
                  />
                </label>
                <label className="block text-sm font-medium text-[#0F172A] dark:text-white">
                  Email
                  <input
                    value={email}
                    maxLength={MAX_EMAIL_LENGTH}
                    onChange={(event) => setEmail(event.target.value.slice(0, MAX_EMAIL_LENGTH))}
                    className="mt-2 w-full rounded-3xl border border-[#E2E8F0] dark:border-none bg-[#F8FAFB] dark:bg-[#092544]  px-4 py-3 text-sm outline-none transition focus:border-[#0F172A] dark:placeholder:text-white"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="rounded-xl border border-[#E7ECFF] px-3 py-2 text-[12px] leading-5 text-[#334155] dark:border-[#2d3a4d] dark:text-[#e2e8f0] -mt-1">
                <p className="font-medium text-[#0F172A] dark:text-white">
                  Privacy notice
                </p>
                <p className="mt-1">
                  By starting this chat, you agree to our
                  <a
                    href="/privacy-policy"
                    className="mx-1 font-medium text-[#0F172A] underline underline-offset-2 dark:text-[#7dd3fc]"
                  >
                    privacy policy
                  </a>
                  and understand your data may be processed by the AI service.
                  Do not enter card details.
                </p>
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
      {sessionId ? (
        <div className="shrink-0 bg-[#F8FAFB] dark:bg-[#00060e] p-3 rounded-xl border border-[#E7ECFF] dark:border-[#222222]">
          {/* Quick Actions */}
          <div className="mb-2 flex flex-wrap gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => handleQuickAction(action.value)}
                  className="w-fit flex items-center gap-2 rounded-[10px] border border-[#DCE7FF] dark:border-[#1d1d1d] bg-[#E6F5FD] dark:bg-[#092544] px-4 py-2 text-left text-[10px] lg:text-xs text-[#33ADED] font-semibold transition hover:bg-[#E2E8F0] dark:hover:bg-[#092544]"
                >
                  <Icon size={16} className="text-[#33ADED]" />
                  {action.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2  ">
            <input
              ref={messageInputRef}
              aria-label="Your message"
              value={input}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setInput(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSend();
                }
              }}
              readOnly={isSessionLoading || isLoading}
              aria-busy={isLoading}
              placeholder={
                isSessionLoading
                  ? "Loading chat session..."
                  : "Type your message here..."
              }
              className="flex-1 text-sm rounded-xl border border-[#E7ECFF] dark:border-[#383838] p-4 bg-[#F8FAFB] dark:bg-[#092544] text-[#0F172A] outline-none dark:text-[#ffffff] disabled:cursor-not-allowed disabled:opacity-60 dark:placeholder:text-[#ffffff]"
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
      ) : null}
    </div>
  );
}
