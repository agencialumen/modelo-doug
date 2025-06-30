"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface LikeCounterProps {
  count: number
  isLiked: boolean
}

export default function LikeCounter({ count, isLiked }: LikeCounterProps) {
  return (
    <motion.div
      className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-2"
      initial={{ scale: 1 }}
      animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div animate={{ scale: isLiked ? [1, 1.3, 1] : 1 }} transition={{ duration: 0.3 }}>
        <Heart
          size={16}
          className={`transition-colors duration-300 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`}
        />
      </motion.div>
      <motion.span
        className="text-white text-sm font-medium"
        key={count}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
      >
        {count > 0 ? count : ""}
      </motion.span>
    </motion.div>
  )
}
