"use client";

import { useEffect, useState } from "react";

type Variant = "success" | "invalid" | "expired";

const MESSAGE: Record<Variant, string> = {
  success: "✓ Đã xác nhận đăng ký. Cảm ơn bạn!",
  invalid: "✗ Link xác nhận không hợp lệ.",
  expired: "✗ Link xác nhận đã hết hạn. Vui lòng đăng ký lại.",
};

export function VerifyToast() {
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subscribed = params.get("subscribed");
    if (subscribed === "1") setVariant("success");
    else if (subscribed === "invalid") setVariant("invalid");
    else if (subscribed === "expired") setVariant("expired");
  }, []);

  useEffect(() => {
    if (!variant) return;
    const t = setTimeout(() => setVariant(null), 5000);
    return () => clearTimeout(t);
  }, [variant]);

  if (!variant) return null;

  const isSuccess = variant === "success";
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        padding: "12px 20px",
        borderRadius: 8,
        background: isSuccess ? "#DCFCE7" : "#FEE2E2",
        color: isSuccess ? "#166534" : "#991B1B",
        border: `1px solid ${isSuccess ? "#86EFAC" : "#FCA5A5"}`,
        fontSize: 14,
        maxWidth: 360,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {MESSAGE[variant]}
      <button
        type="button"
        onClick={() => setVariant(null)}
        aria-label="Đóng"
        style={{
          marginLeft: 12,
          background: "none",
          border: "none",
          fontSize: 16,
          cursor: "pointer",
          color: "inherit",
        }}
      >
        ×
      </button>
    </div>
  );
}
