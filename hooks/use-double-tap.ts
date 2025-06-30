"use client"

import type React from "react"

import { useCallback, useRef } from "react"

interface DoubleTapOptions {
  onDoubleTap: (event: React.TouchEvent | React.MouseEvent) => void
  delay?: number
}

export const useDoubleTap = ({ onDoubleTap, delay = 300 }: DoubleTapOptions) => {
  const clickCount = useRef(0)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)

  const handleClick = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      clickCount.current += 1

      if (clickCount.current === 1) {
        clickTimer.current = setTimeout(() => {
          clickCount.current = 0
        }, delay)
      } else if (clickCount.current === 2) {
        if (clickTimer.current) {
          clearTimeout(clickTimer.current)
        }
        clickCount.current = 0
        onDoubleTap(event)
      }
    },
    [onDoubleTap, delay],
  )

  return handleClick
}
