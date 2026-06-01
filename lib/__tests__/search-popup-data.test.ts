import { describe, it, expect, beforeEach } from 'vitest';
import { loadRecent, pushRecent, removeRecent, highlight, resolveSectionOrder, CATS, RECENT_DEFAULTS, RECENT_KEY } from '../search-popup-data';

describe('loadRecent fallback', () => {
  beforeEach(() => { window.localStorage.clear(); });

  it('returns defaults when key missing', () => {
    expect(loadRecent()).toEqual(RECENT_DEFAULTS);
  });

  it('returns defaults when stored array is empty', () => {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify([]));
    expect(loadRecent()).toEqual(RECENT_DEFAULTS);
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
