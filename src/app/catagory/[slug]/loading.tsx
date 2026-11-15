import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const Loading = () => {
  return (
    <div className="w-full py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5 animate-pulse">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-200/80 shrink-0" />
          <div className="space-y-2.5 w-full">
            <div className="h-6 w-28 bg-slate-200 rounded-lg" />
            <div className="h-3.5 w-56 bg-slate-200/70 rounded-md" />
          </div>
        </div>
        <div className="flex justify-end">
          <div className="h-9 w-44 bg-slate-200/80 rounded-lg" />
        </div>
        <ProductGridSkeleton count={9} />
      </div>
    </div>
  );
};

export default Loading;
