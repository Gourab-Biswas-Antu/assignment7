"use client";

import { useEffect, useState } from "react";
import { IProduct } from "@/types/type";
import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

const PriceIncreaseSection = () => {
  const [topRisers, setTopRisers] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getProducts();
      setTopRisers(
        data
          .filter((item) => item.change.dir === "up")
          .sort((a, b) => b.change.pct - a.change.pct)
          .slice(0, 6),
      );
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="w-full pt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="mb-4 text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <span className="text-rise text-sm">▲</span>
          <span>আজ দাম বেড়েছে</span>
        </h2>

        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PriceIncreaseSection;
