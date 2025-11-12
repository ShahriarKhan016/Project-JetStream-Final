import { useEffect, useRef } from 'react'

interface SwipeCallbacks {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface SwipeOptions {
  threshold?: number // Minimum distance to trigger swipe (default: 50px)
  timeout?: number // Maximum time for swipe (default: 300ms)
}

export const useSwipeGesture = (
  callbacks: SwipeCallbacks,
  options: SwipeOptions = {}
) => {
  const { threshold = 50, timeout = 300 } = options
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return

      const touch = e.changedTouches[0]
      const deltaX = touch.clientX - touchStartRef.current.x
      const deltaY = touch.clientY - touchStartRef.current.y
      const deltaTime = Date.now() - touchStartRef.current.time

      // Check if swipe was fast enough
      if (deltaTime > timeout) {
        touchStartRef.current = null
        return
      }

      // Check if swipe was long enough
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)

      if (absX < threshold && absY < threshold) {
        touchStartRef.current = null
        return
      }

      // Determine swipe direction
      if (absX > absY) {
        // Horizontal swipe
        if (deltaX > 0) {
          callbacks.onSwipeRight?.()
        } else {
          callbacks.onSwipeLeft?.()
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          callbacks.onSwipeDown?.()
        } else {
          callbacks.onSwipeUp?.()
        }
      }

      touchStartRef.current = null
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [callbacks, threshold, timeout])
}
