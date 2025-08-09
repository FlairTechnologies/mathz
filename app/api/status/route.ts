import { getDB } from "@/lib/mock-db"

export async function GET() {
  const db = getDB()
  return Response.json({ subscribed: db.subscribed, plan: db.plan })
}
