"use client"

import { motion } from "framer-motion"
import { Clock3, CheckCircle2, XCircle, Flame } from "lucide-react"

const rules = [
  {
    title: "Beat the Timer",
    desc: "You have 10 seconds per question. The bar shrinks as time runs out.",
    icon: Clock3,
  },
  {
    title: "Tap the Answer",
    desc: "Choose 1 of 4 options. Big buttons for fast, confident taps.",
    icon: CheckCircle2,
  },
  {
    title: "One Wrong Ends Session",
    desc: "A wrong answer or timeout ends your session. Restart or view leaderboard.",
    icon: XCircle,
  },
  {
    title: "Build Streaks",
    desc: "Consecutive correct answers increase your streak and earn bonuses.",
    icon: Flame,
  },
] as const

export default function HowToPlay() {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How to Play</h2>
        <p className="mt-2 text-neutral-700">Quick rules to get you going.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {rules.map((r, i) => {
          const Icon = r.icon
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-amber-200/60 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{r.title}</h3>
              <p className="mt-1 text-sm text-neutral-700">{r.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
