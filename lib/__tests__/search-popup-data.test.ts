import { describe, it, expect, beforeEach } from 'vitest';
import { CATS, POPULAR_TAGS, PROVINCES, TRENDING, ALL_RESULTS, filterResults, groupByCat, loadRecent, saveRecent, pushRecent, removeRecent, highlight, RECENT_DEFAULTS, RECENT_KEY } from '../search-popup-data';

describe('search-popup-data', () => {
  it('exports 4 cats', () => {
    expect(CATS).toHaveLength(4);
    expect(CATS.map(c => c.id)).toEqual(['thpt', 'l10', 'hsa', 'blog']);
  });

  it('has 8 popular tags including hot ones', () => {
    expect(POPULAR_TAGS.length).toBeGreaterThanOrEqual(8);
    expect(POPULAR_TAGS.some(t => t.hot)).toBe(true);
  });

  it('filters results case-insensitive title + meta', () => {
    const r = filterResults('READING');
    expect(r.length).toBeGreaterThan(0);
    expect(r.every(x => (x.title + x.meta.join(' ')).toLowerCase().includes('reading'))).toBe(true);
  });

  it('returns empty for blank query', () => {
    expect(filterResults('')).toEqual([]);
    expect(filterResults('  ')).toEqual([]);
  });

  it('groups results by cat', () => {
    const g = groupByCat(ALL_RESULTS);
    expect(Object.keys(g).sort()).toEqual(['blog', 'hsa', 'l10', 'thpt']);
    expect(g.thpt.length + g.l10.length + g.hsa.length + g.blog.length).toBe(ALL_RESULTS.length);
  });
});

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
