"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function ResultModal({
  open = false,
  mode = "correct",
  correct = false,
  pointsDelta = 0,
  sessionPointsDelta = 0,
  questionsAnswered = 1,
  maxQuestions = 8,
  streak = 0,
  bonus = 0,
  onClose = () => {},
  onNext = () => {},
  onRestart = () => {},
  onLeaderboard = () => {},
}: {
  open?: boolean
  mode?: "correct" | "failed" | "complete"
  correct?: boolean
  pointsDelta?: number
  sessionPointsDelta?: number
  questionsAnswered?: number
  maxQuestions?: number
  streak?: number
  bonus?: number
  onClose?: () => void
  onNext?: () => void
  onRestart?: () => void
  onLeaderboard?: () => void
} = {}) {
  const isFailed = mode === "failed"
  const isComplete = mode === "complete"

  const title = isFailed ? "Wrong!" : isComplete ? "Session Complete!" : "Correct!"
  const badgeColor = isFailed ? "bg-rose-500" : "bg-emerald-500"
  const badgeIcon = isFailed ? "×" : "✓"

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div
                className={`mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white ${badgeColor}`}
              >
                {badgeIcon}
              </div>
              <h2 className="text-2xl font-extrabold">{title}</h2>

              {!isComplete && !isFailed ? (
                <div className="mt-1 text-neutral-700">
                  <p>
                    Points earned: <span className="font-bold">{pointsDelta}</span>{" "}
                    {bonus > 0 ? (
                      <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        +{bonus} streak bonus! (streak {streak})
                      </span>
                    ) : null}
                  </p>
                </div>
              ) : null}

              {isFailed ? (
                <p className="mt-1 text-neutral-600">Session ended. You can restart or view the leaderboard.</p>
              ) : null}

              {isComplete ? (
                <div className="mt-1 text-neutral-700">
                  <p className="">
                    You answered {questionsAnswered}/{maxQuestions} correctly in this session.
                  </p>
                  <p className="">
                    Session points gained: <span className="font-bold">{sessionPointsDelta}</span>
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {isFailed ? (
                <>
                  <Button
                    className="h-12 rounded-xl bg-rose-500 font-semibold hover:bg-rose-500/90"
                    onClick={onRestart}
                  >
                    Restart
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-amber-300 bg-white font-semibold hover:bg-amber-50"
                    onClick={onLeaderboard}
                  >
                    Leaderboard
                  </Button>
                </>
              ) : isComplete ? (
                <>
                  <Button
                    className="h-12 rounded-xl bg-rose-500 font-semibold hover:bg-rose-500/90"
                    onClick={onRestart}
                  >
                    Play Again
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-amber-300 bg-white font-semibold hover:bg-amber-50"
                    onClick={onLeaderboard}
                  >
                    Leaderboard
                  </Button>
                </>
              ) : (
                <>
                  <Button className="h-12 rounded-xl bg-rose-500 font-semibold hover:bg-rose-500/90" onClick={onNext}>
                    Next Question
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-2 border-amber-300 bg-white font-semibold hover:bg-amber-50"
                    onClick={onRestart}
                  >
                    Restart
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
