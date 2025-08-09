import InfoSections from "@/components/info-sections"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InfoPage() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="mx-auto max-w-md px-4 py-8">
        <div className="mb-4 flex items-center gap-2">
          <Link href="/start">
            <Button variant="ghost" className="rounded-xl hover:bg-amber-100">
              {"←"} Back
            </Button>
          </Link>
          <h1 className="text-2xl font-extrabold">Info & Instructions</h1>
        </div>

        <InfoSections />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/game">
            <Button className="h-12 rounded-xl bg-rose-500 font-semibold hover:bg-rose-500/90">Start Game</Button>
          </Link>
          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="h-12 rounded-xl border-2 border-amber-300 bg-white font-semibold hover:bg-amber-50"
            >
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
