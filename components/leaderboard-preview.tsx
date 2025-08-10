"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type Entry = { id: string; name: string; points: number }

export default function LeaderboardPreview() {
  const [entries, setEntries] = useState<Entry[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const load = async () => {
      try {
        const res = await fetch("/api/leaderboard", { cache: "no-store" })
        const data = (await res.json()) as Entry[]
        if (alive) {
          setEntries(data.slice(0, 5))
          setLoading(false)
        }
      } catch (e) {
        setLoading(false)
      }
    }
    load()
    const id = setInterval(load, 10_000) // refresh every 10s
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Live Leaderboard</h2>
          <p className="mt-1 text-neutral-700">Top players right now.</p>
        </div>
        <Link href="/leaderboard">
          <Button
            variant="outline"
            className="h-12 rounded-xl border-2 border-amber-300 bg-white font-semibold hover:bg-amber-50"
          >
            View All
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl bg-white shadow">
        {loading ? (
          <ul className="divide-y divide-amber-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 animate-pulse rounded-full bg-amber-100" />
                  <div className="h-4 w-28 animate-pulse rounded bg-amber-100" />
                </div>
                <div className="h-4 w-10 animate-pulse rounded bg-amber-100" />
              </li>
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-amber-100">
            {(entries ?? []).map((e, i) => (
              <motion.li
                key={e.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center justify-between px-4 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                    {i + 1}
                  </div>
                  <div className="text-sm font-semibold">{e.name}</div>
                </div>
                <div className="text-sm font-bold">{e.points}</div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}