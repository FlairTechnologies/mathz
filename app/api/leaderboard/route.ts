import { getDB } from "@/lib/mock-db"

export async function GET() {
  const db = getDB()
  // Return top 10
  return Response.json(db.leaderboard.slice(0, 10))
}
