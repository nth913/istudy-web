// lib/hooks/__tests__/useResponsiveCount.test.tsx
import { describe, it, expect, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useResponsiveCount } from '../useResponsiveCount'

function setWidth(w: number) {
  Object.defineProperty(window, 'innerWidth', { value: w, configurable: true, writable: true })
  act(() => { window.dispatchEvent(new Event('resize')) })
}
afterEach(() => setWidth(1024))

describe('useResponsiveCount', () => {
  it('returns max on desktop (>=768)', () => {
    setWidth(1200)
    const { result } = renderHook(() => useResponsiveCount(3))
    expect(result.current).toBe(3)
  })
  it('reduces by 1 on phones (<420), min 2', () => {
    setWidth(390)
    const { result } = renderHook(() => useResponsiveCount(3))
    expect(result.current).toBe(2)
    setWidth(390)
    const { result: r2 } = renderHook(() => useResponsiveCount(2))
    expect(r2.current).toBe(2) // clamp min 2
  })
  it('tablet (420-767): max-1 only when max>3', () => {
    setWidth(600)
    const { result } = renderHook(() => useResponsiveCount(5))
    expect(result.current).toBe(4)
    setWidth(600)
    const { result: r2 } = renderHook(() => useResponsiveCount(3))
    expect(r2.current).toBe(3)
  })
})
