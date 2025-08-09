import { getDB, upsertYourScore } from "@/lib/mock-db"

function bonusForStreak(streak: number) {
  // Streak is after increment on correct
  if (streak >= 5) return 10
  if (streak >= 3) return 5
  return 0
}

export async function POST(request: Request) {
  const db = getDB()
  try {
    const body = (await request.json()) as { questionId: string; answer: number | null }
    const correctAnswer = db.questions[body.questionId]
    const isCorrect = body.answer !== null && correctAnswer === body.answer

    let delta = 0
    let streak = db.session.streak
    let active = db.session.active

    if (!active) {
      // Session already inactive: no points change, keep inactive
      return Response.json({
        correct: false,
        pointsDelta: 0,
        totalPoints: db.user.points,
        streak,
        bonus: 0,
        sessionActive: active,
      })
    }

    if (isCorrect) {
      streak = streak + 1
      const bonus = bonusForStreak(streak)
      delta = 10 + bonus
      db.user.points += delta
      db.session.streak = streak
      // keep active
      upsertYourScore(db.user.points)
      // Cleanup stored answer to avoid leaks
      delete db.questions[body.questionId]
      return Response.json({
        correct: true,
        pointsDelta: delta,
        totalPoints: db.user.points,
        streak,
        bonus,
        sessionActive: true,
      })
    } else {
      // Wrong: end session
      db.session.active = false
      db.session.streak = 0
      active = false
      // Cleanup stored answer
      delete db.questions[body.questionId]
      return Response.json({
        correct: false,
        pointsDelta: 0,
        totalPoints: db.user.points,
        streak: 0,
        bonus: 0,
        sessionActive: active,
      })
    }
  } catch (e) {
    // Treat as fail, end session
    db.session.active = false
    db.session.streak = 0
    return Response.json(
      { correct: false, pointsDelta: 0, totalPoints: db.user.points, streak: 0, bonus: 0, sessionActive: false },
      { status: 200 },
    )
  }
}
