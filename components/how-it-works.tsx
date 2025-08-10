"use client"

import { motion } from "framer-motion"
import { Calculator, Clock3, Sparkles, Trophy } from "lucide-react"

const steps = [
  {
    title: "1. Tap Play",
    desc: "Start a new session and get your first problem.",
    icon: Sparkles,
  },
  {
    title: "2. Beat the Clock",
    desc: "You have 10 seconds to choose the correct answer.",
    icon: Clock3,
  },
  {
    title: "3. Build Streaks",
    desc: "Answer correctly to earn points and streak bonuses.",
    icon: Calculator,
  },
  {
    title: "4. Climb Ranks",
    desc: "Compete with the top players on the leaderboard.",
    icon: Trophy,
  },
] as const

export default function HowItWorks() {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How It Works</h2>
        <p className="mt-2 text-neutral-700">Simple rules, fast fun.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-amber-200/60 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{s.title}</h3>
              <p className="mt-1 text-sm text-neutral-700">{s.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
