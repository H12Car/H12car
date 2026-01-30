export default function QuotesLoading() {
  return (
    <div className="p-8">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-zinc-800 rounded w-32"></div>
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-zinc-800 rounded-lg w-24"></div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-800 rounded-xl overflow-hidden">
          <div className="h-12 bg-zinc-700 mb-1"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-zinc-800 border-t border-zinc-700"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
