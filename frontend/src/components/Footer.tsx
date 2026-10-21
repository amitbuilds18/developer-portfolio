import React from "react";
import { ArrowUp, Heart } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-10 text-slate-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-white tracking-tight">
            {portfolioData.personal.name.split(" ")[0]}
            <span className="text-indigo-400">.dev</span>
          </span>
          <p className="text-xs text-slate-500 mt-1">
            Built with React 19, TypeScript, & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>Crafted with passion</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for impactful software.</span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center gap-1.5 text-xs"
          aria-label="Scroll to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
