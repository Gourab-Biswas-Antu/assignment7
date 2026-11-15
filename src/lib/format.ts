const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** "১,২৫০" / "১২৫০ টাকা" / 1250 -> 1250 (always a real number, so sorting is numeric) */
export function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value === "string") {
    const english = value
      .replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)))
      .replace(/,/g, "");
    const parsed = parseFloat(english.replace(/[^0-9.\-]/g, ""));
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/** 1850 -> "১,৮৫০" */
export function formatBn(value: number, fractionDigits = 0): string {
  return value.toLocaleString("bn-BD", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** 148 -> "১৪৮ টাকা" */
export function formatTaka(value: number): string {
  return `${formatBn(value)} টাকা`;
}

/** 2.1 -> "২.১%" */
export function formatPct(value: number): string {
  return `${formatBn(Math.abs(value), 1)}%`;
}

export function todayBn(date = new Date()): string {
  return date.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
