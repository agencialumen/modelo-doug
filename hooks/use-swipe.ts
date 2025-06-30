"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface SwipeInput {
  onSwipedLeft: () => void
  onSwipedRight: () => void
  onSwipedUp?: () => void
  onSwipedDown?: () => void
  onDoubleTap?: (event: React.TouchEvent) => void
}

interface SwipeOutput {
  onTouchStart: (event: React.TouchEvent) => void
  onTouchMove: (event: React.TouchEvent) => void
  onTouchEnd: () => void
}

export const useSwipe = (input: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)
  const [lastTap, setLastTap] = useState<number>(0)

  const minSwipeDistance = 50
  const doubleTapDelay = 300

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    })
  }, [])

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    setTouchEnd({
      x: event.targetTouches[0].clientX,
      y: event.targetTouches[0].clientY,
    })
  }, [])

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (!touchStart || !touchEnd) {
        // Handle potential double-tap
        const now = Date.now()
        if (lastTap && now - lastTap < doubleTapDelay && input.onDoubleTap) {
          input.onDoubleTap(event)
          setLastTap(0)
          return
        }
        setLastTap(now)
        return
      }

      const distanceX = touchStart.x - touchEnd.x
      const distanceY = touchStart.y - touchEnd.y
      const isLeftSwipe = distanceX > minSwipeDistance
      const isRightSwipe = distanceX < -minSwipeDistance
      const isUpSwipe = distanceY > minSwipeDistance
      const isDownSwipe = distanceY < -minSwipeDistance

      // Only trigger horizontal swipes if they're more significant than vertical
      if (Math.abs(distanceX) > Math.abs(distanceY)) {
        if (isLeftSwipe) {
          input.onSwipedLeft()
        } else if (isRightSwipe) {
          input.onSwipedRight()
        }
      } else {
        // Handle vertical swipes if callbacks are provided
        if (isUpSwipe && input.onSwipedUp) {
          input.onSwipedUp()
        } else if (isDownSwipe && input.onSwipedDown) {
          input.onSwipedDown()
        }
      }
    },
    [touchStart, touchEnd, lastTap, input],
  )

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  }
}
