// lib/render/dap-an.ts — port of dap-an-render.js (lifecycle helpers).
// Pure TypeScript helpers, no DOM. Server-safe.
//
// Maps to original JS:
// - generateCodes(n) / getCodeStatuses(state)
// - answerKeyForCode(code) — deterministic A/B/C/D per code
// - resolveStatePhase(state) — waiting | ready-1 | ready-multi
// - resolveActiveMa(codes, queryMa) — picks active mã (query param → first non-pending)
// - buildStatusStripCopy(state, codes) — copy chunks for header status strip
// - buildTabsCount(codes) — tabs-head count chip
// - buildAnswerCardMeta(maCode, hasDetailed) — title + meta + state badges

const SEED_LETTERS = ["A", "B", "C", "D"] as const;

export type CodeStatus = "pending" | "quick" | "ready";

export type CodeEntry = {
  code: string;
  status: CodeStatus;
  isNew: boolean;
};

export type DemoMode = "waiting" | "ready-1" | "ready-multi";

export type DapAnState = {
  /** Tổng số mã đề hiển thị (e.g. 24). */
  soMa: number;
  /** Số mã đã có đáp án (A/B/C/D), chưa kèm chi tiết. */
  soMaReady: number;
  /** Số mã đã có cả đáp án + lời giải chi tiết. */
  soMaDetailed: number;
  /** Cho phép force phase (preview / demo). */
  demoMode: DemoMode;
};

export type Phase = "waiting" | "ready-1" | "ready-multi";

export const DEFAULT_DAP_AN_STATE: DapAnState = {
  soMa: 24,
  soMaReady: 8,
  soMaDetailed: 0,
  demoMode: "ready-multi",
};

/** Deterministic A/B/C/D key (40 câu) cho mỗi mã đề — không thay đổi giữa render. */
export function answerKeyForCode(code: string): readonly string[] {
  const seed = parseInt(code, 10) || 101;
  const keys: string[] = [];
  for (let i = 1; i <= 40; i++) {
    keys.push(SEED_LETTERS[(seed * 7919 + i * 31) % 4]);
  }
  return keys;
}

/** Tạo danh sách mã đề 101, 102, ..., (101 + n - 1). */
export function generateCodes(n: number): string[] {
  const codes: string[] = [];
  for (let i = 0; i < n; i++) codes.push(String(101 + i));
  return codes;
}

/** Phân loại từng mã thành pending / quick / ready theo state. */
export function getCodeStatuses(state: DapAnState): CodeEntry[] {
  const all = generateCodes(state.soMa);
  return all.map((code, i) => {
    let status: CodeStatus;
    if (i < state.soMaDetailed) status = "ready";
    else if (i < state.soMaReady) status = "quick";
    else status = "pending";
    const isNew =
      (i === state.soMaReady - 1 && state.soMaReady < state.soMa) ||
      (i === state.soMaDetailed - 1 && state.soMaDetailed < state.soMaReady);
    return { code, status, isNew };
  });
}

/** Phase tổng của trang: waiting / ready-1 / ready-multi. */
export function resolveStatePhase(state: DapAnState): Phase {
  if (state.demoMode === "waiting") return "waiting";
  if (state.demoMode === "ready-1") return "ready-1";
  if (state.soMaReady === 0) return "waiting";
  return "ready-multi";
}

/** Pick active mã: query param (nếu hợp lệ) → mã ready/quick đầu tiên → mã đầu list. */
export function resolveActiveMa(
  codes: CodeEntry[],
  queryMa: string | null | undefined,
): CodeEntry | null {
  if (codes.length === 0) return null;
  if (queryMa) {
    const found = codes.find((c) => c.code === queryMa);
    if (found) return found;
  }
  return codes.find((c) => c.status !== "pending") ?? codes[0];
}

export type StatusStripCopy = {
  variant: "is-waiting" | "is-mixed" | "is-ready";
  /** Text với <b>…</b> markup; render qua dangerouslySetInnerHTML. */
  bodyHtml: string;
  /** Action link bên phải (nếu có). chat21: bỏ "Báo khi đủ" → chỉ giữ "Xem lại đề" / "Báo tôi khi có". */
  actions: { label: string; href: string }[];
};

