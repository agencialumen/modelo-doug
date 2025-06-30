"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

interface HeartAnimationProps {
  hearts: Array<{
    id: string
    x: number
    y: number
  }>
  onHeartComplete: (id: string) => void
}

export default function HeartAnimation({ hearts, onHeartComplete }: HeartAnimationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: heart.x - 25,
              top: heart.y - 25,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1, 0],
              y: [0, -50, -100],
              rotate: [0, -10, 10, -5, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 2,
              ease: "easeOut",
              times: [0, 0.2, 0.4, 1],
            }}
            onAnimationComplete={() => onHeartComplete(heart.id)}
          >
            <Heart
              size={50}
              className="text-red-500 fill-red-500 drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
