"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQ() {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">FAQ</h2>
        <p className="mt-2 text-neutral-700">Answers to common questions.</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="rounded-2xl bg-white p-2 shadow">
          <AccordionItem value="q1">
            <AccordionTrigger className="px-3 text-left text-base font-semibold">
              How many questions per session?
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
              Each session has up to 8 questions. One wrong answer or a timeout ends the session immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q2">
            <AccordionTrigger className="px-3 text-left text-base font-semibold">
              How do streaks and bonuses work?
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
              Every correct answer adds to your streak. At 3 in a row you get a +5 bonus, and at 5+ you get a +10 bonus
              on top of the base +10 points per correct answer.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q3">
            <AccordionTrigger className="px-3 text-left text-base font-semibold">Is there a timer?</AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
              Yes. You have 10 seconds to answer each question. A shrinking progress bar shows your remaining time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q4">
            <AccordionTrigger className="px-3 text-left text-base font-semibold">
              How do I appear on the leaderboard?
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
              Earn points by answering correctly. Your total points determine your rank. Keep playing to climb!
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="q5">
            <AccordionTrigger className="px-3 text-left text-base font-semibold">
              Do I need a subscription to play?
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3 text-sm text-neutral-700">
              Yes. Subscribing unlocks gameplay. In this demo, subscription is simulated; in production, telco billing
              would be integrated.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}