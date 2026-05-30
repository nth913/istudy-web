import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup, waitFor, act } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';

vi.mock('@/lib/api/search', () => ({
  fetchSearch: vi.fn(),
  fetchSearchMeta: vi.fn(),
}))

import { fetchSearch, fetchSearchMeta } from '@/lib/api/search'
import SearchPopup from '../SearchPopup'

declare global {
  // eslint-disable-next-line no-var
  var __mockPath: string;
}
(globalThis as any).__mockPath = '/';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => (globalThis as any).__mockPath ?? '/',
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
  (globalThis as any).__mockPath = '/';
  ;(fetchSearchMeta as any).mockResolvedValue({
    trending: [{ rank: 1, label: 'Trending A', delta: '+10%' }],
    popularTags: [{ id: 't1', label: 'Đề tham khảo 2025', hot: true }, { id: 't2', label: 'Tag B', hot: false }],
    provinces: ['Hà Nội', 'Đà Nẵng'],
    featured: { id: 'f1', cat: 'thpt', href: '/de-thi-chi-tiet/x', title: 'Feat X', thumbLines: ['THPT', '2026'], metaText: '50 câu · 1k lượt' },
  })
  ;(fetchSearch as any).mockResolvedValue({ thpt: [], l10: [], hsa: [], blog: [], total: 0 })
});

describe('SearchPopup — shell + initial', () => {
  it('renders overlay with is-open class when open=true', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const overlay = document.querySelector('.spl-overlay');
    expect(overlay).toBeTruthy();
    expect(overlay?.classList.contains('is-open')).toBe(true);
  });

  it('renders input with placeholder', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/);
    expect(input).toBeTruthy();
  });

  it('renders 5 filter chips', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.querySelectorAll('.spl-chip').length).toBe(5);
  });

  it('renders initial pickers (tags + provinces) when query empty', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.querySelectorAll('.spl-pickers .spl-tag').length).toBeGreaterThanOrEqual(2);
  });
});

describe('SearchPopup — API branches', () => {
  it('typing triggers loading skeleton then results branch', async () => {
    ;(fetchSearch as any).mockResolvedValueOnce({
      thpt: [{ id: 'r1', cat: 'thpt', href: '/de-thi-chi-tiet/r1', title: 'Result One', meta: ['Bộ GD'] }],
      l10: [], hsa: [], blog: [], total: 1,
    })
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'tham khao' } })
    await waitFor(() => expect(document.querySelector('.spl-skel-row')).toBeTruthy(), { timeout: 400 })
    await waitFor(() => expect(screen.queryByText('Result One')).toBeTruthy(), { timeout: 1000 })
  })

  it('empty response shows empty branch', async () => {
    ;(fetchSearch as any).mockResolvedValueOnce({ thpt: [], l10: [], hsa: [], blog: [], total: 0 })
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    fireEvent.change(screen.getByPlaceholderText(/Tìm theo tiêu đề/), { target: { value: 'abcxyz' } })
    await waitFor(() => expect(screen.queryByText(/Hổng có gì trùng/)).toBeTruthy(), { timeout: 1000 })
  })

  it('fetch error shows error branch + retry', async () => {
    ;(fetchSearch as any).mockRejectedValueOnce(new Error('search 500'))
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    fireEvent.change(screen.getByPlaceholderText(/Tìm theo tiêu đề/), { target: { value: 'x' } })
    await waitFor(() => expect(document.querySelector('.spl-empty h3')).toBeTruthy(), { timeout: 1000 })
    expect(document.querySelector('.spl-empty button')).toBeTruthy()
  })

  it('clicking Thử lại after error refetches and shows result', async () => {
    ;(fetchSearch as any)
      .mockRejectedValueOnce(new Error('search 500'))
      .mockResolvedValueOnce({
        thpt: [{ id: 'r2', cat: 'thpt', href: '/de-thi-chi-tiet/r2', title: 'Retry Result', meta: ['Bộ GD'] }],
        l10: [], hsa: [], blog: [], total: 1,
      })
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/Tìm theo tiêu đề/), { target: { value: 'retry' } })
    })
    // wait for error branch — error panel has h3 "Không tải được kết quả"
    await waitFor(
      () => expect(document.querySelector('.spl-empty h3')?.textContent).toMatch(/Không tải/),
      { timeout: 2000 }
    )
    // click retry button inside act so React flushes state updates
    await act(async () => {
      const retryBtn = document.querySelector('.spl-empty button') as HTMLButtonElement
      expect(retryBtn).toBeTruthy()
      fireEvent.click(retryBtn)
      // wait for 250ms debounce to fire inside act
      await new Promise((r) => setTimeout(r, 300))
    })
    // should refetch and show result (highlight() splits text into <mark>+text nodes)
    await waitFor(() => expect(document.querySelector('.spl-item')).toBeTruthy(), { timeout: 2000 })
    expect(document.querySelector('.spl-item-title')?.textContent).toMatch(/Retry Result/)
  })

  it('empty-state shows 3 suggestion buttons even when meta has no hot tags', async () => {
    ;(fetchSearchMeta as any).mockResolvedValueOnce({
      trending: [],
      popularTags: [
        { id: 'a1', label: 'Tag A', hot: false },
        { id: 'a2', label: 'Tag B', hot: false },
        { id: 'a3', label: 'Tag C', hot: false },
        { id: 'a4', label: 'Tag D', hot: false },
      ],
      provinces: [],
      featured: null,
    })
    ;(fetchSearch as any).mockResolvedValueOnce({ thpt: [], l10: [], hsa: [], blog: [], total: 0 })
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    // wait for meta to load
    await waitFor(() => expect((fetchSearchMeta as any).mock.calls.length).toBeGreaterThan(0), { timeout: 500 })
    fireEvent.change(screen.getByPlaceholderText(/Tìm theo tiêu đề/), { target: { value: 'nomatch' } })
    await waitFor(() => expect(screen.queryByText(/Hổng có gì trùng/)).toBeTruthy(), { timeout: 1000 })
    const emptyTags = document.querySelectorAll('.spl-empty-tags .spl-tag')
    expect(emptyTags.length).toBe(3)
  })

  it('meta failure falls back to hardcoded constants', async () => {
    ;(fetchSearchMeta as any).mockRejectedValueOnce(new Error('meta 500'))
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    await waitFor(() => expect(screen.queryByText(/Đề tham khảo 2025/)).toBeTruthy(), { timeout: 1000 })
  })

  it('aborts previous fetch on rapid typing', async () => {
    const aborted: AbortSignal[] = []
    ;(fetchSearch as any).mockImplementation((_q: string, signal: AbortSignal) => {
      aborted.push(signal)
      return new Promise((resolve) => {
        signal.addEventListener('abort', () => resolve({ thpt: [], l10: [], hsa: [], blog: [], total: 0 }))
      })
    })
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />)
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/)
    fireEvent.change(input, { target: { value: 'a' } })
    await new Promise((r) => setTimeout(r, 300))
    fireEvent.change(input, { target: { value: 'ab' } })
    await new Promise((r) => setTimeout(r, 300))
    expect(aborted[0].aborted).toBe(true)
  })
});

