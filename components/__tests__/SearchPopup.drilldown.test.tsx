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
