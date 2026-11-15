import { ICategory, IMarketPrice, IProduct } from "@/types/type";
import { toNumber } from "./format";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://openapi.programming-hero.com/api/bazardor";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Raw = Record<string, any>;

const pick = (obj: Raw, ...keys: string[]) => {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
  return undefined;
};

/** API may reply with `[...]`, `{ data: [...] }`, `{ products: [...] }` etc. */
function unwrapList(json: unknown): Raw[] {
  if (Array.isArray(json)) return json as Raw[];
  if (json && typeof json === "object") {
    const obj = json as Raw;
    for (const key of ["data", "products", "categories", "items", "result"]) {
      if (Array.isArray(obj[key])) return obj[key] as Raw[];
    }
  }
  return [];
}

function unwrapOne(json: unknown): Raw | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const obj = json as Raw;
  for (const key of ["data", "product", "category", "result"]) {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      return obj[key] as Raw;
    }
  }
  return obj;
}

export function normalizeCategory(raw: Raw): ICategory {
  const slug = String(pick(raw, "slug", "id") ?? "");
  return {
    id: String(pick(raw, "id", "slug") ?? slug),
    slug,
    nameBn: String(pick(raw, "nameBn", "name_bn", "name", "title") ?? slug),
    icon: String(pick(raw, "icon", "emoji", "image") ?? "🛒"),
    descriptionBn: String(
      pick(raw, "descriptionBn", "description_bn", "description") ?? "",
    ),
  };
}

function normalizeMarket(raw: Raw, index: number): IMarketPrice {
  const price = toNumber(
    pick(raw, "price", "today", "todayPrice", "avgPrice", "avg", "fare"),
  );
  return {
    id: String(pick(raw, "id") ?? index),
    marketName: String(
      pick(raw, "marketName", "market", "bazarName", "bazar", "name") ?? "—",
    ),
    area: String(
      pick(raw, "area", "location", "city", "district", "region") ?? "—",
    ),
    min: toNumber(pick(raw, "min", "minPrice", "low")) || price,
    max: toNumber(pick(raw, "max", "maxPrice", "high")) || price,
    price,
  };
}

export function normalizeProduct(raw: Raw): IProduct {
  const today = toNumber(pick(raw, "today", "price", "todayPrice"));
  const yesterday = toNumber(pick(raw, "yesterday", "yesterdayPrice"));

  let dir = pick(raw, "change")?.dir as string | undefined;
  let pct = toNumber(pick(raw, "change")?.pct ?? pick(raw, "changePct"));
  if (!dir) {
    if (yesterday && today !== yesterday) {
      dir = today > yesterday ? "up" : "down";
      pct = (Math.abs(today - yesterday) / yesterday) * 100;
    } else {
      dir = "flat";
    }
  }

  const marketsRaw = pick(
    raw,
    "markets",
    "bazars",
    "marketPrices",
    "operators",
  );
  const markets = Array.isArray(marketsRaw)
    ? marketsRaw.map((m: Raw, i: number) => normalizeMarket(m, i))
    : [];

  const slug = String(pick(raw, "slug", "id") ?? "");
  const tagsRaw = pick(raw, "tags");
  const categoryNameBn = String(
    pick(raw, "categoryNameBn", "categoryName", "category") ?? "",
  );

  return {
    id: String(pick(raw, "id") ?? slug),
    slug,
    nameBn: String(pick(raw, "nameBn", "name_bn", "name", "title") ?? slug),
    descriptionBn: String(
      pick(raw, "descriptionBn", "description", "summaryBn", "marketNoteBn") ??
        "",
    ),
    category: String(pick(raw, "category", "categorySlug") ?? ""),
    categoryNameBn,
    categoryIcon: String(pick(raw, "categoryIcon") ?? ""),
    tags: Array.isArray(tagsRaw)
      ? tagsRaw.map(String)
      : categoryNameBn
        ? [categoryNameBn]
        : [],
    unit: String(pick(raw, "unit") ?? ""),
    unitNameBn: String(pick(raw, "unitNameBn", "unitBn", "unit") ?? ""),
    image: String(pick(raw, "image", "emoji", "icon") ?? "🛒"),
    today,
    yesterday,
    change: { dir: dir as "up" | "down" | "flat", pct },
    markets,
    lastUpdated: String(pick(raw, "lastUpdated", "updatedAt") ?? ""),
  };
}

async function getJson(path: string): Promise<unknown | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`API error (${path}):`, error);
    return null;
  }
}

export async function getProducts(category?: string): Promise<IProduct[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const json = await getJson(`/products${query}`);
  return unwrapList(json).map(normalizeProduct);
}

export async function getProduct(slug: string): Promise<IProduct | null> {
  const json = await getJson(`/products/${encodeURIComponent(slug)}`);
  const raw = unwrapOne(json);
  if (raw && pick(raw, "nameBn", "name_bn", "name", "title")) {
    return normalizeProduct(raw);
  }
  // fallback: the single endpoint may only accept the numeric id
  const all = await getProducts();
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function getCategories(): Promise<ICategory[]> {
  const json = await getJson("/categories");
  return unwrapList(json).map(normalizeCategory);
}

export async function getCategory(slug: string): Promise<ICategory | null> {
  const json = await getJson(`/categories/${encodeURIComponent(slug)}`);
  const raw = unwrapOne(json);
  if (raw && pick(raw, "nameBn", "name_bn", "name", "title")) {
    return normalizeCategory(raw);
  }
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}
