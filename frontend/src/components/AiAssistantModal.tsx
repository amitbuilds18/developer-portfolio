import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ArrowRight,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { AiMessage, QUICK_PROMPTS, getAiResponse } from "../data/aiKnowledgeBase";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [messages, setMessages] = useState<AiMessage[]>(() => {
    return [
      {
        id: "msg-init",
        sender: "bot",
        text: `Hi! 👋 I'm **Amit's AI Assistant**.\n\nI can answer anything about Amit Kumar Ray's **technical projects** (Navapay, RSK, AiInterview, etc.), **skills** (React 19, TypeScript, Node.js, PostgreSQL), **education**, and **immediate job availability**.\n\nFeel free to type a question or click any prompt below!`,
        timestamp: "Just now",
        actions: [
          { label: "🚀 Top Projects", actionType: "project" },
          { label: "⚡ Tech Stack", actionType: "skills" },
          { label: "📄 Preview Resume", actionType: "resume" },
        ],
      },
    ];
  });

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on message updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input on modal open & handle ESC key
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isTyping) return;

    const userMsg: AiMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Realistic typing delay (400ms - 800ms)
    setTimeout(() => {
      const responseData = getAiResponse(text);
      const botMsg: AiMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        actions: responseData.actions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: "bot",
        text: `Chat cleared! How can I help you today regarding Amit's experience or background?`,
        timestamp: "Just now",
        actions: [
          { label: "🚀 Top Projects", actionType: "project" },
          { label: "⚡ Tech Stack", actionType: "skills" },
          { label: "📄 Preview Resume", actionType: "resume" },
        ],
      },
    ]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleActionClick = (action: NonNullable<AiMessage["actions"]>[0]) => {
    if (action.actionType === "resume") {
      if (onOpenResume) {
        onOpenResume();
      } else {
        window.open(portfolioData.personal.resumeUrl, "_blank");
      }
    } else if (action.actionType === "contact") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        onClose();
        contactSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = `mailto:${portfolioData.personal.email}`;
      }
    } else if (action.actionType === "skills") {
      const skillsSection = document.getElementById("skills");
      if (skillsSection) {
        onClose();
        skillsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (action.actionType === "project") {
      if (action.payload?.startsWith("http")) {
        window.open(action.payload, "_blank");
      } else {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          onClose();
          projectsSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  // Helper to format text with markdown-like highlights
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split("\n");
    return lines.map((line, lIdx) => {
      if (line.trim() === "") {
        return <div key={lIdx} className="h-2" />;
      }

      // Check if bullet point
      const isBullet = line.trim().startsWith("• ") || line.trim().startsWith("- ");
      const lineContent = isBullet ? line.replace(/^[•-]\s+/, "") : line;

      // Parse bold **text** and inline `code`
      const parts = lineContent.split(/(\*\*.*?\*\*|`.*?`)/g);

      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="text-white font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={pIdx}
              className="px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-xs border border-slate-700"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return part;
      });

      return (
        <div key={lIdx} className={`text-sm leading-relaxed ${isBullet ? "flex items-start gap-2 ml-2" : ""}`}>
          {isBullet && <span className="text-indigo-400 font-bold select-none">•</span>}
          <span>{parsedLine}</span>
        </div>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMaximized
          ? "inset-4 sm:inset-10"
          : "bottom-4 right-4 sm:bottom-6 sm:right-6 w-[95vw] sm:w-[440px] max-h-[85vh] sm:max-h-[640px]"
      } flex flex-col rounded-2xl bg-slate-950/95 border border-indigo-500/40 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400">
              <img
                src={portfolioData.personal.avatar || "/profile.jpg"}
                alt={portfolioData.personal.name}
                className="w-full h-full object-cover rounded-full bg-slate-900 border border-slate-950"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-sm tracking-tight">Amit AI Agent</h3>
              <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-semibold text-indigo-300">
                Online
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Trained on Amit's skills & projects</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 text-slate-400">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
            title="Reset Chat History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="hidden sm:inline-flex p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
            title={isMaximized ? "Restore Size" : "Maximize Window"}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors"
            title="Close Assistant"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`flex items-start gap-2.5 max-w-[88%] sm:max-w-[82%] ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 border border-indigo-500/30 text-indigo-400"
                }`}
              >
                {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`group relative p-3.5 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md"
                    : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-md"
                }`}
              >
                {renderFormattedText(msg.text)}

                {/* Interactive Action Pills (if any) */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {msg.actions.map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={() => handleActionClick(act)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        {act.label}
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Copy Button */}
                {msg.sender === "bot" && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded bg-slate-800 text-slate-400 hover:text-white transition-opacity text-[10px]"
                    title="Copy message"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Timestamp */}
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-7 h-7 rounded-full bg-slate-800 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs">
        <span className="text-slate-500 font-semibold text-[10px] uppercase tracking-wider flex-shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Prompts:
        </span>
        {QUICK_PROMPTS.map((prompt, pIdx) => (
          <button
            key={pIdx}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500/40 transition-colors whitespace-nowrap text-[11px] cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask anything about Amit's skills, projects..."
          className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
        />

        <button
          type="submit"
          disabled={!inputVal.trim() || isTyping}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex-shrink-0 active:scale-95"
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
