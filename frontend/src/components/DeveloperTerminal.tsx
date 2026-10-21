import React, { useState, useRef, useEffect } from "react";
import { Terminal, X, CornerDownLeft, Maximize2, Minimize2, Trash2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface OutputItem {
  id: string;
  command?: string;
  output: React.ReactNode;
}

interface DeveloperTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume?: () => void;
}

export const DeveloperTerminal: React.FC<DeveloperTerminalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<OutputItem[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome banner
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: "welcome-1",
          output: (
            <div className="space-y-1 font-mono text-xs leading-relaxed text-slate-300">
              <p className="text-emerald-400 font-bold">
                ┌────────────────────────────────────────────────────────┐
              </p>
              <p className="text-emerald-400 font-bold">
                │ Welcome to Amit Kumar Ray's Interactive Terminal v2.4  │
              </p>
              <p className="text-emerald-400 font-bold">
                └────────────────────────────────────────────────────────┘
              </p>
              <p className="text-slate-400 pt-1">
                Type <span className="text-indigo-400 font-semibold">'help'</span> to see available
                commands or click the command badges below.
              </p>
            </div>
          ),
        },
      ]);
    }
  }, []);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, cmdStr]);
    setHistoryIdx(-1);

    let resultNode: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        resultNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-indigo-400 font-semibold mb-1">Available Commands:</p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">about</span> -
              Professional summary & background
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">skills</span> -
              Technical skills breakdown (Frontend, Backend, DB, AI)
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">projects</span> -
              Featured applications (Navapay, AiInterview, etc.)
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">resume</span> -
              View and download Amit's PDF resume
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">contact</span> -
              Direct email, phone, LinkedIn & GitHub links
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">stats</span> -
              System impact metrics (query boosts, CI/CD speed)
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">clear</span> - Clear the
              terminal screen
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">sudo</span> - Easter egg
              command
            </p>
            <p>
              <span className="text-emerald-400 w-24 inline-block font-bold">exit</span> - Close this
              terminal session
            </p>
          </div>
        );
        break;

      case "about":
      case "bio":
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <p className="text-white font-bold">{portfolioData.personal.name} — Full Stack Developer</p>
            <p className="text-slate-400">{portfolioData.personal.about}</p>
            <p className="text-indigo-400">
              Education: Sagar Group of Institutions (B.Tech CSE, CGPA: 7.0/10)
            </p>
          </div>
        );
        break;

      case "skills":
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            {portfolioData.skillCategories.map((cat) => (
              <div key={cat.category}>
                <span className="text-indigo-400 font-bold">{cat.category}: </span>
                <span className="text-slate-300">
                  {cat.skills.map((s) => s.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        resultNode = (
          <div className="space-y-3 text-xs font-mono text-slate-300">
            {portfolioData.projects.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-indigo-500 pl-3 space-y-0.5">
                <p className="text-white font-bold">
                  {idx + 1}. {p.title}
                </p>
                <p className="text-slate-400">{p.tagline}</p>
                <p className="text-indigo-300">Stack: {p.tags.join(" | ")}</p>
                <p className="text-emerald-400">
                  Live: <a href={p.liveUrl} target="_blank" rel="noreferrer" className="underline">{p.liveUrl}</a>
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case "resume":
        if (onOpenResume) onOpenResume();
        resultNode = (
          <div className="text-xs font-mono text-emerald-400 space-y-1">
            <p>📄 Opening In-Browser Resume Modal...</p>
            <p className="text-slate-400">
              You can also download directly from:{" "}
              <a href="/resume.pdf" download="Amit_Kumar_Ray_Resume.pdf" className="underline text-indigo-400">
                /resume.pdf
              </a>
            </p>
          </div>
        );
        break;

      case "contact":
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-white font-bold">Contact Coordinates:</p>
            <p>• Email: <a href={`mailto:${portfolioData.personal.email}`} className="text-indigo-400 underline">{portfolioData.personal.email}</a></p>
            <p>• Phone: <span className="text-emerald-400">{portfolioData.personal.phone}</span></p>
            <p>• LinkedIn: <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 underline">{portfolioData.personal.linkedin}</a></p>
            <p>• GitHub: <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-indigo-400 underline">{portfolioData.personal.github}</a></p>
          </div>
        );
        break;

      case "stats":
        resultNode = (
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            {portfolioData.stats.map((s) => (
              <div key={s.label} className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-emerald-400 font-bold">{s.value}</span> - {s.label}
              </div>
            ))}
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo":
        resultNode = (
          <p className="text-xs font-mono text-amber-400">
            ⚠️ Permission denied: You are currently a guest recruiter. Hire Amit Kumar Ray to unlock root access! 🚀
          </p>
        );
        break;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        resultNode = (
          <p className="text-xs font-mono text-rose-400">
            command not found: '{cmdStr}'. Type <span className="text-indigo-400 underline cursor-pointer" onClick={() => executeCommand("help")}>'help'</span> for a list of valid commands.
          </p>
        );
    }

    setHistory((prev) => [
      ...prev,
      { id: Date.now().toString(), command: cmdStr, output: resultNode },
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx + 1 < cmdHistory.length ? historyIdx + 1 : historyIdx;
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else {
        setHistoryIdx(-1);
        setInputVal("");
      }
    }
  };

  if (!isOpen) return null;

  const quickBadges = ["help", "skills", "projects", "resume", "contact", "stats", "clear"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Terminal Window */}
      <div
        className={`relative w-full ${
          isMaximized ? "max-w-6xl h-[94vh]" : "max-w-3xl h-[75vh]"
        } bg-[#0b0f19] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden font-mono transition-all duration-300`}
      >
        {/* Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#070a10] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-rose-500 hover:opacity-80 transition-opacity"
              title="Close terminal"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-3 h-3 rounded-full bg-amber-500 hover:opacity-80 transition-opacity"
              title="Toggle size"
            />
            <button
              onClick={() => setHistory([])}
              className="w-3 h-3 rounded-full bg-emerald-500 hover:opacity-80 transition-opacity"
              title="Clear screen"
            />
            <span className="text-xs text-slate-400 font-mono ml-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>amit@portfolio:~ (bash)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistory([])}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Clear screen"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Maximize"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 cursor-text text-slate-200"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1.5">
              {item.command && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-emerald-400 font-bold">amit@portfolio:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}

          {/* Active Prompt Input */}
          <div className="flex items-center gap-2 text-xs pt-1">
            <span className="text-emerald-400 font-bold shrink-0">amit@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs caret-emerald-400"
              placeholder="Type command here (e.g. 'help')..."
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="text-slate-500 hover:text-emerald-400 transition-colors"
              title="Press Enter to run"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div ref={terminalEndRef} />
        </div>

        {/* Quick Command Suggestion Bar */}
        <div className="px-4 py-2.5 bg-[#070a10] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0">Quick run:</span>
          {quickBadges.map((badge) => (
            <button
              key={badge}
              onClick={() => executeCommand(badge)}
              className="px-2 py-0.5 rounded bg-slate-800/80 hover:bg-indigo-600/80 text-slate-300 hover:text-white border border-slate-700 transition-colors shrink-0"
            >
              {badge}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
