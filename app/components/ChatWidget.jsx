"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ChatMessage from "./ChatMessage";
import ItineraryDisplay from "./ItineraryDisplay";

function generateSessionId() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "chat_";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function parseItineraryFromMessage(text) {
  const jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
  if (!jsonMatch) return null;

  try {
    const parsed = JSON.parse(jsonMatch[1]);
    if (parsed.itinerary) return parsed.itinerary;
    return null;
  } catch {
    return null;
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I'm your Travel Unbounded assistant. I'd love to help you plan your dream trip! Tell me a bit about what kind of travel experience you're looking for — beach getaway, mountain adventure, wildlife safari, or cultural exploration?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const [savedItinerary, setSavedItinerary] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  function extractItineraryData(fullText) {
    const jsonMatch = fullText.match(/```json\s*([\s\S]*?)```/);
    if (!jsonMatch) return null;
    try {
      const parsed = JSON.parse(jsonMatch[1]);
      return parsed.itinerary || parsed;
    } catch {
      return null;
    }
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || isStreaming) return;

    const userMessage = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    const assistantMessage = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMessage]);

    abortRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: abortRef.current.signal
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullText += parsed.content;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: fullText
                };
                return updated;
              });
            }
          } catch {
            // skip
          }
        }
      }

      const itineraryData = extractItineraryData(fullText);
      if (itineraryData) {
        try {
          const res = await fetch("/api/itinerary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              title: itineraryData.title || "Custom Itinerary",
              preferences: itineraryData.preferences || {},
              itinerary: itineraryData.days || []
            })
          });
          const result = await res.json();
          if (result.success) {
            setSavedItinerary({
              title: itineraryData.title,
              itinerary: itineraryData.days,
              preferences: itineraryData.preferences
            });
            setShareUrl(
              `${window.location.origin}/itinerary/${result.data.shareId}`
            );
          }
        } catch (err) {
          console.error("Failed to save itinerary:", err);
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content:
              "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleSuggestion(text) {
    setInput(text);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  const suggestions = [
    "I want a beach vacation",
    "Plan a wildlife safari",
    "Adventure trip in mountains",
    "Cultural tour of India"
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "rotate-0 bg-slate-700 text-white hover:bg-slate-600"
            : "bg-sky-600 text-white shadow-sky-600/30 hover:bg-sky-500 hover:shadow-sky-500/40 hover:scale-105"
        }`}
        aria-label={isOpen ? "Close chat" : "Open travel assistant"}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[55] flex w-[calc(100vw-3rem)] max-w-md flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-2xl ring-1 ring-slate-700/50 sm:w-96">
          <div className="flex items-center gap-3 border-b border-slate-700/50 bg-slate-800/50 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Travel Assistant</p>
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "400px" }}>
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}

            {isStreaming && messages[messages.length - 1]?.content === "" && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-slate-700/80 px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {savedItinerary && (
              <div className="rounded-xl bg-slate-800/80 p-4 ring-1 ring-sky-500/20">
                <p className="mb-2 text-xs font-medium text-sky-400">
                  Itinerary Saved
                </p>
                <ItineraryDisplay
                  itinerary={savedItinerary}
                  shareUrl={shareUrl}
                />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !isStreaming && (
            <div className="flex flex-wrap gap-1.5 border-t border-slate-700/50 px-4 pt-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-700 transition-colors hover:bg-sky-600/20 hover:text-sky-400 hover:ring-sky-500/30"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="border-t border-slate-700/50 p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tell me about your dream trip..."
                disabled={isStreaming}
                className="flex-1 rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-sky-500 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isStreaming}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white transition-colors hover:bg-sky-500 disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
