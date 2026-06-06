"use client";

import { DEFAULT_THUMB_CONFIG, type ThumbConfig } from "@/lib/vao10/thumbConfig";

interface Props {
  config: ThumbConfig;
  onChange: (c: ThumbConfig) => void;
  onClose: () => void;
}

const SLIDERS: Array<{
  key: keyof ThumbConfig;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  { key: "saturate",      label: "Saturate",   min: 1.0, max: 1.4,  step: 0.01 },
  { key: "contrast",      label: "Contrast",   min: 1.0, max: 1.15, step: 0.01 },
  { key: "brightness",    label: "Brightness", min: 1.0, max: 1.18, step: 0.01 },
  { key: "scrimStrength", label: "Scrim",      min: 0.5, max: 1,    step: 0.05 },
  { key: "tintStrength",  label: "Tint wash",  min: 0.4, max: 1,    step: 0.05 },
  { key: "photoVeil",     label: "Photo veil", min: 0,   max: 0.35, step: 0.01 },
];

function copyCss(c: ThumbConfig) {
  const text =
    `--thumb-saturate:   ${c.saturate};\n` +
    `--thumb-contrast:   ${c.contrast};\n` +
    `--thumb-brightness: ${c.brightness};\n` +
    `--thumb-scrim-strength: ${c.scrimStrength};\n` +
    `--thumb-tint-strength:  ${c.tintStrength};\n` +
    `--thumb-photo-veil: ${c.photoVeil};`;
  navigator.clipboard?.writeText(text);
}

export function Vao10ThumbConfigPanel({ config, onChange, onClose }: Props) {
  return (
    <div
      role="dialog"
      aria-label="Chỉnh màu ảnh"
      style={{
        position: "fixed", bottom: 60, right: 16, width: 260, zIndex: 9999,
        background: "#fff", border: "1.5px solid #1A1A1A", borderRadius: 14,
        boxShadow: "4px 4px 0 #1A1A1A", padding: "14px 16px",
        fontFamily: "var(--font, sans-serif)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14 }}>Chỉnh màu ảnh</span>
        <button
          aria-label="Đóng"
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, lineHeight: 1, color: "#666", padding: "0 2px" }}
        >
          ×
        </button>
      </div>

      {SLIDERS.map(({ key, label, min, max, step }) => (
        <div key={key} style={{ marginBottom: 10 }}>
          <label
            htmlFor={`tcc-${key}`}
            style={{ fontSize: 12, color: "#444", display: "flex", justifyContent: "space-between", marginBottom: 2 }}
          >
            <span>{label}</span>
            <span style={{ fontWeight: 600, color: "#1A1A1A", fontVariantNumeric: "tabular-nums" }}>
              {config[key].toFixed(2)}
            </span>
          </label>
          <input
            id={`tcc-${key}`}
            type="range"
            min={min}
            max={max}
            step={step}
            value={config[key]}
            onChange={(e) => onChange({ ...config, [key]: parseFloat(e.target.value) })}
            style={{ width: "100%", accentColor: "#E8192C" }}
          />
        </div>
      ))}

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => onChange(DEFAULT_THUMB_CONFIG)}
          style={{
            flex: 1, padding: "7px 0", border: "1.5px solid #1A1A1A", borderRadius: 8,
            cursor: "pointer", fontSize: 13, fontWeight: 600, background: "#f5f5f5",
          }}
        >
          Reset
        </button>
        <button
          onClick={() => copyCss(config)}
          style={{
            flex: 1, padding: "7px 0", border: "1.5px solid #1A1A1A", borderRadius: 8,
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: "#E8192C", color: "#fff",
          }}
        >
          Copy CSS
        </button>
      </div>
    </div>
  );
}
