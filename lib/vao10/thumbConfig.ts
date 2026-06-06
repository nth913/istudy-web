export interface ThumbConfig {
  saturate: number;       // 1.0–1.4  — độ rực màu ảnh
  contrast: number;       // 1.0–1.15 — tương phản
  brightness: number;     // 1.0–1.18 — độ sáng
  scrimStrength: number;  // 0.5–1    — gradient tối đáy pthumb--scrim
  tintStrength: number;   // 0.4–1    — wash đỏ pthumb--tint
  photoVeil: number;      // 0–0.35   — veil tối .ov-full trong .thumb--photo
}

export const DEFAULT_THUMB_CONFIG: ThumbConfig = {
  saturate: 1.18,
  contrast: 1.05,
  brightness: 1.03,
  scrimStrength: 1,
  tintStrength: 1,
  photoVeil: 0.22,
};
