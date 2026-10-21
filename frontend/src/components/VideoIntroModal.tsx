import React, { useState, useEffect, useRef } from "react";
import { X, Video, Sparkles, CheckCircle2 } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface VideoIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoIntroModal: React.FC<VideoIntroModalProps> = ({ isOpen, onClose }) => {
  const [videoExists, setVideoExists] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check if /video-intro.mp4 exists
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      // Probe video source
      const testVideo = document.createElement("video");
      testVideo.src = "/video-intro.mp4";
      testVideo.onloadedmetadata = () => setVideoExists(true);
      testVideo.onerror = () => setVideoExists(false);

      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                Amit Kumar Ray — Video Introduction
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  20s Elevator Pitch
                </span>
              </h3>
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

        {/* Video Player or Guide View */}
        <div className="p-5 sm:p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[320px]">
          {videoExists ? (
            <div className="w-full relative rounded-xl overflow-hidden border border-slate-800 shadow-xl bg-black">
              <video
                ref={videoRef}
                src="/video-intro.mp4"
                controls
                autoPlay
                className="w-full max-h-[460px] object-contain rounded-xl"
              />
            </div>
          ) : (
            <div className="w-full max-w-lg text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 shadow-inner">
                <Video className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-1">
                  Video Slot Ready for Amit
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
                  Record your 15–20 second elevator pitch on your phone and save it as{" "}
                  <code className="text-indigo-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    video-intro.mp4
                  </code>{" "}
                  inside the <code className="text-indigo-300 font-mono">public/</code> folder. It will automatically play right here!
                </p>
              </div>

              {/* Ready-to-read Pitch Card */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-2">
                <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recommended 20-Second Script to Speak:</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "Hi, I'm {portfolioData.personal.name}, a Full Stack Developer. I build high-concurrency fintech platforms like Navapay and AI voice interview systems with React 19, TypeScript, Node.js, and Neon PostgreSQL. Feel free to explore my system architectures or download my resume below. Thank you!"
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1080p / 720p MP4</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>15–20 Seconds</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Autoplay with Controls</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
