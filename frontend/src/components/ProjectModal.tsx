import React, { useEffect } from "react";
import { X, ExternalLink, Github, Cpu, ArrowRight, CheckCircle2, Layers, Lock } from "lucide-react";
import { Project } from "../data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-xs text-indigo-400">{project.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {project.image && (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-[21/9]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 backdrop-blur-sm truncate max-w-[240px] sm:max-w-none">
                  {project.liveUrl}
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-500/30 backdrop-blur-sm shrink-0">
                  Production Verified
                </span>
              </div>
            </div>
          )}

          {/* Architecture Overview */}
          {project.architecture && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>System Architecture Overview</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {project.architecture.overview}
                </p>
              </div>

              {/* End-to-End Flow Pipeline */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  End-to-End System Flow:
                </h4>
                <div className="space-y-2">
                  {project.architecture.flow.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/50 border border-slate-800 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-mono text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="flex-1">{step}</span>
                      {idx < project.architecture!.flow.length - 1 && (
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Challenges & Solutions */}
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                  Technical Engineering Highlights:
                </h4>
                <div className="space-y-2">
                  {project.architecture.technicalHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tech Tags */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Technologies & Frameworks:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 text-slate-200 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800 bg-slate-950/70">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 text-amber-300 border border-amber-500/30">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Private / Client Codebase</span>
            </div>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all"
          >
            <span>Launch Live App</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