describe('SearchPopup — keyboard + hero hijack', () => {
  it('ESC calls onClose', () => {
    const onClose = vi.fn();
    render(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('Cmd+K toggles via onOpen when closed', () => {
    const onOpen = vi.fn();
    render(<SearchPopup open={false} onClose={vi.fn()} onOpen={onOpen} />);
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    expect(onOpen).toHaveBeenCalled();
  });

  it('/ opens when not focused in input', () => {
    const onOpen = vi.fn();
    render(<SearchPopup open={false} onClose={vi.fn()} onOpen={onOpen} />);
    fireEvent.keyDown(document, { key: '/' });
    expect(onOpen).toHaveBeenCalled();
  });

  it('hijacks .search-bar element', () => {
    const onOpen = vi.fn();
    const form = document.createElement('form');
    form.className = 'search-bar';
    const inp = document.createElement('input');
    form.appendChild(inp);
    document.body.appendChild(form);

    render(<SearchPopup open={false} onClose={vi.fn()} onOpen={onOpen} />);

    fireEvent.click(form);
    expect(onOpen).toHaveBeenCalled();
    expect(inp.hasAttribute('readonly')).toBe(true);

    document.body.removeChild(form);
  });
});

describe('SearchPopup — body lock', () => {
  it('adds spl-locked class to body when open', () => {
    const { rerender } = render(<SearchPopup open={false} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.body.classList.contains('spl-locked')).toBe(false);
    rerender(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.body.classList.contains('spl-locked')).toBe(true);
  });

  it('removes spl-locked on close', () => {
    const { rerender } = render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.body.classList.contains('spl-locked')).toBe(true);
    rerender(<SearchPopup open={false} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(document.body.classList.contains('spl-locked')).toBe(false);
  });
});

describe('SearchPopup — close on route change', () => {
  it('calls onClose when pathname changes while open', () => {
    const onClose = vi.fn();
    (globalThis as any).__mockPath = '/';
    const { rerender } = render(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);
    expect(onClose).not.toHaveBeenCalled();

    (globalThis as any).__mockPath = '/kho-de-thi';
    rerender(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);

    expect(onClose).toHaveBeenCalled();
  });

  it('does NOT call onClose on initial mount', () => {
    const onClose = vi.fn();
    (globalThis as any).__mockPath = '/some-route';
    render(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does NOT call onClose when pathname unchanged on rerender', () => {
    const onClose = vi.fn();
    (globalThis as any).__mockPath = '/';
    const { rerender } = render(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);
    rerender(<SearchPopup open={true} onClose={onClose} onOpen={vi.fn()} />);
    expect(onClose).not.toHaveBeenCalled();
  });
});
