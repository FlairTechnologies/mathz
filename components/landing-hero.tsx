"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import MathPattern from "./math-pattern"
import MathBackground from "./math-pattern"

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <MathBackground>
        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-7 sm:py-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="text-center mt-10 max-w-md"
          >
            <div className="mx-auto mb-5 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-400 text-4xl font-black text-white shadow">
              M
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-5xl">Mathz</h1>
            <p className="mx-auto mt-3 max-w-xl text-balance text-2xl text-neutral-700 sm:text-lg">
              Fast-paced math challenges. Beat the clock, build streaks, and climb the leaderboard.
            </p>
            <div className="mt-7 flex w-full max-w-md flex-col justify-center items-center gap-3 md:flex-row md:justify-center">
              <Link href="/subscription" className="w-full sm:w-auto">
                <Button className="h-14 w-full rounded-2xl bg-rose-500 text-lg font-semibold hover:bg-rose-500/90">
                  Play Now
                </Button>
              </Link>
              <Link href="/info" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-14 w-full rounded-2xl border-2 border-amber-300 bg-white text-lg font-semibold hover:bg-amber-50"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MathBackground>
    </section>
  )
}
