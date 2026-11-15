import React from "react";
import Link from "next/link";

export default function NotFoundView({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-4">
      <span className="text-6xl block" role="img" aria-label="not found">
        🧺
      </span>
      <p className="text-5xl font-black text-brand">৪০৪</p>
      <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
        {title}
      </h1>
      <p className="text-sm text-slate-500 max-w-md mx-auto">{message}</p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold text-sm shadow-md transition-colors"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
