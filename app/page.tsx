import LandingHero from "@/components/landing-hero"
import HowItWorks from "@/components/how-it-works"
import LeaderboardPreview from "@/components/leaderboard-preview"
import HowToPlay from "@/components/how-to-play"
import FAQ from "@/components/faq"

export default function Page() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-br from-amber-50 to-rose-50">
      <LandingHero />

      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <HowItWorks />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <HowToPlay />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <LeaderboardPreview />
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <FAQ />
      </section>

      <footer className="mt-8 border-t border-amber-100/60 bg-white/60">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-xs text-neutral-600">
          {"© "} {new Date().getFullYear()} {"Mathz · A fun, fast math challenge game."}
        </div>
      </footer>
    </main>
  )
}
