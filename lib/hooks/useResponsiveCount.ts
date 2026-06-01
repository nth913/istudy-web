// lib/hooks/useResponsiveCount.ts
import { useEffect, useState } from 'react'

/** Co số gợi ý theo viewport. `max` = số desktop (đã = cap từ CMS config). */
export function useResponsiveCount(max: number): number {
  const [count, setCount] = useState(max)
  useEffect(() => {
    const compute = (): number => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024
      if (w < 420) return Math.max(2, max - 1)
      if (w < 768) return max > 3 ? max - 1 : max
      return max
    }
    const apply = () => setCount(compute())
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [max])
  return count
}
