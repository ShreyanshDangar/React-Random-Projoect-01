export function SkeletonCard() {
  return (
    <div className="glass-card p-7">
      <div className="flex items-center gap-3.5 mb-5">
        <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
        <div className="h-5 w-36 rounded-md skeleton-shimmer" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-52 rounded skeleton-shimmer" />
        <div className="h-4 w-40 rounded skeleton-shimmer" />
      </div>
    </div>
  )
}
