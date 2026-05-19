"use client";

import { useEffect } from "react";

const CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type Variant = "sidebar" | "inline" | "footer";

interface AdSlotProps {
  variant: Variant;
  slotId?: string;
  className?: string;
}

const VARIANT_STYLE: Record<Variant, React.CSSProperties> = {
  sidebar: { width: 300, height: 600, display: "block", margin: "0 auto" },
  inline: { display: "block", width: "100%", minHeight: 90, margin: "24px 0" },
  footer: { display: "block", width: "100%", minHeight: 250, margin: "24px 0" },
};

const VARIANT_FORMAT: Record<Variant, string> = {
  sidebar: "auto",
  inline: "horizontal",
  footer: "auto",
};

export function AdSlot({ variant, slotId, className }: AdSlotProps) {
  useEffect(() => {
    if (!CLIENT_ID || !slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.warn("[adslot] push failed", err);
    }
  }, [slotId]);

  if (!CLIENT_ID || !slotId) {
    return (
      <div
        className={className}
        style={{
          ...VARIANT_STYLE[variant],
          border: "1px dashed #cbd5e1",
          borderRadius: 8,
          background: "#f8fafc",
          color: "#64748b",
          fontSize: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
        aria-label="Vị trí quảng cáo"
      >
        Quảng cáo · {variant}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={VARIANT_STYLE[variant]}
      data-ad-client={CLIENT_ID}
      data-ad-slot={slotId}
      data-ad-format={VARIANT_FORMAT[variant]}
      data-full-width-responsive="true"
    />
  );
}
