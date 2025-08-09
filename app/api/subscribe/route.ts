import { getDB } from "@/lib/mock-db"

export async function POST(request: Request) {
  const db = getDB()
  try {
    const body = (await request.json().catch(() => ({}))) as { plan?: "Daily" | "Weekly" | "Monthly" }
    // In a real telco integration, initiate carrier billing flow here and verify callbacks.
    db.subscribed = true
    db.plan = (body.plan as any) ?? "Daily"
    return Response.json({ ok: true, plan: db.plan }, { status: 201 })
  } catch (e) {
    return Response.json({ ok: false, error: "Failed to subscribe" }, { status: 500 })
  }
}
