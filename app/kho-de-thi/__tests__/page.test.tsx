import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/api/exams', () => ({
  fetchExamsList: vi.fn(),
  fetchSidebarFacets: vi.fn(),
}))

import { fetchExamsList, fetchSidebarFacets } from '@/lib/api/exams'
import Page from '../page'

beforeEach(() => {
  vi.mocked(fetchExamsList).mockReset()
  vi.mocked(fetchSidebarFacets).mockReset()
})

describe('KhoDeThiPage RSC', () => {
  it('renders exam items from CMS', async () => {
    vi.mocked(fetchExamsList).mockResolvedValueOnce({
      items: [
        {
          id: '1',
          slug: 'a',
          title: 'Đề Hà Nội 2026',
          category: 'vao-10',
          examType: 'chinh-thuc',
          year: '2026',
          province: { slug: 'ha-noi', name: 'Hà Nội' },
          createdAt: '2026-05-23',
          tags: { hot: { enabled: true } },
        },
      ] as any,
      total: 1,
      limit: 20,
      offset: 0,
    })
    vi.mocked(fetchSidebarFacets).mockResolvedValueOnce({ groups: [] })
    const ui = await Page({ searchParams: Promise.resolve({}) } as any)
    render(ui as any)
    expect(screen.getByText(/Đề Hà Nội 2026/)).toBeInTheDocument()
  })

  it('renders sidebar groups from facets', async () => {
    vi.mocked(fetchExamsList).mockResolvedValueOnce({ items: [], total: 0, limit: 20, offset: 0 })
    vi.mocked(fetchSidebarFacets).mockResolvedValueOnce({
      groups: [
        {
          title: 'Group X',
          items: [{ label: 'Item A', filterQuery: '?cat=vao-10', count: 42 }],
        },
      ],
    })
    const ui = await Page({ searchParams: Promise.resolve({}) } as any)
    render(ui as any)
    expect(screen.getByText('Group X')).toBeInTheDocument()
    expect(screen.getByText('Item A')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders empty state when items=[]', async () => {
    vi.mocked(fetchExamsList).mockResolvedValueOnce({ items: [], total: 0, limit: 20, offset: 0 })
    vi.mocked(fetchSidebarFacets).mockResolvedValueOnce({ groups: [] })
    const ui = await Page({ searchParams: Promise.resolve({}) } as any)
    render(ui as any)
    expect(screen.getByText(/Không có đề thi nào phù hợp/)).toBeInTheDocument()
  })

  it('passes searchParams to fetchExamsList', async () => {
    vi.mocked(fetchExamsList).mockResolvedValueOnce({ items: [], total: 0, limit: 20, offset: 0 })
    vi.mocked(fetchSidebarFacets).mockResolvedValueOnce({ groups: [] })
    await Page({
      searchParams: Promise.resolve({ cat: 'vao-10', province: 'ha-noi', sort: 'views' }),
    } as any)
    expect(fetchExamsList).toHaveBeenCalledWith(
      expect.objectContaining({
        cat: 'vao-10',
        province: 'ha-noi',
        sort: 'views',
      }),
    )
  })
})
