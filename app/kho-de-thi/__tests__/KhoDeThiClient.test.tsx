import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

const pushMock = vi.fn()
vi.mock('next/navigation', async () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/kho-de-thi',
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock('@/lib/api/exams', () => ({
  fetchExamsList: vi.fn(),
}))

import { fetchExamsList } from '@/lib/api/exams'
import { KhoDeThiClient } from '../KhoDeThiClient'

const mockItems = [
  {
    id: '1',
    slug: 'a',
    title: 'Đề A',
    category: 'vao-10',
    examType: 'chinh-thuc',
    year: '2026',
    createdAt: '2026-05-23',
    province: null,
    tags: {},
  },
  {
    id: '2',
    slug: 'b',
    title: 'Đề B',
    category: 'vao-10',
    examType: 'thi-thu',
    year: '2026',
    createdAt: '2026-05-23',
    province: null,
    tags: {},
  },
] as any

beforeEach(() => {
  pushMock.mockReset()
  vi.mocked(fetchExamsList).mockReset()
})

describe('KhoDeThiClient', () => {
  it('renders initial items', () => {
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={2} initialQuery={{}} sidebarGroups={[]} />)
    expect(screen.getByText('Đề A')).toBeInTheDocument()
    expect(screen.getByText('Đề B')).toBeInTheDocument()
  })

  it('sort dropdown push URL', () => {
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={2} initialQuery={{}} sidebarGroups={[]} />)
    fireEvent.change(screen.getByLabelText(/Sắp xếp/i), { target: { value: 'views' } })
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining('sort=views'))
  })

  it('view toggle changes layout class (local state, no push)', () => {
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={2} initialQuery={{}} sidebarGroups={[]} />)
    fireEvent.click(screen.getByLabelText(/Hiển thị dạng lưới/i))
    expect(document.querySelector('.year-block.is-grid')).toBeTruthy()
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('load-more appends items', async () => {
    vi.mocked(fetchExamsList).mockResolvedValueOnce({
      items: [
        {
          id: '3',
          slug: 'c',
          title: 'Đề C',
          category: 'vao-10',
          examType: 'chinh-thuc',
          year: '2026',
          createdAt: '2026-05-23',
          province: null,
          tags: {},
        } as any,
      ],
      total: 3,
      limit: 20,
      offset: 2,
    })
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={3} initialQuery={{}} sidebarGroups={[]} />)
    const btn = screen.getByText(/Lấy thêm/)
    fireEvent.click(btn)
    expect(await screen.findByText('Đề C')).toBeInTheDocument()
  })

  it('hides load-more when items.length >= total', () => {
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={2} initialQuery={{}} sidebarGroups={[]} />)
    expect(screen.queryByText(/Lấy thêm/)).toBeNull()
  })
})
