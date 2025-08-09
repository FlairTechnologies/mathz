import LeaderboardList from "@/components/leaderboard-list"

async function getLeaderboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/leaderboard`, { cache: "no-store" })
  return (await res.json()) as { id: string; name: string; points: number }[]
}
async function getUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/user`, { cache: "no-store" })
  return (await res.json()) as { id: string; name: string; points: number }
}
async function getStatus() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/status`, { cache: "no-store" })
  return (await res.json()) as { subscribed: boolean }
}

export default async function LeaderboardPage() {
  const [status, user, list] = await Promise.all([getStatus(), getUser(), getLeaderboard()])
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Top Players</h1>
          <p className="mt-1 text-sm text-neutral-600">Climb the leaderboard by answering correctly!</p>
        </div>

        <div className="mt-6">
          <LeaderboardList entries={list} currentUserId={user.id} />
        </div>

        <div className="mt-8 text-center">
          <a
            href={status.subscribed ? "/start" : "/subscription"}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl border-2 border-amber-400 bg-white text-base font-semibold hover:bg-amber-50"
          >
            {status.subscribed ? "Back to Start" : "Subscribe to Play"}
          </a>
        </div>
      </div>
    </main>
  )
}
