"use client"

import { motion } from "framer-motion"

export default function LeaderboardList({
  entries = [],
  currentUserId = "",
}: {
  entries?: { id: string; name: string; points: number }[]
  currentUserId?: string
} = {}) {
  return (
    <div className="rounded-2xl bg-white p-2 shadow">
      <ul className="divide-y divide-amber-100">
        {entries.slice(0, 10).map((e, i) => {
          const isYou = e.id === currentUserId
          return (
            <motion.li
              key={`${e.id}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-center justify-between px-3 py-3 ${isYou ? "bg-amber-50/80" : ""}`}
              aria-current={isYou ? "true" : "false"}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                  {i + 1}
                </div>
                <div className="text-sm font-semibold">
                  {e.name} {isYou ? "(You)" : ""}
                </div>
              </div>
              <div className="text-sm font-bold">{e.points}</div>
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
