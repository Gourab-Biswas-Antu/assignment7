"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { IProduct } from "@/types/type";
import ProductCard from "./ProductCard";

type SortKey = "default" | "price-asc" | "price-desc";

const CategoryProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<SortKey>("default");

  // `today` is always a real number (see normalizeProduct), so this is a
  // numeric sort even when the API sends Bengali digits like "১,২৫০".
  const sortedProducts = [...products];
  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.today - b.today);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="space-y-4">
      {/* Sort control */}
      <div className="flex items-center justify-end gap-2">
        <label
          htmlFor="sort"
          className="text-xs sm:text-sm font-semibold text-slate-600"
        >
          সাজান:
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="appearance-none text-xs sm:text-sm font-medium text-slate-800 bg-white border border-slate-200 rounded-lg pl-3 pr-9 py-2 focus:outline-none focus:border-brand cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
          />
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-10 sm:p-14 text-center space-y-4">
          <p className="text-4xl">🛒</p>
          <p className="text-slate-600 font-medium">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 h-11 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold text-sm shadow-md transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
