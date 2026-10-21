import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Sparkles, MessageCircle, Mic } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const VoicePitchPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const [usingRealAudio, setUsingRealAudio] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const pitchText = `Hi! I'm ${portfolioData.personal.name}, a Full Stack Developer. I build high-concurrency fintech platforms with Neon PostgreSQL and intelligent voice AI applications with React 19 and Node.js. Feel free to explore my system architectures or preview my resume!`;

  // 1. Check for real audio file (/voice-intro.mp3)
  useEffect(() => {
    const audio = new Audio("/voice-intro.mp3");

    audio.addEventListener("canplaythrough", () => {
      setUsingRealAudio(true);
    });

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setProgress(0);
    });

    audio.addEventListener("error", () => {
      // Audio file not present yet, will fallback to browser SpeechSynthesis
      setUsingRealAudio(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  // 2. Prepare Web Speech API fallback
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const utterance = new SpeechSynthesisUtterance(pitchText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    utterance.onstart = () => {
      setIsPlaying(true);
      setProgress(0);
      const startTime = Date.now();
      const estimatedDuration = 14000;

      progressTimerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min((elapsed / estimatedDuration) * 100, 100);
        setProgress(pct);
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      setTimeout(() => setProgress(0), 1000);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setProgress(0);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };

    utteranceRef.current = utterance;

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [pitchText]);

  const playSpeechSynthesis = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    if (utteranceRef.current) {
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.includes("Natural") ||
            v.name.includes("Google") ||
            v.name.includes("Samantha") ||
            v.name.includes("Alex"))
      );
      if (preferredVoice) {
        utteranceRef.current.voice = preferredVoice;
      }
      window.speechSynthesis.speak(utteranceRef.current);
    }
  };

  const togglePlay = () => {
    if (usingRealAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            playSpeechSynthesis();
          });
      }
    } else {
      if (isPlaying) {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
        setIsPlaying(false);
        setProgress(0);
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      } else {
        playSpeechSynthesis();
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      {/* Player Container */}
      <div className="p-3 sm:p-3.5 rounded-2xl glass-panel shadow-xl transition-all">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Play/Pause button + Label */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className={`p-2.5 rounded-xl transition-all transform active:scale-95 shadow-md flex items-center justify-center cursor-pointer ${
                isPlaying
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
              }`}
              title={isPlaying ? "Pause Voice" : "Play Voice Introduction"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  {usingRealAudio ? (
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  )}
                  {usingRealAudio ? "Amit's Voice Intro" : "14s Voice Intro"}
                </span>
                <span
                  className={`px-2 py-0.2 rounded-full text-[10px] font-mono border ${
                    usingRealAudio
                      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                      : "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                  }`}
                >
                  {usingRealAudio ? "Real Audio" : "Voice AI"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isPlaying
                  ? "Playing introduction..."
                  : usingRealAudio
                  ? "Click to hear Amit's recorded voice pitch"
                  : "Click to hear Amit's 14-second pitch"}
              </p>
            </div>
          </div>

          {/* Right: Audio Waveform Equalizer + Transcript button */}
          <div className="flex items-center gap-3">
            {/* Animated Equalizer Bars */}
            <div className="flex items-center gap-1 h-5 px-2">
              <span
                className={`w-1 bg-indigo-400 rounded-full transition-all duration-200 ${
                  isPlaying ? "h-5 animate-pulse" : "h-2 bg-slate-700"
                }`}
              />
              <span
                className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${
                  isPlaying ? "h-4 animate-bounce" : "h-1.5 bg-slate-700"
                }`}
              />
              <span
                className={`w-1 bg-emerald-400 rounded-full transition-all duration-150 ${
                  isPlaying ? "h-6 animate-pulse" : "h-3 bg-slate-700"
                }`}
              />
              <span
                className={`w-1 bg-purple-400 rounded-full transition-all duration-250 ${
                  isPlaying ? "h-3 animate-bounce" : "h-1.5 bg-slate-700"
                }`}
              />
              <span
                className={`w-1 bg-indigo-400 rounded-full transition-all duration-200 ${
                  isPlaying ? "h-5 animate-pulse" : "h-2 bg-slate-700"
                }`}
              />
            </div>

            {/* Transcript Toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Toggle transcript text"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar when playing */}
        {isPlaying && (
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Expandable Transcript Pill */}
        {showTranscript && (
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs text-slate-300 font-sans leading-relaxed animate-in fade-in">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase tracking-wider mb-1">
              Voice Transcript:
            </span>
            "{pitchText}"
          </div>
        )}
      </div>
    </div>
  );
};
