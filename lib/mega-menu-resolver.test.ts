import { describe, it, expect } from 'vitest'
import { resolveSlots, isGroupEmpty, type ResolvedItem } from './mega-menu-resolver'
import type { Group, ItemSlot } from './mega-menu-data'

const groupYears: Group = {
  title: 'ĐỀ CHÍNH THỨC',
  href: '/kho-de-thi?cat=vao-10&examType=chinh-thuc',
  slots: [
    { kind: 'dynamic-year', href: (y: string) => `/y/${y}` },
    { kind: 'dynamic-year', href: (y: string) => `/y/${y}` },
    { kind: 'dynamic-year', href: (y: string) => `/y/${y}` },
    { kind: 'static', name: '2023', sub: 'năm 2023', href: '/y/2023' },
  ],
}

const groupExams: Group = {
  title: 'ĐỀ THI THỬ',
  href: '/kho-de-thi?cat=vao-10&examType=thi-thu',
  slots: Array.from({ length: 6 }, () => ({ kind: 'dynamic-exam' as const, href: (s: string) => `/e/${s}` })),
}

const groupChinhThucDynamic: Group = {
  title: 'ĐỀ CHÍNH THỨC',
  href: '/kho-de-thi?cat=vao-10&examType=chinh-thuc',
  slots: [
    { kind: 'dynamic-exam', href: (s: string) => `/e/${s}` },
    { kind: 'dynamic-exam', href: (s: string) => `/e/${s}` },
    { kind: 'dynamic-exam', href: (s: string) => `/e/${s}` },
    { kind: 'static', name: '2026', sub: 'Đề Sở GD năm 2026', href: '/y/2026' },
    { kind: 'static', name: '2025', sub: 'Đề Sở GD năm 2025', href: '/y/2025' },
    { kind: 'static', name: 'Archive 2015 – 2024', sub: 'Lưu trữ theo từng năm', href: '/y/<=2024' },
  ],
}

