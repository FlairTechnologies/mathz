import { resetSession } from "@/lib/mock-db"

export async function POST() {
  resetSession()
  return Response.json({ ok: true, sessionActive: true, streak: 0 })
}
