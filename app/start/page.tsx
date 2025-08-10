import { Button } from "@/components/ui/button"
import Link from "next/link"

// async function getUser() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/user`, { cache: "no-store" })
//   return (await res.json()) as { id: string; name: string; points: number }
// }

// async function getStatus() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/status`, { cache: "no-store" })
//   return (await res.json()) as { subscribed: boolean }
// }

export default async function StartPage() {
  // const [user, status] = await Promise.all([getUser(), getStatus()])
  // if (!status.subscribed) {
  //   return (
  //     <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
  //       <div className="mx-auto max-w-md px-4 py-10">
  //         <div className="text-center">
  //           <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-2xl font-black text-white shadow">
  //             M
  //           </div>
  //           <h1 className="text-3xl font-extrabold tracking-tight">Mathz</h1>
  //           <p className="mt-2 text-neutral-600">You need a subscription to start playing.</p>
  //           <div className="mt-6">
  //             <Link href="/subscription">
  //               <Button className="h-12 w-full rounded-xl bg-amber-500 text-base font-semibold hover:bg-amber-500/90">
  //                 Subscribe to Start
  //               </Button>
  //             </Link>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   )
  // }

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="text-center">
          <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-2xl font-black text-white shadow">
            M
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Mathz</h1>
          <p className="mt-2 text-neutral-600">Sharpen your mind. Beat the clock.</p>
        </div>

        <div className="mt-8 grid gap-3">
          <Link href="/game">
            <Button className="h-14 w-full rounded-2xl bg-rose-500 text-lg font-semibold tracking-wide hover:bg-rose-500/90 active:scale-[0.99] transition">
              Start Game
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button
              variant="outline"
              className="h-14 w-full rounded-2xl border-2 border-amber-400 bg-white text-lg font-semibold hover:bg-amber-50"
            >
              Leaderboard
            </Button>
          </Link>
          <Link href="/info">
            <Button
              variant="secondary"
              className="h-14 w-full rounded-2xl bg-white text-lg font-semibold hover:bg-amber-50 border-2 border-amber-200"
            >
              How to Play
            </Button>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm">
            Current Points: <span className="font-extrabold text-neutral-900">0</span>
          </span>
          <p className="mt-4 text-center text-xs text-neutral-600">
            Session rules: Answer up to 8 questions. One wrong answer ends the session.
          </p>
        </div>
      </div>
    </main>
  )
}
