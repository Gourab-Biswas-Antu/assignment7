import React from "react";

export default function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-slate-200/80" />
            <div className="space-y-2">
              <div className="h-4 w-28 bg-slate-200 rounded-md" />
              <div className="h-3 w-16 bg-slate-200/70 rounded-md" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="space-y-2">
              <div className="h-3 w-14 bg-slate-200/70 rounded-md" />
              <div className="h-6 w-24 bg-slate-200 rounded-md" />
            </div>
            <div className="h-5 w-14 bg-slate-200/80 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
