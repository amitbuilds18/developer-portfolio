import React from "react";
import { Layers, Server, Database, Sparkles, Filter, X } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface SkillsProps {
  activeSkill?: string | null;
  onSelectSkill?: (skill: string | null) => void;
}

export const Skills: React.FC<SkillsProps> = ({ activeSkill, onSelectSkill }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages & Frontend":
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case "Backend & Microservices":
        return <Server className="w-5 h-5 text-cyan-400" />;
      case "Databases & Architecture":
        return <Database className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleSkillClick = (skillName: string) => {
    if (!onSelectSkill) return;
    if (activeSkill === skillName) {
      onSelectSkill(null);
    } else {
      onSelectSkill(skillName);
      // Smooth scroll to projects
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
            Technical Proficiency
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Skills & Modern Technologies
          </h3>
          <p className="mt-3 text-slate-400 text-sm">
            Technologies, frameworks, and developer tools I leverage to build scalable apps.
          </p>

          {/* Interactive Filtering Hint / Reset Pill */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {activeSkill ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs animate-in fade-in">
                <Filter className="w-3.5 h-3.5 text-indigo-400" />
                <span>Active Filter: <strong>{activeSkill}</strong></span>
                <button
                  onClick={() => onSelectSkill && onSelectSkill(null)}
                  className="hover:text-white transition-colors"
                  title="Clear filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-400 border border-slate-800 text-xs">
                <span>💡 Click any technology to highlight matching projects</span>
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.skillCategories.map((group) => (
            <div
              key={group.category}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 transition-all backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-slate-800/70 border border-slate-750">
                  {getCategoryIcon(group.category)}
                </div>
                <h4 className="font-semibold text-lg text-white">{group.category}</h4>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => {
                  const isSelected = activeSkill === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onClick={() => handleSkillClick(skill.name)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer transform active:scale-95 text-left ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400/50 shadow-md shadow-indigo-600/30 scale-105"
                          : "bg-slate-800/70 text-slate-200 border border-slate-700/60 hover:border-indigo-500/60 hover:text-white hover:bg-slate-800"
                      }`}
                      title={`Click to filter projects using ${skill.name}`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
