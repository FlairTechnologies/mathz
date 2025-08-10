import LeaderboardList from "@/components/leaderboard-list"

// async function getLeaderboard() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/leaderboard`, { cache: "no-store" })
//   return (await res.json()) as { id: string; name: string; points: number }[]
// }
// async function getUser() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/user`, { cache: "no-store" })
//   return (await res.json()) as { id: string; name: string; points: number }
// }
// async function getStatus() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/status`, { cache: "no-store" })
//   return (await res.json()) as { subscribed: boolean }
// }

export default async function LeaderboardPage() {
  // const [status, user, list] = await Promise.all([getStatus(), getUser(), getLeaderboard()])
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Top Players</h1>
          <p className="mt-1 text-sm text-neutral-600">Climb the leaderboard by answering correctly!</p>
        </div>

        <div className="mt-6">
          {(() => {
            // Mock leaderboard data
            const leaderboardEntries = [
              { id: "1", name: "Ada", points: 120 },
              { id: "2", name: "Grace", points: 110 },
              { id: "3", name: "Alan", points: 105 },
              { id: "4", name: "Katherine", points: 100 },
              { id: "5", name: "Edsger", points: 95 },
              { id: "6", name: "Evelyn", points: 90 },
              { id: "7", name: "Donald", points: 85 },
              { id: "8", name: "Barbara", points: 80 },
              { id: "9", name: "Linus", points: 75 },
              { id: "10", name: "Tim", points: 70 },
              { id: "11", name: "Guido", points: 65 },
              { id: "12", name: "Margaret", points: 60 },
            ];
            // Mock user
            const user = { id: "1", name: "Ada", points: 120 };
            return (
              <LeaderboardList entries={leaderboardEntries} currentUserId={user.id} />
            );
          })()}
        </div>

        <div className="mt-8 text-center">
          <a
            // href={status.subscribed ? "/start" : "/subscription"}
            href={"/start"}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl border-2 border-amber-400 bg-white text-base font-semibold hover:bg-amber-50"
          >
            {"Back to Start"}
            {/* {status.subscribed ? "Back to Start" : "Subscribe to Play"} */}
          </a>
        </div>
      </div>
    </main>
  )
}
