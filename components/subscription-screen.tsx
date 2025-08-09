"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

type Plan = "Daily" | "Weekly" | "Monthly"

export default function SubscriptionScreen(
  {
    defaultPlan = "Daily",
  }: {
    defaultPlan?: Plan
  } = { defaultPlan: "Daily" },
) {
  const router = useRouter()
  const [plan, setPlan] = useState<Plan>(defaultPlan)
  const [loading, setLoading] = useState(false)
  const plans: Plan[] = ["Daily", "Weekly", "Monthly"]

  async function subscribe() {
    setLoading(true)
    try {
      const res = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ plan }) })
      if (!res.ok) throw new Error("Subscription failed")
      await new Promise((r) => setTimeout(r, 300)) // tiny delay for UX
      router.replace("/start")
    } catch (e) {
      console.error(e)
      alert("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="text-center">
        <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-2xl font-black text-white shadow">
          M
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Welcome to Mathz</h1>
        <p className="mt-2 text-neutral-600">Subscribe to start playing</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {plans.map((p) => {
          const selected = plan === p
          return (
            <motion.button
              key={p}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPlan(p)}
              className={`h-14 rounded-2xl border-2 text-sm font-semibold transition ${
                selected
                  ? "border-rose-500 bg-white text-rose-600"
                  : "border-amber-300 bg-white text-neutral-800 hover:bg-amber-50"
              }`}
              aria-pressed={selected}
            >
              {p}
            </motion.button>
          )
        })}
      </div>

      <Button
        onClick={subscribe}
        disabled={loading}
        className="mt-6 h-14 w-full rounded-2xl bg-rose-500 text-lg font-semibold hover:bg-rose-500/90"
      >
        {loading ? "Subscribing…" : "Subscribe Now"}
      </Button>

      <p className="mt-4 text-center text-xs text-neutral-500">
        Telco billing will be initiated during subscription. This is a demo stub for integration.
      </p>
    </div>
  )
}
