import React, { useState } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Cpu,
  Filter,
  X,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

        {/* Project Cards 3-Column Grid (Exact layout from user screenshot) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {baseProjects.map((project: Project) => {
            const isMatch = activeSkillFilter
              ? matchesSkill(project.tags, activeSkillFilter)
              : true;

            return (
              <div
                key={project.id}
                className={`flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0b1329] border transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 group ${
                  activeSkillFilter && isMatch
                    ? "border-emerald-500/80 ring-2 ring-emerald-500/30 shadow-emerald-500/10 scale-[1.01]"
                    : activeSkillFilter && !isMatch
                    ? "opacity-35 hover:opacity-90 grayscale-[40%] border-slate-800"
                    : "border-slate-800/90 hover:border-slate-700"
                }`}
              >
                <div>
                  {/* Top Image Container with Badges */}
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-950 border border-slate-800/80 group-hover:border-slate-700 transition-colors">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                        No Preview Available
                      </div>
                    )}

                    {/* Dark Gradient Overlay for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/60 pointer-events-none" />

                    {/* Top Badges: Category & PROD */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                      <div className="pointer-events-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0a0f1d]/85 backdrop-blur-md border border-slate-700/70 text-slate-200 text-xs font-semibold">
                        <Layers className="w-3.5 h-3.5 text-blue-400" />
                        <span>{project.categoryBadge || "Full Stack"}</span>
                      </div>

                      <div className="pointer-events-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0a0f1d]/85 backdrop-blur-md border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold tracking-wider">
                        <Zap className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                        <span>{project.prodBadge || "PROD"}</span>
                      </div>
                    </div>

                    {/* Bottom Metric Highlight Strip (Full-width bar matching reference) */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
                      <div className="w-full bg-[#0a0f1d]/90 backdrop-blur-md border border-slate-800/90 rounded-lg px-2.5 py-1.5 flex items-center gap-2 text-xs font-medium text-emerald-400 shadow-md">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{project.metricHighlight || project.tagline}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Title with ArrowUpRight */}
                  <div className="mb-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/title flex items-start justify-between gap-2"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover/title:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {project.title}
                      </h4>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/title:text-blue-400 transition-colors shrink-0 mt-1" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => {
                      const isTagMatched =
                        activeSkillFilter &&
                        matchesSkill([tag], activeSkillFilter);

                      return (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded-md text-[11px] font-mono transition-colors ${
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
                </div>

                {/* Bottom Actions: Live Demo + Source Code + Architecture Modal */}
                <div className="pt-2">
                  <div className="flex items-center gap-2.5">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-500/20 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Demo</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  </div>

                  {/* Architecture Modal Deep Dive Trigger */}
                  {project.architecture && (
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="w-full mt-2.5 py-1.5 text-[11px] font-mono text-slate-400 hover:text-indigo-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Cpu className="w-3 h-3 text-indigo-400" />
                      <span>System Architecture & Pipeline</span>
                    </button>
                  )}
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
