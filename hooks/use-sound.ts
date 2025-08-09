"use client"

import { useCallback, useEffect, useRef } from "react"

function createOsc(ctx: AudioContext, freq: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.value = 0.001
  osc.connect(gain).connect(ctx.destination)
  return { osc, gain }
}

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Lazy init on first interaction; some browsers require a user gesture
    const resume = () => {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (ctxRef.current.state === "suspended") {
        ctxRef.current.resume().catch(() => {})
      }
    }
    window.addEventListener("pointerdown", resume, { once: true })
    return () => {
      window.removeEventListener("pointerdown", resume)
    }
  }, [])

  const playCorrect = useCallback(() => {
    const ctx = ctxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)()
    ctxRef.current = ctx
    const { osc, gain } = createOsc(ctx, 880, "sine")
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
    osc.start(now)
    osc.stop(now + 0.14)
  }, [])

  const playWrong = useCallback(() => {
    const ctx = ctxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)()
    ctxRef.current = ctx
    const { osc, gain } = createOsc(ctx, 220, "square")
    const now = ctx.currentTime
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.01)
    // quick down sweep
    osc.frequency.setValueAtTime(300, now)
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28)
    osc.start(now)
    osc.stop(now + 0.3)
  }, [])

  const playComplete = useCallback(() => {
    const ctx = ctxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)()
    ctxRef.current = ctx
    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5
    notes.forEach((freq, i) => {
      const { osc, gain } = createOsc(ctx, freq, "triangle")
      const t0 = now + i * 0.08
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(0.15, t0 + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18)
      osc.start(t0)
      osc.stop(t0 + 0.2)
    })
  }, [])

  return { playCorrect, playWrong, playComplete }
}
