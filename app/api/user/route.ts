import { getDB } from "@/lib/mock-db"

export async function GET() {
  const db = getDB()
  return Response.json(db.user)
}
