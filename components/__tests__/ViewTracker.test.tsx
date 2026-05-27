import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ViewTracker } from '../ViewTracker'

const ORIGINAL_CMS_URL = process.env.NEXT_PUBLIC_CMS_URL

function setVisibility(state: 'visible' | 'hidden') {
  Object.defineProperty(document, 'visibilityState', {
    value: state,
    configurable: true,
  })
}

beforeEach(() => {
  vi.useFakeTimers()
  process.env.NEXT_PUBLIC_CMS_URL = 'http://test-cms.local'
  setVisibility('visible')
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
  process.env.NEXT_PUBLIC_CMS_URL = ORIGINAL_CMS_URL
})

describe('ViewTracker', () => {
  it('fires sendBeacon after delay when visible', () => {
    const beacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon: beacon })

    render(<ViewTracker refType="exam" refId="abc123" />)
    vi.advanceTimersByTime(3000)

    expect(beacon).toHaveBeenCalledTimes(1)
    const [url, blob] = beacon.mock.calls[0]
    expect(url).toBe('http://test-cms.local/api/track-view')
    expect(blob).toBeInstanceOf(Blob)
    expect((blob as Blob).type).toBe('application/json')
  })

  it('does not fire when document is hidden', () => {
    const beacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon: beacon })
    setVisibility('hidden')

    render(<ViewTracker refType="post" refId="p1" />)
    vi.advanceTimersByTime(3000)

    expect(beacon).not.toHaveBeenCalled()
  })

  it('does not fire when unmounted before delay', () => {
    const beacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon: beacon })

    const { unmount } = render(<ViewTracker refType="event" refId="ev1" />)
    vi.advanceTimersByTime(1000)
    unmount()
    vi.advanceTimersByTime(5000)

    expect(beacon).not.toHaveBeenCalled()
  })

  it('does not double-fire on re-render with same props', () => {
    const beacon = vi.fn().mockReturnValue(true)
    vi.stubGlobal('navigator', { sendBeacon: beacon })

    const { rerender } = render(<ViewTracker refType="book" refId="b1" />)
    vi.advanceTimersByTime(3000)
    rerender(<ViewTracker refType="book" refId="b1" />)
    vi.advanceTimersByTime(3000)

    expect(beacon).toHaveBeenCalledTimes(1)
  })

  it('falls back to fetch when sendBeacon unavailable', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}'))
    vi.stubGlobal('navigator', { sendBeacon: undefined })
    vi.stubGlobal('fetch', fetchMock)

    render(<ViewTracker refType="exam" refId="abc123" />)
    vi.advanceTimersByTime(3000)

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('http://test-cms.local/api/track-view')
    expect(init).toMatchObject({
      method: 'POST',
      credentials: 'include',
      keepalive: true,
    })
    expect(JSON.parse(init.body)).toEqual({ refType: 'exam', refId: 'abc123' })
  })
})
