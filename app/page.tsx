import SubscriptionScreen from "@/components/subscription-screen"
import { redirect } from "next/navigation"

export default async function Page() {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/status`, {
  //   cache: "no-store",
  // })
  // const data = (await res.json()) as { subscribed: boolean }
  // if (data.subscribed) {
  //   redirect("/start")
  // }
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <SubscriptionScreen />
    </main>
  )
}
