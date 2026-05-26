import { describe, it, expect, beforeEach, vi } from "vitest";
import { getTheme, setTheme, toggleTheme } from "./theme";

describe("lib/theme", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.style.colorScheme = "";
    localStorage.clear();
  });

  describe("getTheme", () => {
    it("returns 'light' when no data-theme attribute set", () => {
      expect(getTheme()).toBe("light");
    });

    it("returns the value of data-theme attribute when set", () => {
      document.documentElement.setAttribute("data-theme", "dark");
      expect(getTheme()).toBe("dark");
    });
  });

  describe("setTheme", () => {
    it("applies the data-theme attribute on <html>", () => {
      setTheme("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("sets style.colorScheme to match theme", () => {
      setTheme("dark");
      expect(document.documentElement.style.colorScheme).toBe("dark");
      setTheme("light");
      expect(document.documentElement.style.colorScheme).toBe("light");
    });

    it("persists value into localStorage under key 'istudyTheme'", () => {
      setTheme("dark");
      expect(localStorage.getItem("istudyTheme")).toBe("dark");
    });

    it("dispatches istudy:theme event with the new value", () => {
      const handler = vi.fn();
      window.addEventListener("istudy:theme", handler as EventListener);
      setTheme("dark");
      expect(handler).toHaveBeenCalledTimes(1);
      const evt = handler.mock.calls[0][0] as CustomEvent<string>;
      expect(evt.detail).toBe("dark");
      window.removeEventListener("istudy:theme", handler as EventListener);
    });
  });

  describe("toggleTheme", () => {
    it("flips from light to dark and returns new theme", () => {
      document.documentElement.setAttribute("data-theme", "light");
      expect(toggleTheme()).toBe("dark");
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    it("flips from dark to light", () => {
      document.documentElement.setAttribute("data-theme", "dark");
      expect(toggleTheme()).toBe("light");
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });
  });
});
