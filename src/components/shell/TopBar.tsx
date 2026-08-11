"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { titleForPath } from "./Sidebar";

function LiveClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono text-[12px] text-slate-400">{now}</span>;
}

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/60 bg-slate-950/50 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-[15px] font-semibold text-white">{titleForPath(pathname)}</h1>
        <span className="rounded-full border border-slate-700/60 bg-slate-800/50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400">
          Phase 1 · Foundation
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Voice waveform — decorative until Phase 11 */}
        <div className="flex h-5 items-end gap-[3px]" title="Voice interface arrives in Phase 11">
          <span className="wave-bar h-3" />
          <span className="wave-bar h-4" />
          <span className="wave-bar h-2.5" />
          <span className="wave-bar h-3.5" />
          <span className="wave-bar h-2" />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-800/50 px-3 py-1">
          <span className="status-dot online" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            AI Core
          </span>
        </div>

        <LiveClock />
      </div>
    </header>
  );
}
