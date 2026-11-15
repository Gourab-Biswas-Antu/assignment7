import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-center px-4 py-10 sm:py-14">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1.5">{subtitle}</p>
      </div>

      <div className="w-full max-w-[440px] rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
        {children}
      </div>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft size={14} />
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </div>
  );
}
