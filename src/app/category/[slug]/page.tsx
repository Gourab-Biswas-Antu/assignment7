import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategory, getProducts } from "@/lib/api";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="w-full py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex items-center gap-4 shadow-[0_2px_14px_rgba(15,23,42,0.03)]">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-soft flex items-center justify-center text-3xl shrink-0">
            {category.icon}
          </div>
          <div className="space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {category.nameBn}
            </h1>
            {category.descriptionBn && (
              <p className="text-xs sm:text-sm text-slate-500">
                {category.descriptionBn}
              </p>
            )}
          </div>
        </div>

        <CategoryProducts products={products} />
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
