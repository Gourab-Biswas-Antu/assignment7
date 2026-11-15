const Loading = () => {
  return (
    <div className="w-full py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-5 animate-pulse">
        <div className="h-4 w-56 bg-slate-200/70 rounded-md" />
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200/80 shrink-0" />
          <div className="space-y-2.5 w-full">
            <div className="h-7 w-48 bg-slate-200 rounded-lg" />
            <div className="h-4 w-72 max-w-full bg-slate-200/70 rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200/70" />
          ))}
        </div>
        <div className="h-72 rounded-3xl bg-slate-200/60" />
      </div>
    </div>
  );
};

export default Loading;
