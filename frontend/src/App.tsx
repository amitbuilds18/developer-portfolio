import React, { useState } from "react";
import { Terminal } from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DeveloperTerminal } from "./components/DeveloperTerminal";

export const App: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-pattern text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* Navigation bar */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
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

      {/* Floating Terminal Trigger Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-800 text-slate-200 border border-indigo-500/50 hover:border-indigo-400 backdrop-blur-md shadow-2xl shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1 active:translate-y-0 group cursor-pointer"
        title="Open Developer Terminal (CLI)"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Terminal className="w-4 h-4 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
        <span className="font-mono text-xs font-semibold tracking-wide">CLI Mode</span>
      </button>

      {/* Developer Terminal Modal */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
};

export default App;