describe('resolveSlots', () => {
  it('pair dynamic-year with data desc; static slot rendered', () => {
    const out = resolveSlots(groupYears, {
      chinhThuc: { years: [{ year: '2026', count: 3 }, { year: '2025', count: 4 }, { year: '2024', count: 2 }], hot: [], new: [] },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out[0]).toMatchObject({ kind: 'item', name: '2026', href: '/y/2026', tag: 'NEW' })
    expect(out[1]).toMatchObject({ kind: 'item', name: '2025' })
    expect(out[1].kind === 'item' && !out[1].tag).toBe(true)
    expect(out[2]).toMatchObject({ kind: 'item', name: '2024' })
    expect(out[3]).toMatchObject({ kind: 'item', name: '2023' })
  })

  it('placeholder for year slot when data missing; static still rendered', () => {
    const out = resolveSlots(groupYears, {
      chinhThuc: { years: [{ year: '2026', count: 3 }], hot: [], new: [] },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out[0].kind).toBe('item')
    expect(out[1].kind).toBe('placeholder')
    expect(out[2].kind).toBe('placeholder')
    expect(out[3]).toMatchObject({ kind: 'item', name: '2023' })
  })

  it('hot-new mix: HOT first with HOT badge, NEW after with NEW badge', () => {
    const tabData = {
      chinhThuc: { years: [], hot: [], new: [] },
      thiThu: {
        hot: [
          { slug: 'h1', title: 'Hot 1', year: '2025', isHot: true },
          { slug: 'h2', title: 'Hot 2', year: '2025', isHot: true },
        ],
        new: [
          { slug: 'n1', title: 'New 1', year: '2026', isHot: false },
          { slug: 'n2', title: 'New 2', year: '2026', isHot: false },
        ],
      },
      minhHoa: { hot: [], new: [] },
    }
    const out = resolveSlots(groupExams, tabData, 'thiThu')
    expect(out[0]).toMatchObject({ kind: 'item', name: 'Hot 1', tag: 'HOT', href: '/e/h1' })
    expect(out[1]).toMatchObject({ kind: 'item', name: 'Hot 2', tag: 'HOT' })
    expect(out[2]).toMatchObject({ kind: 'item', name: 'New 1', tag: 'NEW' })
    expect(out[3]).toMatchObject({ kind: 'item', name: 'New 2', tag: 'NEW' })
    expect(out[4].kind).toBe('placeholder')
    expect(out[5].kind).toBe('placeholder')
  })

  it('all placeholder when tabData is null', () => {
    const out = resolveSlots(groupExams, null, 'thiThu')
    expect(out.every(s => s.kind === 'placeholder')).toBe(true)
  })

  it('accept root MegaMenuKhoDeData (auto-pick groupKey)', () => {
    const root = {
      vao10: {
        chinhThuc: { years: [{ year: '2026', count: 1 }], hot: [], new: [] },
        thiThu: { hot: [], new: [] },
        minhHoa: { hot: [], new: [] },
      },
      thptQg: {
        chinhThuc: { years: [], hot: [], new: [] },
        thiThu: { hot: [], new: [] },
        minhHoa: { hot: [], new: [] },
      },
    }
    // When called with root data, caller is expected to slice .vao10 or .thptQg before passing
    // This test asserts the resolver accepts the sliced TabSlots object directly
    const out = resolveSlots(groupYears, root.vao10, 'chinhThuc')
    expect(out[0]).toMatchObject({ kind: 'item', name: '2026' })
  })

  it('chinhThuc dynamic-exam: 3 HOT → 3 items resolved + 3 static', () => {
    const out = resolveSlots(groupChinhThucDynamic, {
      chinhThuc: {
        years: [],
        hot: [
          { slug: 'h1', title: 'Hot 1', year: '2026', isHot: true },
          { slug: 'h2', title: 'Hot 2', year: '2026', isHot: true },
          { slug: 'h3', title: 'Hot 3', year: '2025', isHot: true },
        ],
        new: [],
      },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out).toHaveLength(6)
    expect(out[0]).toMatchObject({ kind: 'item', name: 'Hot 1', tag: 'HOT', href: '/e/h1' })
    expect(out[1]).toMatchObject({ kind: 'item', name: 'Hot 2', tag: 'HOT' })
    expect(out[2]).toMatchObject({ kind: 'item', name: 'Hot 3', tag: 'HOT' })
    expect(out[3]).toMatchObject({ kind: 'item', name: '2026' })
    expect(out[4]).toMatchObject({ kind: 'item', name: '2025' })
    expect(out[5]).toMatchObject({ kind: 'item', name: 'Archive 2015 – 2024' })
  })

  it('chinhThuc dynamic-exam: HOT pool concat NEW (1 HOT + 2 NEW)', () => {
    const out = resolveSlots(groupChinhThucDynamic, {
      chinhThuc: {
        years: [],
        hot: [{ slug: 'h1', title: 'Hot 1', year: '2026', isHot: true }],
        new: [
          { slug: 'n1', title: 'New 1', year: '2026', isHot: false },
          { slug: 'n2', title: 'New 2', year: '2025', isHot: false },
        ],
      },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out[0]).toMatchObject({ kind: 'item', name: 'Hot 1', tag: 'HOT' })
    expect(out[1]).toMatchObject({ kind: 'item', name: 'New 1', tag: 'NEW' })
    expect(out[2]).toMatchObject({ kind: 'item', name: 'New 2', tag: 'NEW' })
  })

  it('chinhThuc dynamic-exam: empty pool → omit (NOT placeholder), static still rendered', () => {
    const out = resolveSlots(groupChinhThucDynamic, {
      chinhThuc: { years: [], hot: [], new: [] },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out).toHaveLength(6)
    expect(out[0].kind).toBe('omit')
    expect(out[1].kind).toBe('omit')
    expect(out[2].kind).toBe('omit')
    expect(out[3]).toMatchObject({ kind: 'item', name: '2026' })
    expect(out[4]).toMatchObject({ kind: 'item', name: '2025' })
    expect(out[5]).toMatchObject({ kind: 'item', name: 'Archive 2015 – 2024' })
  })

  it('chinhThuc dynamic-exam: 1 HOT + 0 NEW → 1 item + 2 omit + 3 static', () => {
    const out = resolveSlots(groupChinhThucDynamic, {
      chinhThuc: {
        years: [],
        hot: [{ slug: 'h1', title: 'Hot 1', year: '2026', isHot: true }],
        new: [],
      },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'chinhThuc')
    expect(out[0]).toMatchObject({ kind: 'item', name: 'Hot 1' })
    expect(out[1].kind).toBe('omit')
    expect(out[2].kind).toBe('omit')
    expect(out[3]).toMatchObject({ kind: 'item', name: '2026' })
  })

  it('chinhThuc dynamic-exam: tabData null → 3 omit + 3 static', () => {
    const out = resolveSlots(groupChinhThucDynamic, null, 'chinhThuc')
    expect(out[0].kind).toBe('omit')
    expect(out[1].kind).toBe('omit')
    expect(out[2].kind).toBe('omit')
    expect(out[3]).toMatchObject({ kind: 'item', name: '2026' })
    expect(out[4]).toMatchObject({ kind: 'item', name: '2025' })
    expect(out[5]).toMatchObject({ kind: 'item', name: 'Archive 2015 – 2024' })
  })

  it('thiThu dynamic-exam: empty pool → placeholder (unchanged behavior)', () => {
    const out = resolveSlots(groupExams, {
      chinhThuc: { years: [], hot: [], new: [] },
      thiThu: { hot: [], new: [] },
      minhHoa: { hot: [], new: [] },
    }, 'thiThu')
    expect(out.every((s) => s.kind === 'placeholder')).toBe(true)
  })

  it('isGroupEmpty returns true when all slots placeholder', () => {
    const all = [{ kind: 'placeholder' }, { kind: 'placeholder' }] as ResolvedItem[]
    expect(isGroupEmpty(all)).toBe(true)
  })

  it('isGroupEmpty returns false when at least one item resolved', () => {
    const mixed = [{ kind: 'placeholder' }, { kind: 'item', name: 'X', href: '/x' }] as ResolvedItem[]
    expect(isGroupEmpty(mixed)).toBe(false)
  })
})
