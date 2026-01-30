export default function DashboardLoading() {
  return (
    <div className="p-8">
      <div className="animate-pulse">
        <div className="h-8 bg-zinc-800 rounded w-48 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-zinc-800 rounded-xl p-6 h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-800 rounded-xl h-80"></div>
          <div className="bg-zinc-800 rounded-xl h-80"></div>
        </div>
      </div>
    </div>
  );
}
