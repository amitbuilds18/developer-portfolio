import React, { useState, useEffect } from "react";
import { Database, CheckCircle2, CircleDashed } from "lucide-react";

export const DatabaseStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<"checking" | "connected" | "offline">("checking");

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error("Offline");
        const data = await res.json();
        if (isMounted) {
          if (data.database === "connected") {
            setStatus("connected");
          } else {
            setStatus("offline");
          }
        }
      } catch {
        if (isMounted) setStatus("offline");
      }
    };

    checkHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-medium text-slate-300 shadow-sm"
      title={
        status === "connected"
          ? "Backend & Neon PostgreSQL database are connected and responding"
          : "Backend API ready (Run 'npm run dev' in backend folder)"
      }
    >
      <Database className="w-3.5 h-3.5 text-indigo-400" />
      {status === "checking" && (
        <span className="flex items-center gap-1.5 text-slate-400">
          <CircleDashed className="w-3 h-3 animate-spin text-amber-400" />
          <span>Verifying Neon DB...</span>
        </span>
      )}
      {status === "connected" && (
        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Neon PostgreSQL: Connected</span>
        </span>
      )}
      {status === "offline" && (
        <span className="flex items-center gap-1.5 text-slate-400">
          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
          <span>PERN Stack Enabled</span>
        </span>
      )}
    </div>
  );
};
