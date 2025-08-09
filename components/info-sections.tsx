"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function InfoSections() {
  return (
    <div className="mx-auto max-w-md">
      <Accordion type="single" collapsible className="rounded-2xl bg-white p-2 shadow">
        <AccordionItem value="how-to-play">
          <AccordionTrigger className="px-3 text-base font-semibold">How to Play</AccordionTrigger>
          <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
            - You have 10 seconds per question.{"\n"}- Tap one of the four answers.{"\n"}- Each correct answer gives you
            +10 points.{"\n"}- Answer up to 8 questions per session.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="session-rules">
          <AccordionTrigger className="px-3 text-base font-semibold">Session Rules</AccordionTrigger>
          <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
            - A single wrong answer (or timeout) cancels your current session.{"\n"}- On cancel, you can Restart or view
            the Leaderboard.{"\n"}- Complete a session by answering 8 questions in a row correctly.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scoring">
          <AccordionTrigger className="px-3 text-base font-semibold">Scoring</AccordionTrigger>
          <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
            - +10 points for each correct answer.{"\n"}- Points persist across sessions.{"\n"}- Climb the leaderboard
            with consistent streaks.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tips">
          <AccordionTrigger className="px-3 text-base font-semibold">Tips</AccordionTrigger>
          <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
            - Read carefully and trust your first instinct.{"\n"}- If unsure, restart quickly to build a new streak.
            {"\n"}- Practice daily to improve speed and accuracy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subscription">
          <AccordionTrigger className="px-3 text-base font-semibold">Subscription & Telco</AccordionTrigger>
          <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
            - Subscribing unlocks gameplay.{"\n"}- Carrier billing starts when you tap Subscribe (demo stub).{"\n"}-
            Contact support for billing issues.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
