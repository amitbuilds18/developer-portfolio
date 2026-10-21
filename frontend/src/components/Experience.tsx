import React from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-indigo-400 mb-2">
            Academic & Career Track
          </h2>
          <h3 className="text-3xl font-bold text-white tracking-tight">
            Education & Technical Foundations
          </h3>
          <p className="mt-2 text-slate-400 text-sm">
            Formal engineering degree and hands-on specialization in full-stack architecture.
          </p>
        </div>

        <div className="relative border-l-2 border-indigo-500/30 ml-4 md:ml-12 space-y-8">
          {portfolioData.experience.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-8 group">
              {/* Glowing Node indicator */}
              <div className="absolute -left-[17px] top-6 w-8 h-8 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all">
                <GraduationCap className="w-4 h-4 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>

              {/* Glass Card */}
              <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.role}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-850 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400 mb-3">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>{item.organization}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800/80">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
