import type { Metadata } from "next";

/**
 * Print route layout — overrides root layout chrome.
 *
 * Root layout (`app/layout.tsx`) renders `<EventPopup />` after `{children}`.
 * Because nested layouts cannot uncurry the root, the popup component still
 * mounts on print routes. We hide it via CSS injected on each `/print/*` page
 * (selectors `.ev-pop` / `.ev-pop-launcher`), so the popup never visually
 * appears and is also hidden in the actual print dialog (`@media print`).
 *
 * No `<Header />`, `<Footer />`, or `<MegaMenu />` is rendered by print
 * pages themselves, so this layout is intentionally minimal.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return children;
}
