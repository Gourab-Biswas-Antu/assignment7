import React from "react";
import { ChangeDir } from "@/types/type";
import { formatPct } from "@/lib/format";

// Figma: price rise = red ▲, price fall = green ▼, flat = gray
const STYLES: Record<ChangeDir, string> = {
  up: "bg-rise-soft text-rise",
  down: "bg-fall-soft text-fall",
  flat: "bg-slate-100 text-slate-500",
};

const ICON: Record<ChangeDir, string> = { up: "▲", down: "▼", flat: "—" };

export default function ChangeBadge({
  dir,
  pct,
  className = "",
}: {
  dir: ChangeDir;
  pct: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STYLES[dir]} ${className}`}
    >
      <span className="text-[9px]">{ICON[dir]}</span>
      {formatPct(pct)}
    </span>
  );
}
