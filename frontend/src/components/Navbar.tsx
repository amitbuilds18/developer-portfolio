import React, { useState, useEffect } from "react";
import { Menu, X, Share2, Check, Terminal, Bot } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface NavbarProps {
  onOpenTerminal?: () => void;
  onOpenAi?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTerminal, onOpenAi }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-md">
            <img
              src={portfolioData.personal.avatar || "/profile.jpg"}
              alt={portfolioData.personal.name}
              className="w-full h-full object-cover rounded-full bg-slate-900 border border-slate-950 group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-300 transition-colors">
            {portfolioData.personal.name.split(" ")[0]}
            <span className="text-indigo-400">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}

          {/* Share / Copy Link Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all active:scale-95 shadow-sm"
            title="Copy portfolio link to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Ask AI Agent Button */}
          {onOpenAi && (
            <button
              onClick={onOpenAi}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-950/70 hover:bg-indigo-900/80 text-cyan-300 hover:text-cyan-200 border border-indigo-500/40 hover:border-cyan-400/60 transition-all shadow-sm shadow-indigo-950/30 cursor-pointer"
              title="Chat with Amit's AI Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI</span>
            </button>
          )}

          {/* CLI Terminal Button */}
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 transition-all shadow-sm"
              title="Open interactive terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI</span>
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full mt-3 px-3 py-2 rounded-lg text-sm font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all border border-slate-750"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-indigo-400" />
                <span>Share Portfolio Link</span>
              </>
            )}
          </button>

          {onOpenAi && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAi();
              }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2 rounded-lg text-sm font-semibold bg-indigo-900/50 text-cyan-300 hover:bg-indigo-800/60 transition-all border border-indigo-500/40"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Assistant</span>
            </button>
          )}

          {onOpenTerminal && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenTerminal();
              }}
              className="flex items-center justify-center gap-2 w-full mt-2 px-3 py-2 rounded-lg text-sm font-mono font-bold bg-slate-900 text-emerald-400 hover:bg-slate-800 transition-all border border-slate-800"
            >
              <Terminal className="w-4 h-4" />
              <span>Open CLI Terminal</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
