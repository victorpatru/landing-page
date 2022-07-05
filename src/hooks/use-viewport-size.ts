import { useEffect, useRef, useState } from 'react'

import { isClient } from '~/lib/constants'

const CALL_THRESHOLD_MS = 500

export const useViewportSize = (
  { callTreshhold } = { callTreshhold: CALL_THRESHOLD_MS }
) => {
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
      resizeTimeout.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }, callTreshhold)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)

      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current)
      }
    }
  }, [])

  return windowSize
}
