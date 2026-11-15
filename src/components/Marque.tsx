"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getProducts } from "@/lib/api";
import { formatBn } from "@/lib/format";
import { IProduct } from "@/types/type";
import ProductImage from "./ProductImage";

const TEXT_COLOR = {
  up: "text-rise",
  down: "text-fall",
  flat: "text-slate-500",
} as const;
const ICON = { up: "▲", down: "▼", flat: "—" } as const;

export default function Marque() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    getProducts().then((data) => setProducts(data.slice(0, 16)));
  }, []);

  return (
    <div className="w-full bg-white border-b border-slate-200/80 h-10 overflow-hidden">
      {products.length === 0 ? (
        <div className="h-full w-full animate-pulse bg-slate-100/60" />
      ) : (
        <Marquee pauseOnHover speed={40} gradient={false} className="h-10">
          {products.map((item) => {
            const productHref = session
              ? `/product/${item.slug}`
              : `/signin?next=${encodeURIComponent(`/product/${item.slug}`)}&redirected=1`;

            return (
            <Link
              key={item.id}
              href={productHref}
              className="flex items-center gap-2 px-4 h-10 border-r border-slate-200/80 whitespace-nowrap text-xs hover:bg-slate-50 transition-colors"
            >
              <ProductImage
                image={item.image}
                alt={item.nameBn}
                className="w-5 h-5 text-xs"
              />
              <span className="font-semibold text-slate-800">
                {item.nameBn}
              </span>
              <span className="text-slate-600">
                {formatBn(item.today)} টাকা/
                {item.unitNameBn.replace("প্রতি ", "")}
              </span>
              <span className={`font-bold ${TEXT_COLOR[item.change.dir]}`}>
                {ICON[item.change.dir]} {formatBn(Math.abs(item.change.pct), 1)}
                %
              </span>
            </Link>
            );
          })}
        </Marquee>
      )}
    </div>
  );
}
