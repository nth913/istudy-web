import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import SearchPopup from '../SearchPopup';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

beforeEach(() => {
  cleanup();
  window.localStorage.clear();
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
