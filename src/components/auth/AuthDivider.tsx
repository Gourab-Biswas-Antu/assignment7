import React from "react";

export default function AuthDivider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <span className="flex-1 h-px bg-slate-200" />
      <span className="text-xs text-slate-400">অথবা</span>
      <span className="flex-1 h-px bg-slate-200" />
    </div>
  );
}
