export default function Spinner({ label = "Loading…" }: { label?: string } = { label: "Loading…" }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-300 border-t-rose-500" />
      <div className="text-sm text-neutral-600">{label}</div>
    </div>
  )
}
