import ProductGridSkeleton from "@/components/ProductGridSkeleton";

const Loading = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <ProductGridSkeleton count={9} />
    </div>
  );
};

export default Loading;
