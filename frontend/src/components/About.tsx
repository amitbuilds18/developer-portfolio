import React from "react";
import { Code, Cpu, Smartphone, Zap } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      title: "Clean Architecture",
      desc: "Writing maintainable, type-safe TypeScript with modular component architecture.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      title: "AI Integration",
      desc: "Experience building conversational voice AI tools and LLM prompt-driven apps.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      title: "Responsive UI/UX",
      desc: "Crafting pixel-perfect layouts with Tailwind CSS optimized across all screen sizes.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "High Performance",
      desc: "Optimizing bundle sizes, API responses, and client-side rendering speeds.",
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 bg-slate-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
            Get To Know Me
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            About My Work & Philosophy
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Bio Text */}
          <div className="lg:col-span-6 space-y-5 text-slate-300 leading-relaxed text-base">
            <p className="text-lg text-slate-200 font-medium leading-relaxed">
              {portfolioData.personal.about}
            </p>
            <p>
              I take pride in writing scalable code that works in real production environments. My
              projects combine responsive modern frontends (React, Tailwind CSS, Vite) with robust
              backends (Node.js, Express) and cutting-edge AI integrations.
            </p>
            <p className="text-slate-400">
              Whether working on an AI voice-interview agent, complex dashboard workflows, or client
              portals, my goal is always seamless performance and intuitive user experience.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Location: {portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span>Ready to start immediately</span>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-2xl glass-panel glass-panel-hover group"
              >
                <div className="mb-3.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 w-fit group-hover:scale-110 group-hover:border-indigo-500/50 transition-all">
                  {item.icon}
                </div>
                <h4 className="font-bold text-white mb-1.5 text-sm sm:text-base tracking-tight">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
