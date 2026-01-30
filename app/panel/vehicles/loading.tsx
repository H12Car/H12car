export default function VehiclesLoading() {
  return (
    <div className="p-8">
      <div className="animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 bg-zinc-800 rounded w-40"></div>
          <div className="h-10 bg-zinc-800 rounded-lg w-36"></div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="h-10 bg-zinc-800 rounded-lg w-24"></div>
          <div className="h-10 bg-zinc-800 rounded-lg w-24"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-zinc-800 rounded-xl h-72"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
