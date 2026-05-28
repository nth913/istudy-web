import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import SearchPopup from '../SearchPopup';

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
    expect(document.querySelectorAll('.spl-pickers .spl-tag').length).toBeGreaterThanOrEqual(10);
  });

  it('renders dev-notice card', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    expect(screen.getByText(/Tìm kiếm đang được hoàn thiện/)).toBeTruthy();
  });
});

describe('SearchPopup — results + empty', () => {
  it('renders results sections grouped by cat khi gõ query có match', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'reading' } });

    const sections = document.querySelectorAll('.spl-sect');
    expect(sections.length).toBeGreaterThan(0);
    const items = document.querySelectorAll('.spl-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('highlights matched keyword via .spl-hl', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'reading' } });

    expect(document.querySelectorAll('.spl-hl').length).toBeGreaterThan(0);
  });

  it('renders empty state khi query không match', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'xyzqwertynever' } });

    expect(screen.getByText(/Hổng có gì trùng với/)).toBeTruthy();
    expect(document.querySelectorAll('.spl-empty .spl-tag').length).toBe(3);
  });

  it('updates chip counts khi gõ', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'reading' } });

    const cnts = document.querySelectorAll('.spl-chip .cnt');
    expect(cnts.length).toBe(5);
  });
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

describe('SearchPopup — persistence + body lock', () => {
  it('persists query to recent on result click', () => {
    render(<SearchPopup open={true} onClose={vi.fn()} onOpen={vi.fn()} />);
    const input = screen.getByPlaceholderText(/Tìm theo tiêu đề/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'reading' } });

    const first = document.querySelector<HTMLAnchorElement>('.spl-item');
    expect(first).toBeTruthy();
    fireEvent.click(first!);

    const raw = window.localStorage.getItem('istudy.search.recent');
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!)).toContain('reading');
  });

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
