"use client";

import React, { useEffect, useState } from "react";
import { IProduct } from "@/types/type";
import { getProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function AllProductsSection() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setProducts(await getProducts());
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section id="সব-পণ্য" className="w-full pt-10 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
          সব পণ্য
        </h2>
        <p className="mt-1 mb-4 text-xs sm:text-sm text-slate-500">
          যেকোনো পণ্যে ক্লিক করে বাজারভিত্তিক বিস্তারিত দাম দেখুন
        </p>

        {loading ? (
          <ProductGridSkeleton count={9} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
