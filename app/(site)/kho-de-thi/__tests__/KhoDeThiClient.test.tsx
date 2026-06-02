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
import { KhoDeThiClient, isSidebarItemActive } from '../KhoDeThiClient'

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

  it('default view is grid (year-block has is-grid class on mount)', () => {
    render(<KhoDeThiClient initialItems={mockItems} initialTotal={2} initialQuery={{}} sidebarGroups={[]} />)
    expect(document.querySelector('.year-block.is-grid')).toBeTruthy()
  })

  it('sidebar item gets active class when filterQuery matches initialQuery', () => {
    const groups = [
      {
        title: 'Danh mục',
        items: [
          { label: 'Vào 10', filterQuery: '?cat=vao-10', count: 5 },
          { label: 'THPT', filterQuery: '?cat=thpt', count: 3 },
        ],
      },
    ]
    render(
      <KhoDeThiClient
        initialItems={[]}
        initialTotal={0}
        initialQuery={{ cat: 'vao-10' }}
        sidebarGroups={groups}
      />,
    )
    const activeLink = screen.getByLabelText(/Lọc theo Vào 10/i)
    const inactiveLink = screen.getByLabelText(/Lọc theo THPT/i)
    expect(activeLink).toHaveClass('active')
    expect(inactiveLink).not.toHaveClass('active')
  })

  it('sidebar item active gets aria-current="true"', () => {
    const groups = [
      {
        title: 'Tỉnh',
        items: [{ label: 'Hà Nội', filterQuery: '?province=ha-noi', count: 10 }],
      },
    ]
    render(
      <KhoDeThiClient
        initialItems={[]}
        initialTotal={0}
        initialQuery={{ province: 'ha-noi' }}
        sidebarGroups={groups}
      />,
    )
    expect(screen.getByLabelText(/Lọc theo Hà Nội/i)).toHaveAttribute('aria-current', 'true')
  })
})

describe('isSidebarItemActive', () => {
  it('returns true when ?cat=vao-10 matches {cat:"vao-10"}', () => {
    expect(isSidebarItemActive('?cat=vao-10', { cat: 'vao-10' })).toBe(true)
  })

  it('returns false when cat value does not match', () => {
    expect(isSidebarItemActive('?cat=vao-10', { cat: 'thpt' })).toBe(false)
  })

  it('returns false when query does not have the key at all', () => {
    expect(isSidebarItemActive('?cat=vao-10', {})).toBe(false)
  })

  it('handles "category" key alias → maps to "cat"', () => {
    expect(isSidebarItemActive('?category=vao-10', { cat: 'vao-10' })).toBe(true)
  })

  it('returns true when ?province=ha-noi matches {province:"ha-noi"}', () => {
    expect(isSidebarItemActive('?province=ha-noi', { province: 'ha-noi' })).toBe(true)
  })

  it('returns false for empty filterQuery', () => {
    expect(isSidebarItemActive('', { cat: 'vao-10' })).toBe(false)
  })

  it('returns false for filterQuery with only "?"', () => {
    expect(isSidebarItemActive('?', { cat: 'vao-10' })).toBe(false)
  })

  it('returns true when filterQuery keys match even when query has extra keys', () => {
    expect(isSidebarItemActive('?cat=vao-10', { cat: 'vao-10', province: 'x' })).toBe(true)
  })

  it('returns false when filterQuery without leading "?" still parses correctly (no alias)', () => {
    expect(isSidebarItemActive('province=ha-noi', { province: 'ha-noi' })).toBe(true)
  })
})
