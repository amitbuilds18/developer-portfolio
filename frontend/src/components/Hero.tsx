import React, { useState } from "react";
import { ArrowRight, Eye, Github, Linkedin, Mail, Sparkles, Video } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { ResumeModal } from "./ResumeModal";
import { DatabaseStatusBadge } from "./DatabaseStatusBadge";
import { VideoIntroModal } from "./VideoIntroModal";

export const Hero: React.FC = () => {
  const { personal, stats } = portfolioData;
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Circular Profile Avatar with Ambient Glow & Online Pulse */}
          <div className="relative inline-block mb-6 group">
            {/* Ambient Multi-color Glowing Halo */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
            
            {/* Gradient Border Frame */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 shadow-2xl shadow-indigo-500/20">
              <img
                src={personal.avatar || "/profile.jpg"}
                alt={personal.name}
                className="w-full h-full object-cover rounded-full bg-slate-900 border-2 border-slate-950 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Active Online Status Indicator */}
            <span
              className="absolute bottom-1.5 right-1.5 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md"
              title="Active & Available for Hire"
            >
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-ping opacity-75" />
            </span>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-medium text-slate-300 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.status}</span>
            </div>

            <DatabaseStatusBadge />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400">
              {personal.name}
            </span>
            <br />
            <span className="text-slate-300 text-3xl sm:text-4xl md:text-5xl font-bold">
              {personal.role}
            </span>
          </h1>

          {/* Subheading / Tagline */}
          <p className="text-base sm:text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            {personal.tagline}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsVideoOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900 hover:from-purple-800/60 hover:to-indigo-800/60 text-purple-200 border border-purple-500/40 hover:border-purple-400 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-purple-950/20 cursor-pointer"
            >
              <Video className="w-4 h-4 text-purple-400" />
              <span>Watch Video Pitch</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-indigo-500/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-400" />
              <span>Preview Resume</span>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Contact Me</span>
            </a>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center justify-center gap-4 text-slate-400">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-2xl glass-panel glass-panel-hover text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 mb-1">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-tight">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* In-Browser Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={personal.resumeUrl}
        downloadName="Amit_Kumar_Ray_Resume.pdf"
      />

      {/* Video Introduction Pitch Modal */}
      <VideoIntroModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </section>
  );
};
