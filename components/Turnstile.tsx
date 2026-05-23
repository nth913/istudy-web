"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

type TurnstileAPI = {
  render: (el: HTMLElement, opts: { sitekey: string; callback: (token: string) => void; theme?: string; size?: string }) => string;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

export type TurnstileHandle = {
  reset: () => void;
  getToken: () => string | null;
};

interface TurnstileProps {
  onToken?: (token: string) => void;
}

export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onToken },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
        setToken(null);
      }
    },
    getToken: () => token,
  }));

  useEffect(() => {
    function tryRender() {
      if (!containerRef.current || widgetIdRef.current) return;
      if (!window.turnstile) {
        setTimeout(tryRender, 100);
        return;
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: "light",
        size: "flexible",
        callback: (t: string) => {
          setToken(t);
          onToken?.(t);
        },
      });
    }
    tryRender();
  }, [onToken]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div ref={containerRef} className="cf-turnstile" />
    </>
  );
});
