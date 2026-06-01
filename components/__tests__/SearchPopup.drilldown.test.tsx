import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SearchPopup from '../SearchPopup'
import * as api from '@/lib/api/search'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/',
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}))

class MockIO {
  cb: IntersectionObserverCallback
  constructor(cb: IntersectionObserverCallback) { this.cb = cb; (globalThis as any).__lastIO = this }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return [] }
  trigger() { this.cb([{ isIntersecting: true } as IntersectionObserverEntry], this as any) }
}
;(globalThis as any).IntersectionObserver = MockIO as any

const resp = (over = {}) => ({
  thpt: Array.from({ length: 8 }, (_, i) => ({ id: `t${i}`, cat: 'thpt', href: '#', title: `Đề ${i}`, meta: [], year: '2025' })),
  l10: [], hsa: [], blog: [], order: ['thpt','l10','hsa','blog'], total: 8,
  counts: { thpt: 12, l10: 0, hsa: 0, blog: 0 }, ...over,
})
beforeEach(() => {
  vi.spyOn(api, 'fetchSearchMeta').mockResolvedValue({ trending: [], popularTags: [], provinces: [], featured: null })
  vi.spyOn(api, 'fetchSearch').mockResolvedValue(resp() as any)
  vi.spyOn(api, 'fetchDrilldown').mockResolvedValue({ items: resp().thpt as any, total: 12, hasMore: false, facets: { years: [{ year: '2025', count: 12 }] } })
})

it('"Xem thêm N" uses counts (12-3=9), not array length', async () => {
  render(<SearchPopup open onOpen={() => {}} onClose={() => {}} />)
  fireEvent.change(screen.getByPlaceholderText(/Tìm theo/), { target: { value: 'de' } })
  expect(await screen.findByText(/Xem thêm 9 kết quả/)).toBeInTheDocument()
})

it('click "Xem thêm" enters drill-down (back bar + breadcrumb count), calls fetchDrilldown', async () => {
  render(<SearchPopup open onOpen={() => {}} onClose={() => {}} />)
  fireEvent.change(screen.getByPlaceholderText(/Tìm theo/), { target: { value: 'de' } })
  fireEvent.click(await screen.findByText(/Xem thêm 9 kết quả/))
  expect(await screen.findByText(/Tất cả kết quả/)).toBeInTheDocument()
  await waitFor(() => expect(api.fetchDrilldown).toHaveBeenCalledWith(expect.objectContaining({ cat: 'thpt', facets: true }), expect.anything()))
  expect(screen.getByText(/12 kết quả cho/)).toBeInTheDocument()
})

it('changing year refetches page 1 with year param', async () => {
  render(<SearchPopup open onOpen={() => {}} onClose={() => {}} />)
  fireEvent.change(screen.getByPlaceholderText(/Tìm theo/), { target: { value: 'de' } })
  fireEvent.click(await screen.findByText(/Xem thêm 9 kết quả/))
  await screen.findByText(/Tất cả kết quả/)
  vi.mocked(api.fetchDrilldown).mockClear()
  fireEvent.click(await screen.findByText('2025'))
  await waitFor(() => expect(api.fetchDrilldown).toHaveBeenCalledWith(expect.objectContaining({ year: '2025', offset: 0 }), expect.anything()))
})

it('appends on loadMore (hasMore=true)', async () => {
  vi.mocked(api.fetchDrilldown)
    .mockResolvedValueOnce({ items: [{ id: 'a', cat: 'thpt', href: '#', title: 'A', meta: [], year: '2025' }], total: 2, hasMore: true } as any)
    .mockResolvedValueOnce({ items: [{ id: 'b', cat: 'thpt', href: '#', title: 'B', meta: [], year: '2024' }], total: 2, hasMore: false } as any)
  render(<SearchPopup open onOpen={() => {}} onClose={() => {}} />)
  fireEvent.change(screen.getByPlaceholderText(/Tìm theo/), { target: { value: 'de' } })
  fireEvent.click(await screen.findByText(/Xem thêm 9 kết quả/))
  await screen.findByText('A')
  ;(globalThis as any).__lastIO?.trigger()
  expect(await screen.findByText('B')).toBeInTheDocument()
})

it('quick-filter chip shows uncapped count from results.counts (12, not 8)', async () => {
  render(<SearchPopup open onOpen={() => {}} onClose={() => {}} />)
  fireEvent.change(screen.getByPlaceholderText(/Tìm theo/), { target: { value: 'de' } })
  // wait for results
  await screen.findByText(/Xem thêm 9 kết quả/)
  // the THPT quick-filter chip should show 12 (uncapped), not 8 (array length)
  const chip = screen.getByRole('button', { name: /Đề THPT/ })
  expect(chip).toHaveTextContent('12')
})
