import { describe, it, expect, beforeEach } from 'vitest';
import { loadRecent, pushRecent, removeRecent, highlight, resolveSectionOrder, CATS, RECENT_KEY } from '../search-popup-data';

describe('loadRecent fallback', () => {
  beforeEach(() => { window.localStorage.clear(); });

  it('returns [] when key missing (no defaults)', () => {
    expect(loadRecent()).toEqual([]);
  });

  it('returns [] when stored array is empty', () => {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify([]));
    expect(loadRecent()).toEqual([]);
  });

  it('returns stored list when present', () => {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(['x', 'y']));
    expect(loadRecent()).toEqual(['x', 'y']);
  });
});

describe('resolveSectionOrder', () => {
  const ids = (cats: { id: string }[]) => cats.map((c) => c.id);

  it('order hợp lệ đầy đủ → trả đúng thứ tự đó', () => {
    expect(ids(resolveSectionOrder(['blog', 'hsa', 'l10', 'thpt']))).toEqual(['blog', 'hsa', 'l10', 'thpt']);
  });

  it('undefined → canonical CATS', () => {
    expect(ids(resolveSectionOrder(undefined))).toEqual(ids(CATS));
  });

  it('mảng rỗng → canonical CATS', () => {
    expect(ids(resolveSectionOrder([]))).toEqual(ids(CATS));
  });

  it('partial → phần cho trước lên đầu, còn lại bù theo canonical', () => {
    expect(ids(resolveSectionOrder(['blog']))).toEqual(['blog', 'thpt', 'l10', 'hsa']);
  });

  it('malformed (id lạ + trùng) → bỏ id lạ, dedup, bù đủ 4', () => {
    expect(ids(resolveSectionOrder(['blog', 'blog', 'xxx' as any, 'l10']))).toEqual(['blog', 'l10', 'thpt', 'hsa']);
  });
});

describe('highlight safety', () => {
  it('escapes ampersand in text and does not corrupt HTML', () => {
    const out = highlight('Bộ GD&ĐT', 'GD');
    expect(out).toBe('Bộ <mark class="spl-hl">GD</mark>&amp;ĐT');
  });

  it('escapes ampersand in match', () => {
    const out = highlight('A & B', '&');
    expect(out).toBe('A <mark class="spl-hl">&amp;</mark> B');
  });

  it('returns escaped text when query blank', () => {
    expect(highlight('A & B', '')).toBe('A &amp; B');
  });
});

import { resolveSectionItems } from '../search-popup-data';

describe('loadRecent empty → []', () => {
  beforeEach(() => window.localStorage.clear())
  it('returns [] when nothing stored (no defaults)', () => {
    expect(loadRecent()).toEqual([])
  })
})

describe('resolveSectionItems', () => {
  const real = [1, 2, 3, 4]; const def = [9, 8]
  it('loading before ready/timeout → loading, no items', () => {
    expect(resolveSectionItems({ metaState: 'loading', timedOut: false, real, def, count: 2 }))
      .toEqual({ loading: true, items: [] })
  })
  it('ready with data → real sliced to count', () => {
    expect(resolveSectionItems({ metaState: 'ready', timedOut: false, real, def, count: 2 }))
      .toEqual({ loading: false, items: [1, 2] })
  })
  it('ready empty → default sliced', () => {
    expect(resolveSectionItems({ metaState: 'ready', timedOut: false, real: [], def, count: 2 }))
      .toEqual({ loading: false, items: [9, 8] })
  })
  it('error → default', () => {
    expect(resolveSectionItems({ metaState: 'error', timedOut: false, real: [], def, count: 1 }))
      .toEqual({ loading: false, items: [9] })
  })
  it('timed out while loading → default', () => {
    expect(resolveSectionItems({ metaState: 'loading', timedOut: true, real: [], def, count: 2 }))
      .toEqual({ loading: false, items: [9, 8] })
  })
})
