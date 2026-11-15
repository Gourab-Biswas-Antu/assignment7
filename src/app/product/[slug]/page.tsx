import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Home,
  TrendingDown,
  TrendingUp,
  Calculator,
} from "lucide-react";
import { getProduct } from "@/lib/api";
import { formatBn, formatTaka } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
import ProductImage from "@/components/ProductImage";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  // invalid product -> 404 page
  if (!product) notFound();

  const prices = product.markets.map((m) => m.price).filter((p) => p > 0);
  const minPrice = prices.length ? Math.min(...prices) : product.today;
  const maxPrice = prices.length ? Math.max(...prices) : product.today;
  const avgPrice = prices.length
    ? Math.round(prices.reduce((sum, p) => sum + p, 0) / prices.length)
    : product.today;

  const summary = [
    {
      label: "সর্বনিম্ন দাম",
      value: minPrice,
      icon: <TrendingDown size={16} />,
      box: "bg-fall-soft border-green-200 text-green-900",
      iconBox: "bg-green-100 text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: maxPrice,
      icon: <TrendingUp size={16} />,
      box: "bg-rise-soft border-red-200 text-red-900",
      iconBox: "bg-red-100 text-red-700",
    },
    {
      label: "গড় দাম",
      value: avgPrice,
      icon: <Calculator size={16} />,
      box: "bg-slate-50 border-slate-200 text-slate-900",
      iconBox: "bg-slate-200 text-slate-700",
    },
  ];

  return (
    <div className="w-full py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-slate-500"
        >
          <Link href="/" className="flex items-center gap-1 hover:text-brand">
            <Home size={14} />
            <span>হোম</span>
          </Link>
          <ChevronRight size={14} />
          {product.category && (
            <>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-brand"
              >
                {product.categoryNameBn || product.category}
              </Link>
              <ChevronRight size={14} />
            </>
          )}
          <span className="font-bold text-slate-900">{product.nameBn}</span>
        </nav>

        {/* Top summary */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_2px_14px_rgba(15,23,42,0.03)]">
          <div className="flex items-center gap-4">
            <ProductImage
              image={product.image}
              alt={product.nameBn}
              className="w-16 h-16 sm:w-20 sm:h-20 text-4xl"
            />
            <div className="space-y-1.5">
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900">
                {product.nameBn}
              </h1>
              {product.descriptionBn && (
                <p className="text-xs sm:text-sm text-slate-500">
                  {product.descriptionBn}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-brand-soft text-brand text-[11px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                  {product.unitNameBn}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 px-5 py-3 flex flex-col md:items-end gap-1">
            <span className="text-[11px] text-slate-500">আজকের দাম</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              {formatTaka(product.today)}
            </span>
            <span className="text-[11px] text-slate-500">
              {product.unitNameBn}
            </span>
            <ChangeBadge
              dir={product.change.dir}
              pct={product.change.pct}
              className="self-start md:self-end"
            />
          </div>
        </div>

        {/* Price summary */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 space-y-4 shadow-[0_2px_14px_rgba(15,23,42,0.03)]">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {summary.map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl border p-4 space-y-1.5 ${item.box}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{item.label}</span>
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.iconBox}`}
                  >
                    {item.icon}
                  </span>
                </div>
                <p className="text-2xl font-black">{formatTaka(item.value)}</p>
                <p className="text-[11px] opacity-70">{product.unitNameBn}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market wise prices */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 space-y-4 shadow-[0_2px_14px_rgba(15,23,42,0.03)]">
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {product.markets.length === 0 ? (
            <p className="text-sm text-slate-500">
              এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো পাওয়া যায়নি।
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left border-collapse">
                <thead>
                  <tr className="border-y border-slate-100 text-xs font-bold text-slate-500">
                    <th className="py-3 px-3">বাজার</th>
                    <th className="py-3 px-3">এলাকা</th>
                    <th className="py-3 px-3 text-right">সর্বনিম্ন</th>
                    <th className="py-3 px-3 text-right">সর্বোচ্চ</th>
                    <th className="py-3 px-3 text-right">আজকের দাম</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {product.markets.map((market) => (
                    <tr key={market.id}>
                      <td className="py-3.5 px-3 font-bold text-slate-900">
                        {market.marketName}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600">
                        {market.area}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-600">
                        {formatBn(market.min)} টাকা
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-600">
                        {formatBn(market.max)} টাকা
                      </td>
                      <td className="py-3.5 px-3 text-right font-extrabold text-slate-900">
                        {formatBn(market.price)} টাকা
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
