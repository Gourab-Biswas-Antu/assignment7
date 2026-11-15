"use client";

import React, { useState } from "react";
import { todayBn } from "@/lib/format";

function BasketIllustration() {
  return (
    <svg
      viewBox="0 0 240 200"
      className="w-48 sm:w-60 lg:w-64 h-auto"
      role="img"
      aria-label="সবজির ঝুড়ি"
    >
      <ellipse cx="120" cy="184" rx="86" ry="10" fill="#e2e8e2" />
      {/* produce */}
      <path
        d="M96 38c-2-14 6-24 16-28"
        stroke="#15803d"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M150 34c4-14 14-22 24-24"
        stroke="#15803d"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="98" cy="68" r="34" fill="#ef4444" />
      <circle cx="152" cy="62" r="34" fill="#22c55e" />
      <circle cx="132" cy="88" r="20" fill="#f97316" />
      <circle cx="76" cy="92" r="16" fill="#a855f7" />
      <circle cx="178" cy="92" r="16" fill="#f59e0b" />
      {/* basket */}
      <path
        d="M52 104h136l-14 70c-1 6-6 10-12 10H78c-6 0-11-4-12-10z"
        fill="#b45309"
      />
      <rect x="46" y="98" width="148" height="14" rx="4" fill="#92400e" />
      <g stroke="#7c2d12" strokeWidth="2" opacity="0.55">
        <line x1="90" y1="114" x2="96" y2="182" />
        <line x1="120" y1="114" x2="120" y2="182" />
        <line x1="150" y1="114" x2="144" y2="182" />
      </g>
    </svg>
  );
}

export default function HeroSection() {
  const [dateText] = useState(() => todayBn());

  return (
    <section className="w-full pt-6 sm:pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-slate-200/80 px-5 sm:px-8 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-[0_2px_14px_rgba(15,23,42,0.03)]">
          {/* Text */}
          <div className="md:col-span-7 flex flex-col items-start text-left order-2 md:order-1">
            <span className="inline-flex items-center rounded-full bg-brand-soft text-brand text-xs font-semibold px-3 py-1 min-h-6">
              {dateText}
            </span>

            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* anchor link, same page — no route change */}
            <a
              href="#সব-পণ্য"
              className="mt-6 inline-flex items-center h-10 sm:h-11 px-5 rounded-lg bg-brand hover:bg-brand-dark text-white text-sm font-semibold shadow-md transition-colors"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Banner image */}
          <div className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2">
            <BasketIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}
