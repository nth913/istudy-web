import { describe, it, expect } from 'vitest';
import { CATS, POPULAR_TAGS, PROVINCES, TRENDING, ALL_RESULTS, filterResults, groupByCat } from '../search-popup-data';

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
