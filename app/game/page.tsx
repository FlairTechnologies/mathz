"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Spinner from "@/components/spinner"
import ResultModal from "@/components/result-modal"
import AnswerButton from "@/components/answer-button"
import { useSound } from "@/hooks/use-sound"

type Question = {
  id: string
  prompt: string
  options: number[]
}
type AnswerResult = {
  correct: boolean
  pointsDelta: number
  totalPoints: number
  streak: number
  bonus: number
  sessionActive: boolean
}

const MAX_QUESTIONS = 8
const ROUND_SECONDS = 10

export default function GamePage() {
  const router = useRouter()
  const { playCorrect, playWrong, playComplete } = useSound()

  const [checking, setChecking] = useState(true)
  const [question, setQuestion] = useState<Question | null>(null)
  const [loadingQ, setLoadingQ] = useState(false)
  const [answering, setAnswering] = useState(false)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [points, setPoints] = useState<number>(0)

  // session state
  const [currentIndex, setCurrentIndex] = useState(1) // 1..8
  const [sessionActive, setSessionActive] = useState(true)
  const [sessionFailed, setSessionFailed] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStartPoints, setSessionStartPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lastBonus, setLastBonus] = useState(0)

  // visual feedback
  const [feedback, setFeedback] = useState<"none" | "pulse" | "shake">("none")

  // result modal
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"correct" | "failed" | "complete">("correct")

  // Verify subscription and load initial data
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [statusRes, userRes, qRes] = await Promise.all([
          fetch("/api/status", { cache: "no-store" }),
          fetch("/api/user", { cache: "no-store" }),
          fetch("/api/question", { cache: "no-store" }),
        ])
        const status = (await statusRes.json()) as { subscribed: boolean }
        if (!status.subscribed) {
          router.replace("/subscription")
          return
        }
        const user = (await userRes.json()) as { points: number }
        const q = (await qRes.json()) as Question
        if (!cancelled) {
          setPoints(user.points)
          setSessionStartPoints(user.points)
          setQuestion(q)
          setTimeLeft(ROUND_SECONDS)
          setChecking(false)
          setSessionActive(true)
          setStreak(0)
        }
      } catch (e) {
        console.error(e)
        setChecking(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [router])

  // Countdown timer
  const timerRef = useRef<number | null>(null)
  useEffect(() => {
    if (!question || !sessionActive) return
    setTimeLeft(ROUND_SECONDS)
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 0.1) {
          window.clearInterval(timerRef.current!)
          // Time's up -> trigger wrong
          handleTimeout()
          return 0
        }
        return +(t - 0.1).toFixed(1)
      })
    }, 100)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [question, sessionActive])

  const percent = useMemo(() => Math.max(0, Math.min(100, (timeLeft / ROUND_SECONDS) * 100)), [timeLeft])

  async function fetchNextQuestion() {
    setLoadingQ(true)
    try {
      const res = await fetch("/api/question", { cache: "no-store" })
      const q = (await res.json()) as Question
      setQuestion(q)
      setAnswering(false)
      setResult(null)
      setLastBonus(0)
      setFeedback("none")
      setModalOpen(false)
    } finally {
      setLoadingQ(false)
    }
  }

  async function submitAnswer(value: number | null) {
    if (!question || answering || !sessionActive) return
    setAnswering(true)
    if (timerRef.current) window.clearInterval(timerRef.current)
    try {
      const res = await fetch("/api/answer", {
        method: "POST",
        body: JSON.stringify({ questionId: question.id, answer: value }),
      })
      const data = (await res.json()) as AnswerResult
      setResult(data)
      setPoints(data.totalPoints)
      setStreak(data.streak)
      setLastBonus(data.bonus)
      setSessionActive(data.sessionActive)

      if (!data.correct) {
        // session ends immediately on fail
        setSessionFailed(true)
        setModalMode("failed")
        setFeedback("shake")
        setModalOpen(true)
        playWrong()
      } else if (currentIndex === MAX_QUESTIONS) {
        // complete!
        setSessionComplete(true)
        setModalMode("complete")
        setFeedback("pulse")
        setModalOpen(true)
        playComplete()
      } else {
        // correct, continue
        setModalMode("correct")
        setFeedback("pulse")
        setModalOpen(true)
        playCorrect()
      }
    } catch (e) {
      console.error(e)
      // treat as fail
      setResult({
        correct: false,
        pointsDelta: 0,
        totalPoints: points,
        streak: 0,
        bonus: 0,
        sessionActive: false,
      })
      setSessionActive(false)
      setSessionFailed(true)
      setModalMode("failed")
      setFeedback("shake")
      setModalOpen(true)
      playWrong()
    }
  }

  function handleTimeout() {
    submitAnswer(null)
  }

  function handleNextFromCorrect() {
    // move to next question index and fetch new one
    setCurrentIndex((i) => Math.min(MAX_QUESTIONS, i + 1))
    fetchNextQuestion()
  }

  async function handleRestartSession() {
    // reset server-side session streak/active as well
    try {
      await fetch("/api/session/reset", { method: "POST" })
    } catch {}
    setCurrentIndex(1)
    setSessionActive(true)
    setSessionFailed(false)
    setSessionComplete(false)
    setModalOpen(false)
    setStreak(0)
    setLastBonus(0)
    setFeedback("none")
    // fetch a fresh question
    fetchNextQuestion()
  }

  function handleGoLeaderboard() {
    setModalOpen(false)
    router.push("/leaderboard")
  }

  if (checking) {
    return (
      <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
        <div className="flex h-[100dvh] items-center justify-center">
          <Spinner label="Loading game..." />
        </div>
      </main>
    )
  }

  // Variants for question card feedback
  const cardVariants = {
    initial: { y: 16, opacity: 0, scale: 1 },
    enter: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
    pulse: { scale: [1, 1.03, 1], transition: { duration: 0.35 } },
    shake: {
      x: [0, -6, 6, -4, 4, -2, 2, 0],
      transition: { duration: 0.4 },
    },
  } as const

  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <div className="mx-auto max-w-md px-4 pb-8 pt-4">
        <header className="mb-2 flex items-center justify-between">
          <Button
            variant="ghost"
            className="rounded-xl text-base hover:bg-amber-100"
            onClick={() => router.push("/start")}
          >
            {"←"} Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">
              Q {currentIndex}/{MAX_QUESTIONS}
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold shadow">Streak: {streak}</div>
            <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold shadow">Points: {points}</div>
          </div>
        </header>

        {/* Timer */}
        <div className="mb-4 h-3 w-full overflow-hidden rounded-full bg-white shadow-inner">
          <motion.div
            className="relative h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-500"
            initial={{ width: "100%" }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          >
            <AnimatePresence>
              {feedback === "pulse" && (
                <motion.span
                  key="timer-glow"
                  className="absolute inset-0 rounded-full ring-2 ring-rose-400/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Question */}
        <motion.div
          key={question?.id ?? "loading"}
          variants={cardVariants}
          initial="initial"
          animate={feedback === "shake" ? "shake" : "enter"}
          className="relative mt-4 rounded-2xl bg-white p-6 text-center shadow"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">Solve:</h1>
          <div className="mt-2 text-5xl font-black text-neutral-900">
            {loadingQ || !question ? <span className="opacity-30">{"…"}</span> : question.prompt}
          </div>

          <AnimatePresence>
            {feedback === "pulse" && (
              <motion.div
                key="correct-ring"
                className="pointer-events-none absolute inset-0 rounded-2xl ring-4 ring-emerald-400/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Answers */}
        <div className="mt-6 grid grid-cols-1 gap-3">
          {!question ? (
            <div className="rounded-2xl bg-white p-6 text-center shadow">
              <Spinner label="Getting question..." />
            </div>
          ) : (
            question.options.map((opt, idx) => (
              <AnswerButton
                key={`${opt}-${idx}`}
                label={String(opt)}
                disabled={answering || !sessionActive}
                onClick={() => submitAnswer(opt)}
              />
            ))
          )}
        </div>

        {/* Session Modals */}
        <ResultModal
          open={modalOpen}
          mode={modalMode}
          correct={!!result?.correct}
          pointsDelta={result?.pointsDelta ?? 0}
          questionsAnswered={currentIndex}
          maxQuestions={MAX_QUESTIONS}
          onClose={() => setModalOpen(false)}
          onNext={() => handleNextFromCorrect()}
          onRestart={() => handleRestartSession()}
          onLeaderboard={() => handleGoLeaderboard()}
          sessionPointsDelta={points - sessionStartPoints}
          streak={streak}
          bonus={lastBonus}
        />
      </div>
    </main>
  )
}
