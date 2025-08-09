import { getDB } from "@/lib/mock-db"

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateQuestion() {
  const a = randInt(1, 20)
  const b = randInt(1, 20)
  const ops = ["+", "-", "×"] as const
  const op = ops[randInt(0, ops.length - 1)]
  let correct = 0
  switch (op) {
    case "+":
      correct = a + b
      break
    case "-":
      correct = a - b
      break
    case "×":
      correct = a * b
      break
  }
  // Build options
  const options = new Set<number>([correct])
  while (options.size < 4) {
    const noise = randInt(-10, 10) || 1
    const val = correct + noise
    if (val >= -100 && val <= 400) options.add(val)
  }
  // Shuffle
  const opts = Array.from(options)
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((o) => o.v)

  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return { id, prompt: `${a} ${op} ${b} = ?`, options: opts, correct }
}

export async function GET() {
  const db = getDB()
  const q = generateQuestion()
  db.questions[q.id] = q.correct
  return Response.json({ id: q.id, prompt: q.prompt, options: q.options })
}
