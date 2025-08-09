type Leader = { id: string; name: string; points: number }
type QuestionStore = Record<string, number> // questionId -> correct answer
type Session = {
  active: boolean
  streak: number
}
type DB = {
  subscribed: boolean
  plan: "Daily" | "Weekly" | "Monthly" | null
  user: { id: string; name: string; points: number }
  leaderboard: Leader[]
  questions: QuestionStore
  session: Session
}

declare global {
  // eslint-disable-next-line no-var
  var __MATHZ_DB__: DB | undefined
}

function seedLeaders(): Leader[] {
  const names = [
    "Ada",
    "Grace",
    "Alan",
    "Katherine",
    "Edsger",
    "Evelyn",
    "Donald",
    "Barbara",
    "Linus",
    "Tim",
    "Guido",
    "Margaret",
  ]
  const arr = Array.from({ length: 10 }, (_, i) => ({
    id: `p${i + 1}`,
    name: names[i] ?? `Player ${i + 1}`,
    points: Math.floor(100 + Math.random() * 900),
  }))
  return arr.sort((a, b) => b.points - a.points).slice(0, 10)
}

export function getDB(): DB {
  if (!globalThis.__MATHZ_DB__) {
    globalThis.__MATHZ_DB__ = {
      subscribed: false,
      plan: null,
      user: { id: "you", name: "You", points: 0 },
      leaderboard: seedLeaders(),
      questions: {},
      session: {
        active: true,
        streak: 0,
      },
    }
  }
  return globalThis.__MATHZ_DB__!
}

export function resetSession() {
  const db = getDB()
  db.session.active = true
  db.session.streak = 0
}

export function upsertYourScore(points: number) {
  const db = getDB()
  const youIndex = db.leaderboard.findIndex((l) => l.id === db.user.id)
  if (youIndex >= 0) {
    db.leaderboard[youIndex].points = points
  } else {
    db.leaderboard.push({ id: db.user.id, name: db.user.name, points })
  }
  db.leaderboard = db.leaderboard.sort((a, b) => b.points - a.points).slice(0, 10)
}
