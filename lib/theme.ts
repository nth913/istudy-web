export type Theme = "light" | "dark";

const STORAGE_KEY = "istudyTheme";

type StartViewTransitionFn = (cb: () => void) => { finished: Promise<void> };

export function getTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const v = document.documentElement.getAttribute("data-theme");
  return v === "dark" ? "dark" : "light";
}

export function setTheme(t: Theme, originEl?: HTMLElement): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const setRaw = () => {
    root.setAttribute("data-theme", t);
    root.style.colorScheme = t === "dark" ? "dark" : "light";
  };
  const startVT = (document as unknown as { startViewTransition?: StartViewTransitionFn })
    .startViewTransition;
  const reduced =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (originEl && typeof startVT === "function" && !reduced) {
    const rect = originEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxX = Math.max(cx, window.innerWidth - cx);
    const maxY = Math.max(cy, window.innerHeight - cy);
    const r = Math.hypot(maxX, maxY);
    root.style.setProperty("--dm-origin-x", `${cx}px`);
    root.style.setProperty("--dm-origin-y", `${cy}px`);
    root.style.setProperty("--dm-end-radius", `${r}px`);
    root.classList.add("dm-transitioning");
    const vt = startVT.call(document, setRaw);
    vt.finished.finally(() => root.classList.remove("dm-transitioning"));
  } else {
    setRaw();
  }
  try {
    localStorage.setItem(STORAGE_KEY, t);
  } catch {
    // localStorage unavailable (private mode etc.) — silently ignore.
  }
  window.dispatchEvent(new CustomEvent("istudy:theme", { detail: t }));
}

export function toggleTheme(originEl?: HTMLElement): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next, originEl);
  return next;
}
