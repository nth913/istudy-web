'use client'
import { useEffect, useRef } from 'react'

type RefType = 'exam' | 'post' | 'event' | 'book'

interface Props {
  refType: RefType
  refId: string
  delayMs?: number
}

const cmsBase = () =>
  process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3131'

export function ViewTracker({ refType, refId, delayMs = 3000 }: Props) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    if (typeof document === 'undefined') return

    const timer = setTimeout(() => {
      if (fired.current) return
      if (document.visibilityState !== 'visible') return
      fired.current = true

      const url = `${cmsBase()}/api/track-view`
      const payload = JSON.stringify({ refType, refId })

      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' })
        navigator.sendBeacon(url, blob)
        return
      }

      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }, delayMs)

    return () => clearTimeout(timer)
  }, [refType, refId, delayMs])

  return null
}
