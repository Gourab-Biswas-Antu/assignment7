"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { IProduct } from "@/types/type";
import { formatTaka } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }: { product: IProduct }) {
  const { data: session } = useSession();
  const productHref = session
    ? `/product/${product.slug}`
    : `/signin?next=${encodeURIComponent(`/product/${product.slug}`)}&redirected=1`;

  return (
    <Link href={productHref} className="block h-full group">
      <article className="h-full rounded-2xl bg-white border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all group-hover:shadow-[0_8px_24px_rgba(15,23,42,0.08)] group-hover:border-brand/40">
        {/* Emoji + name + unit */}
        <div className="flex items-center gap-3">
          <ProductImage image={product.image} alt={product.nameBn} />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight truncate group-hover:text-brand transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-slate-500">{product.unitNameBn}</p>
          </div>
        </div>

        {/* Price row */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-slate-500">আজকের দাম</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
              {formatTaka(product.today)}
            </p>
          </div>
          <ChangeBadge dir={product.change.dir} pct={product.change.pct} />
        </div>
      </article>
    </Link>
  );
}
