"use client"

import { motion } from "framer-motion"

export default function AnswerButton({
  label = "0",
  onClick = () => {},
  disabled = false,
}: {
  label?: string
  onClick?: () => void
  disabled?: boolean
} = {}) {
  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`h-16 rounded-2xl bg-white text-xl font-semibold shadow transition hover:bg-amber-50 active:shadow-sm ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {label}
    </motion.button>
  )
}
