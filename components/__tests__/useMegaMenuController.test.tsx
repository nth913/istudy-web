import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMegaMenuController } from '../MegaMenu'

describe('useMegaMenuController suppression', () => {
  it('open() no-ops when suppressed', () => {
    const { result } = renderHook(({ s }) => useMegaMenuController(s), { initialProps: { s: true } })
    act(() => result.current.open('kho-de'))
    expect(result.current.openKey).toBeNull()
  })
  it('auto-closes when suppression turns on', () => {
    const { result, rerender } = renderHook(({ s }) => useMegaMenuController(s), { initialProps: { s: false } })
    act(() => result.current.open('kho-de'))
    expect(result.current.openKey).toBe('kho-de')
    rerender({ s: true })
    expect(result.current.openKey).toBeNull()
  })
  it('opens normally when not suppressed', () => {
    const { result } = renderHook(({ s }) => useMegaMenuController(s), { initialProps: { s: false } })
    act(() => result.current.open('kho-de'))
    expect(result.current.openKey).toBe('kho-de')
  })
})