/** Build status strip copy theo phase + counts. */
export function buildStatusStripCopy(
  state: DapAnState,
  codes: CodeEntry[],
): StatusStripCopy {
  const phase = resolveStatePhase(state);
  const quickN = codes.filter((c) => c.status !== "pending").length;
  const detailedN = codes.filter((c) => c.status === "ready").length;
  const totalN = codes.length;

  if (phase === "waiting") {
    return {
      variant: "is-waiting",
      bodyHtml:
        "<b>Đang chờ đáp án.</b> Đáp án (chữ cái A/B/C/D) sẽ có trong 5–10 phút sau khi có đề. Lời giải chi tiết kèm dịch nghĩa cần thêm 2–4 giờ cho istudy Team viết.",
      actions: [
        { label: "→ Xem lại đề", href: "/de-thi-chi-tiet" },
        { label: "🔔 Báo tôi khi có", href: "#notify" },
      ],
    };
  }
  if (phase === "ready-1") {
    return {
      variant: "is-ready",
      bodyHtml:
        "<b>Đáp án đã được giải đầy đủ.</b> Cập nhật <b>27/06/2026 15:48</b>. Bao gồm đáp án + lời giải chi tiết + dịch nghĩa từng câu.",
      actions: [],
    };
  }

  // ready-multi
  const allDone = detailedN === totalN;
  const allQuick = quickN === totalN;
  if (allDone) {
    return {
      variant: "is-ready",
      bodyHtml: `<b>Đủ ${totalN} mã đã có đáp án + lời giải chi tiết.</b> Tổ giảng viên đã hoàn thiện — bao gồm đáp án, lời giải, dịch nghĩa, bẫy thường gặp.`,
      actions: [],
    };
  }
  if (allQuick && detailedN < totalN) {
    // chat21: bỏ nút 🔔 "Báo khi đủ"
    return {
      variant: "is-mixed",
      bodyHtml: `<b>Đủ ${totalN}/${totalN} mã có đáp án</b> · <b>${detailedN}/${totalN}</b> mã đã có lời giải chi tiết. istudy Team đang hoàn thiện lời giải cho các mã còn lại.`,
      actions: [],
    };
  }
  if (quickN > 0) {
    return {
      variant: "is-mixed",
      bodyHtml: `<b>${quickN}/${totalN} mã có đáp án</b>${
        detailedN > 0 ? ` · <b>${detailedN}/${totalN}</b> mã có lời giải chi tiết` : ""
      }. Đáp án được cập nhật theo từng mã, sau đó istudy Team sẽ viết lời giải chi tiết.`,
      actions: [],
    };
  }
  return {
    variant: "is-waiting",
    bodyHtml:
      "<b>Chưa có đáp án.</b> istudy Team sẽ đăng đáp án trước (trong vòng 5–10 phút), sau đó cập nhật dần lời giải chi tiết.",
    actions: [{ label: "🔔 Báo tôi khi có", href: "#notify" }],
  };
}

export type TabsCount = {
  text: string;
  className: string;
};

/** Build tabs-head count chip text + className. chat21 bỏ chip này nhưng helper vẫn export
 *  để dùng nội bộ (đếm câu, theo dõi state) nếu cần. */
export function buildTabsCount(codes: CodeEntry[]): TabsCount {
  const quickN = codes.filter((c) => c.status !== "pending").length;
  const detailedN = codes.filter((c) => c.status === "ready").length;
  const totalN = codes.length;
  let text: string;
  let className = "tabs-head-count";
  if (detailedN === totalN) {
    text = `Đủ ${totalN} mã · có đủ lời giải chi tiết`;
    className += " is-full";
  } else if (quickN === totalN) {
    text = `Đủ ${totalN} mã đáp án · ${detailedN}/${totalN} có chi tiết`;
    className += " is-partial";
  } else {
    text = `${quickN}/${totalN} mã đáp án${detailedN > 0 ? ` · ${detailedN}/${totalN} chi tiết` : ""}`;
    if (quickN > 0) className += " is-partial";
  }
  return { text, className };
}

export type AnswerCardMeta = {
  title: string;
  metaLine: string;
  /** Hai badge state ở đầu card. */
  badges: { label: string; tone: "ready" | "pending" }[];
};

/** Build header copy cho ans-key-card. chat21: bỏ "nhanh" khỏi label. */
export function buildAnswerCardMeta(
  maCode: string | null,
  hasDetailed: boolean,
): AnswerCardMeta {
  const title = `Đáp án${maCode ? ` — Mã đề ${maCode}` : ""}`;
  const updateStamp = maCode ? (hasDetailed ? "15:48" : "11:47") : "14:22";
  const metaLine = `40 câu · Cập nhật 27/06/2026 ${updateStamp}`;
  const badges: AnswerCardMeta["badges"] = hasDetailed
    ? [
        { label: "✓ Đáp án", tone: "ready" },
        { label: "✓ Lời giải chi tiết", tone: "ready" },
      ]
    : [
        { label: "✓ Đáp án", tone: "ready" },
        { label: "Đang viết lời giải chi tiết", tone: "pending" },
      ];
  return { title, metaLine, badges };
}

/** Validate + clamp state để tránh giá trị vô lý. */
export function normalizeDapAnState(
  partial: Partial<DapAnState> | undefined,
): DapAnState {
  const merged = { ...DEFAULT_DAP_AN_STATE, ...(partial ?? {}) };
  merged.soMa = Math.max(1, Math.floor(merged.soMa));
  merged.soMaReady = Math.min(Math.max(0, Math.floor(merged.soMaReady)), merged.soMa);
  merged.soMaDetailed = Math.min(
    Math.max(0, Math.floor(merged.soMaDetailed)),
    merged.soMaReady,
  );
  return merged;
}
