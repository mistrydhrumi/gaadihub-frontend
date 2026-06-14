interface NoCarsFoundProps {
  onClearFilters?: () => void;
}

export default function NoCarsFound({
  onClearFilters,
}: NoCarsFoundProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <div className="mb-4 text-5xl">🚗</div>

      <h3 className="text-xl font-semibold text-slate-900">
        No Cars Found
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        No vehicles match your current filters.
      </p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-6 rounded-lg bg-black px-5 py-2 text-white"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}