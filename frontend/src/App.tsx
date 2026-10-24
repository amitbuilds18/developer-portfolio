import React, { useState } from "react";
import { Terminal, Bot, Sparkles } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DeveloperTerminal } from "./components/DeveloperTerminal";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { ResumeModal } from "./components/ResumeModal";
import { portfolioData } from "./data/portfolioData";

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* Navigation bar */}
      <Navbar
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAi={() => setIsAiOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenAi={() => setIsAiOpen(true)} />
        <About />
        <Skills
          activeSkill={activeSkillFilter}
          onSelectSkill={setActiveSkillFilter}
        />
        <Projects
          activeSkillFilter={activeSkillFilter}
          onClearSkillFilter={() => setActiveSkillFilter(null)}
        />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Action Dock (CLI + Ask AI) */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5">
        {/* CLI Terminal Trigger Button */}
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 backdrop-blur-md shadow-lg shadow-black/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
          title="Open Developer Terminal (CLI)"
        >
          <Terminal className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="font-mono text-xs font-semibold">CLI</span>
        </button>

        {/* Ask AI Agent Floating Button */}
        <button
          onClick={() => setIsAiOpen((prev) => !prev)}
          className="relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-2xl shadow-indigo-600/40 border border-indigo-400/40 backdrop-blur-md transition-all transform hover:-translate-y-1 active:translate-y-0 group cursor-pointer"
          title="Chat with Amit's AI Assistant"
        >
          {/* Ambient Glow */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-60 blur-sm group-hover:opacity-100 transition-opacity" />

          {/* Online ping dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>

          <Bot className="relative w-4 h-4 text-cyan-200 group-hover:scale-110 transition-transform" />
          <span className="relative text-xs font-bold tracking-wide">Ask AI</span>
          <Sparkles className="relative w-3 h-3 text-cyan-200 animate-pulse" />
        </button>
      </div>

      {/* Developer Terminal Modal */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Interactive AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* In-Browser Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={portfolioData.personal.resumeUrl}
        downloadName="Amit_Kumar_Ray_Resume.pdf"
      />
    </div>
  );
};

export default App;
