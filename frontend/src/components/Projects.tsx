import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  CheckCircle2,
  Star,
  Cpu,
  Filter,
  X,
  Sparkles,
  Layers,
  Zap,
  TrendingUp,
} from "lucide-react";
import { portfolioData, Project } from "../data/portfolioData";
import { ProjectModal } from "./ProjectModal";

interface ProjectsProps {
  activeSkillFilter?: string | null;
  onClearSkillFilter?: () => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  activeSkillFilter,
  onClearSkillFilter,
}) => {
  const [filter, setFilter] = useState<"all" | "featured">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getImagePath = (imgPath?: string) => {
    if (!imgPath) return "";
    if (imgPath.startsWith("http")) return imgPath;
    const base = (import.meta as any).env?.BASE_URL || "/";
    const cleanBase = base.endsWith("/") ? base : `${base}/`;
    const cleanPath = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    return `${cleanBase}${cleanPath}`;
  };

  const matchesSkill = (projectTags: string[], skillName: string) => {
    const cleanSkill = skillName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return projectTags.some((tag) => {
      const cleanTag = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
      return (
        cleanSkill.includes(cleanTag) ||
        cleanTag.includes(cleanSkill) ||
        (cleanSkill.includes("postgres") && cleanTag.includes("postgres")) ||
        (cleanSkill.includes("react") && cleanTag.includes("react")) ||
        (cleanSkill.includes("vapi") && cleanTag.includes("vapi")) ||
        (cleanSkill.includes("gemini") && cleanTag.includes("gemini")) ||
        (cleanSkill.includes("express") && cleanTag.includes("express")) ||
        (cleanSkill.includes("stripe") && cleanTag.includes("stripe"))
      );
    });
  };

  const baseProjects =
    filter === "featured"
      ? portfolioData.projects.filter((p) => p.featured)
      : portfolioData.projects;

  const matchedCount = activeSkillFilter
    ? baseProjects.filter((p) => matchesSkill(p.tags, activeSkillFilter)).length
    : baseProjects.length;

  return (
    <section id="projects" className="py-20 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
              Featured Work
            </h2>
            <h3 className="text-3xl font-bold text-white tracking-tight">
              Projects I Have Built
            </h3>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Real-world, full-stack applications with responsive interfaces, clean code, and live
              interactive deployments.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "all"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              All Projects ({portfolioData.projects.length})
            </button>
            <button
              onClick={() => setFilter("featured")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === "featured"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Featured ({portfolioData.projects.filter((p) => p.featured).length})
            </button>
          </div>
        </div>

        {/* Active Skill Filter Banner */}
        {activeSkillFilter && (
          <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/40 flex items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Filter className="w-4 h-4" />
              </div>
              <span className="text-slate-300">
                Filtering by technology:{" "}
                <strong className="text-emerald-400 font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 ml-1">
                  {activeSkillFilter}
                </strong>
                <span className="text-slate-400 ml-2">
                  ({matchedCount} {matchedCount === 1 ? "project" : "projects"} found)
                </span>
              </span>
            </div>

            <button
              onClick={onClearSkillFilter}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 font-medium shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}

        {/* Project Cards Grid (Spacious 2-column layout matching user screenshot) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {baseProjects.map((project: Project) => {
            const isMatch = activeSkillFilter
              ? matchesSkill(project.tags, activeSkillFilter)
              : true;

            return (
              <div
                key={project.id}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0b1329] border transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group ${
                  activeSkillFilter && isMatch
                    ? "border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-emerald-500/10 scale-[1.01]"
                    : activeSkillFilter && !isMatch
                    ? "opacity-35 hover:opacity-90 grayscale-[40%] border-slate-800"
                    : project.featured
                    ? "border-indigo-500/40 hover:border-indigo-500/70"
                    : "border-slate-800/90 hover:border-slate-750"
                }`}
              >
                <div>
                  {/* Top Professional Image Preview Banner */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-5 bg-slate-950 border border-slate-800/90 group-hover:border-indigo-500/40 transition-all shadow-xl">
                    <img
                      src={getImagePath(project.image)}
                      onError={(e) => {
                        if (project.fallbackImage) {
                          e.currentTarget.src = project.fallbackImage;
                        }
                      }}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Dark Vignette Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/70 pointer-events-none" />

                    {/* Top Badges: Category & PROD */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-700/70 text-slate-100 text-xs font-semibold shadow-lg">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{project.categoryBadge || "Full Stack"}</span>
                      </div>

                      <div className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold tracking-wider shadow-lg">
                        <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                        <span>{project.prodBadge || "PROD"}</span>
                      </div>
                    </div>

                    {/* Bottom Full-Width Metric Highlight Bar */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
                      <div className="w-full bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-emerald-400 shadow-md">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{project.metricHighlight || project.tagline}</span>
                      </div>
                    </div>

                    {/* Hover Quick Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px] bg-slate-950/40 z-20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Cpu className="w-3.5 h-3.5" />
                        <span>Architecture</span>
                      </button>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700 shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>

                  {/* Header Badges & External Links (from user screenshot) */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {project.featured ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          <Star className="w-3.5 h-3.5 fill-indigo-400" />
                          Featured Project
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Web Application
                        </span>
                      )}

                      {activeSkillFilter && isMatch && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 animate-pulse">
                          <Sparkles className="w-3 h-3" />
                          Uses {activeSkillFilter}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="Open Live Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-sm font-medium text-indigo-400/90 mb-3">{project.tagline}</p>
                  <p className="text-sm text-slate-300 mb-5 leading-relaxed">{project.description}</p>

                  {/* KEY HIGHLIGHTS: (Exact section from user screenshot) */}
                  <div className="mb-6 space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      KEY HIGHLIGHTS:
                    </span>
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80 mb-6">
                    {project.tags.map((tag) => {
                      const isTagMatched =
                        activeSkillFilter &&
                        matchesSkill([tag], activeSkillFilter);

                      return (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                            isTagMatched
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-bold"
                              : "bg-slate-900/80 text-slate-300 border border-slate-800"
                          }`}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>

                  {/* Card Action Buttons */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-850 text-indigo-300 hover:text-white border border-indigo-500/20 hover:border-indigo-500/50 transition-all shadow-sm group/btn cursor-pointer"
                    >
                      <Cpu className="w-4 h-4 text-indigo-400 group-hover/btn:scale-110 transition-transform" />
                      <span>System Architecture & Pipeline</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Architecture Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
