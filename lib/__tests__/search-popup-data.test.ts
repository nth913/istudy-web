import { describe, it, expect, beforeEach } from 'vitest';
import { loadRecent, pushRecent, removeRecent, highlight, RECENT_DEFAULTS, RECENT_KEY } from '../search-popup-data';

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
