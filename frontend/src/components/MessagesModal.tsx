import React, { useState, useEffect } from "react";
import { X, RefreshCw, Database, Mail, Calendar, MessageSquare } from "lucide-react";

interface MessageItem {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/messages");
      if (!res.ok) throw new Error("Backend offline or DATABASE_URL not set");
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      } else {
        setMessages([]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to connect to backend server");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                Neon PostgreSQL Messages
                <span className="px-2 py-0.5 rounded-full text-xs font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {messages.length} Total
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Live records stored in table: <code className="text-indigo-300">messages</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchMessages}
              disabled={loading}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors disabled:opacity-50"
              title="Refresh messages"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-indigo-400" : ""}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-3">
              <RefreshCw className="w-8 h-8 animate-spin text-indigo-500" />
              <p className="text-sm font-medium">Querying Neon PostgreSQL database...</p>
            </div>
          )}

          {!loading && error && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
              <p className="font-semibold mb-1">Backend Notice:</p>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Backend server is not running or DATABASE_URL is not yet connected. Run{" "}
                <code className="px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono">
                  npm run dev
                </code>{" "}
                in the <code className="text-amber-300 font-mono">backend</code> folder to view live
                database queries.
              </p>
            </div>
          )}

          {!loading && !error && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-slate-500">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h4 className="text-base font-semibold text-white">No messages recorded yet</h4>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Messages submitted through the Contact Form will automatically appear here directly
                from your Neon database.
              </p>
            </div>
          )}

          {!loading &&
            messages.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-750 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                  <div>
                    <h5 className="font-bold text-white text-sm">{item.name}</h5>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <a
                        href={`mailto:${item.email}`}
                        className="hover:text-indigo-300 transition-colors"
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.subject}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {item.message}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
