/**
 * Đề thi — typed data model + state machine.
 *
 * Ported from `/tmp/design-bundle/istudy-v2/project/de-thi-render.js` (chat13+).
 * Used by `/app/de-thi-chi-tiet/page.tsx` (Server Component preview)
 * and `/app/lam-bai/page.tsx` (Client Component attempt UI).
 *
 * 13 dạng câu hỏi per docs/design/02-question-types.md.
 */

// ============================================================================
// QUESTION BLOCKS — 13 dạng câu hỏi
// ============================================================================

export type SingleChoiceBlock = {
  type: "single-choice";
  /** Inline HTML allowed (e.g. <u>, <br>, <span class="speaker">). */
  text: string;
  opts: string[];
  /** Optional UI subtype hint: synonym / antonym / comprehension / sign / cloze. */
  subtype?: "synonym" | "antonym" | "comprehension" | "sign" | "cloze";
  /** Sign image alt text or label (for `subtype = 'sign'`). */
  sign?: string;
  /** Blank reference number (for `subtype = 'cloze'`). */
  blankRef?: number;
};

export type MultiChoiceBlock = {
  type: "multi-choice";
  text: string;
  opts: string[];
};

export type TrueFalseBlock = {
  type: "true-false";
  text: string;
};

export type ShortAnswerBlock = {
  type: "short-answer";
  text: string;
  /** Hint tag (e.g. word-form root). */
  tag?: string;
};

export type EssayBlock = {
  type: "essay";
  text: string;
  format?: "paragraph" | "email" | "letter" | "essay";
  minWords?: number;
  maxWords?: number;
};

export type OrderingBlock = {
  type: "ordering";
  text: string;
  items: string[];
};

export type MatchingBlock = {
  type: "matching";
  text: string;
  left: string[];
  right: string[];
};

export type FillBlankBlock = {
  type: "fill-blank";
  /** Stem with `___` placeholders, or HTML with blanks. */
  text: string;
  blankCount: number;
  prompt?: string;
};

export type AudioBlock = {
  type: "audio";
  text: string;
  audioSrc: string;
  transcript?: string;
  opts?: string[];
};

export type ImageHotspotBlock = {
  type: "image-hotspot";
  text: string;
  imageSrc: string;
};

export type FormulaBlock = {
  type: "formula";
  text: string;
  /** LaTeX or HTML formula. */
  formula: string;
};

export type DragDropBlock = {
  type: "drag-drop";
  text: string;
  items: string[];
  targets: string[];
};

export type TableBlock = {
  type: "table";
  text: string;
  headers: string[];
  rows: string[][];
};

export type QuestionBlock =
  | SingleChoiceBlock
  | MultiChoiceBlock
  | TrueFalseBlock
  | ShortAnswerBlock
  | EssayBlock
  | OrderingBlock
  | MatchingBlock
  | FillBlankBlock
  | AudioBlock
  | ImageHotspotBlock
  | FormulaBlock
  | DragDropBlock
  | TableBlock;

export type QuestionType = QuestionBlock["type"];

// ============================================================================
// SECTIONS + EXAM
// ============================================================================

export type ExamSection = {
  /** Roman code: I, II, III ... */
  id: string;
  title: string;
  /** "3.5 điểm • 14 câu". */
  meta: string;
  /** [first, last] question index (1-based, inclusive). */
  range: [number, number];
  /** Shared passage rendered before questions in the section. */
  intro?: { title: string; html: string };
};

export type ExamMeta = {
  slug: string;
  title: string;
  subjectLabel: string;
  description: string;
  totalQuestions: number;
  durationMinutes: number;
  examDate: string;
  views: string;
  /** Số mã đề tối đa (Bộ GD&ĐT cho phép tối đa 48). */
  numCodes: number;
  /** Số mã đề hiện đã có. */
  numCodesReady: number;
  showOnlineOption: boolean;
  pdfEnabled: boolean;
  /** Demo lifecycle mode: waiting | ready-1 | ready-multi. */
  demoMode: "waiting" | "ready-1" | "ready-multi";
};

export type Exam = {
  meta: ExamMeta;
  sections: ExamSection[];
  questions: Record<number, QuestionBlock>;
};

// ============================================================================
// MOCK DATA — Đề minh hoạ vào 10 TP.HCM 2026 môn Anh
// ============================================================================
//
// 40 câu, 7 phần — cover các dạng:
// - single-choice (mcq classic, mcq-sign, mcq-cloze qua `subtype`)
// - true-false
// - short-answer (word-form)
// - essay (viết lại câu chuyển dạng — `subtype` Rewrite legacy mapped to short-answer w/ prompt)
//
// Để demo 5-7 question types representative, ta phối thêm `audio`, `matching`,
// `ordering` ở section bổ sung dạng nghe (đặt sau VII trong sample).
// ============================================================================

export const SECTIONS: ExamSection[] = [
  {
    id: "I",
    title: "I. Trắc nghiệm — Phát âm, trọng âm, ngữ pháp, từ vựng, giao tiếp",
    meta: "3.5 điểm • 14 câu",
    range: [1, 14],
  },
  {
    id: "II",
    title: "II. Đọc biển báo",
    meta: "0.5 điểm • 2 câu",
    range: [15, 16],
  },
  {
    id: "III",
    title: "III. Điền từ vào đoạn văn (Cloze text)",
    meta: "1.5 điểm • 6 câu",
    range: [17, 22],
    intro: {
      title: "Dear Danny,",
      html: `I hope you&rsquo;re doing well! I&rsquo;d like to tell you about a <span class="blank">(17)____</span>. I really enjoy &ndash; badminton. You don&rsquo;t need much to start &ndash; just a racket, a shuttlecock, and a bit of <span class="blank">(18)____</span> space. When I play badminton, I feel happy and full of <span class="blank">(19)____</span>. It&rsquo;s also a good way to <span class="blank">(20)____</span> and spend time with friends. The game also teaches teamwork, patience, and <span class="blank">(21)____</span> decision-making. Badminton is a fun and healthy lifestyle choice <span class="blank">(22)____</span> everyone!`,
    },
  },
  {
    id: "IV",
    title: "IV. Đọc hiểu — Đờn ca tài tử",
    meta: "1.5 điểm • 6 câu",
    range: [23, 28],
    intro: {
      title: "Let's Keep Đờn Ca Tài Tử Alive!",
      html: `Đờn ca tài tử is a special kind of music, a living heritage that connects us to the soul of southern Vietnam. It has soft sounds, heartfelt lyrics, and beautiful playing.<br><br>But today, this music is slowly disappearing. Many people forget about it because of new things and busy lives. We need to help keep it alive!<br><br>By doing these things, we honour our cultural identity and ensure that future generations can enjoy and learn from this unique musical tradition.`,
    },
  },
  {
    id: "V",
    title: "V. Word Formation",
    meta: "1.5 điểm • 6 câu",
    range: [29, 34],
  },
  {
    id: "VI",
    title: "VI. Dictionary Entry",
    meta: "0.5 điểm • 2 câu",
    range: [35, 36],
  },
  {
    id: "VII",
    title: "VII. Viết lại câu",
    meta: "1.0 điểm • 4 câu",
    range: [37, 40],
  },
];

// Helper to build a single-choice (Sentence-Rewrite) block as essay-with-prompt.
// (Legacy `rewrite` from de-thi-render.js maps to short-answer w/ `tag = prompt`.)
function rewrite(text: string, prompt: string): ShortAnswerBlock {
  return { type: "short-answer", text, tag: prompt };
}

export const QUESTIONS: Record<number, QuestionBlock> = {
  // ── Section I: 14 MCQ ──
  1: {
    type: "single-choice",
    text: "Which word has the underlined part pronounced differently from that of the others?",
    opts: ["stay<u>s</u>", "know<u>s</u>", "reset<u>s</u>", "burn<u>s</u>"],
  },
  2: {
    type: "single-choice",
    text: "Which word has the underlined part pronounced differently from that of the others?",
    opts: ["s<u>e</u>ll", "f<u>e</u>nce", "tr<u>e</u>nd", "m<u>e</u>"],
  },
  3: {
    type: "single-choice",
    text: "Which word has a different stress pattern from that of the others?",
    opts: ["future", "equip", "modern", "happy"],
  },
  4: {
    type: "single-choice",
    text: "Which word has a different stress pattern from that of the others?",
    opts: ["discover", "beautiful", "digital", "educate"],
  },
  5: {
    type: "single-choice",
    text: `<span class="speaker">Helen:</span> You seem to be busy with something. What's that, Sam?<br><span class="speaker">Sam:</span> I _________ an article about our school festival.`,
    opts: ["wrote", "am writing", "write", "have written"],
  },
  6: {
    type: "single-choice",
    text: `<span class="speaker">Harry:</span> Where's the cat? I can't find it anywhere.<br><span class="speaker">Luke:</span> It might be _________ the table, sleeping again.`,
    opts: ["in", "over", "under", "between"],
  },
  7: {
    type: "single-choice",
    text: `<span class="speaker">Thomas:</span> Are you keen _________ joining the art club this term?`,
    opts: ["at", "with", "in", "on"],
  },
  8: {
    type: "single-choice",
    text: `<span class="speaker">David:</span> The teacher says we must _________ a survey on local recycling.`,
    opts: ["break down", "come across", "carry out", "go over"],
  },
  9: {
    type: "single-choice",
    text: `<span class="speaker">Mike:</span> Do you know the girl _________ won the school's singing contest?`,
    opts: ["who", "whom", "which", "whose"],
  },
  10: {
    type: "single-choice",
    text: `<span class="speaker">Mark:</span> How do you describe your new teacher of English?<br><span class="speaker">Helen:</span> He's amazing. He's a/an _________ teacher; that's why we respect him.`,
    opts: ["dull", "old-fashioned", "dedicated", "timid"],
  },
  11: {
    type: "single-choice",
    text: `<span class="speaker">Ben:</span> _________ it's raining, shall we still go for a walk?`,
    opts: ["Because", "But", "Although", "So"],
  },
  12: {
    type: "single-choice",
    text: `<span class="speaker">Minh:</span> How often do you go out for a movie or concert?<br><span class="speaker">Long:</span> Not quite often! I don't have much time for _________`,
    opts: ["entertainment", "knowledge", "training", "sports"],
  },
  13: {
    type: "single-choice",
    text: `<span class="speaker">Christ:</span> Have a wonderful holiday, Minh! — <span class="speaker">Minh:</span> _________.`,
    opts: ["I've no idea.", "What's happening?", "OK, we do, too.", "Thanks! The same to you!"],
  },
  14: {
    type: "single-choice",
    text: `<span class="speaker">Caroline:</span> _________.<br><span class="speaker">Lisa:</span> Sorry, the bus broke down on the way here.`,
    opts: [
      "How do you go to school every day?",
      "Where have you been? I've been waiting for ages!",
      "Can you see the bus stop down the street?",
      "Buses are punctual, and it's cheap to travel on them",
    ],
  },

  // ── Section II: 2 sign MCQ ──
  15: {
    type: "single-choice",
    subtype: "sign",
    text: "What does the sign tell you to do?",
    sign: "⚠ SCHOOL ZONE — Học sinh qua đường",
    opts: [
      "Give the pupils a lift",
      "Slow down; school pupils ahead",
      "Take good care of kids",
      "Pay no attention to kids",
    ],
  },
  16: {
    type: "single-choice",
    subtype: "sign",
    text: "What does the sign say?",
    sign: "⚠ CAUTION: SLIPPERY WHEN WET",
    opts: [
      "You can dance on the floor",
      "You must dry the floor first",
      "The floor is always slippery",
      "Be careful walking if it's wet",
    ],
  },

  // ── Section III: 6 cloze MCQ ──
  17: { type: "single-choice", subtype: "cloze", blankRef: 17, text: "(17)", opts: ["movie", "job", "sport", "work"] },
  18: { type: "single-choice", subtype: "cloze", blankRef: 18, text: "(18)", opts: ["open", "empty", "tall", "narrow"] },
  19: { type: "single-choice", subtype: "cloze", blankRef: 19, text: "(19)", opts: ["time", "stress", "hope", "energy"] },
  20: { type: "single-choice", subtype: "cloze", blankRef: 20, text: "(20)", opts: ["think", "relax", "train", "perform"] },
  21: { type: "single-choice", subtype: "cloze", blankRef: 21, text: "(21)", opts: ["quick", "slow", "hard", "heavy"] },
  22: { type: "single-choice", subtype: "cloze", blankRef: 22, text: "(22)", opts: ["of", "for", "with", "in"] },

  // ── Section IV: 4 T/F + 2 reading-comp MCQ ──
  23: { type: "true-false", text: "Đờn ca tài tử originated from the South of Vietnam." },
  24: { type: "true-false", text: "Đờn ca tài tử is very popular with young people nowadays." },
  25: { type: "true-false", text: "To keep Đờn ca tài tử alive, we should teach it in schools." },
  26: { type: "true-false", text: "Online platforms have nothing to do with the preservation of Đờn ca tài tử." },
  27: {
    type: "single-choice",
    subtype: "comprehension",
    text: "According to the passage, Đờn ca tài tử is slowly disappearing because",
    opts: [
      "it doesn't have much value",
      "no good musicians can play it",
      "people are more interested in new things",
      "it is no longer played at community events",
    ],
  },
  28: {
    type: "single-choice",
    subtype: "comprehension",
    text: "All of the following are mentioned EXCEPT _________",
    opts: [
      "heartfelt lyrics",
      "supporting local musicians",
      "scientific seminars",
      "saving is more than preserving the past",
    ],
  },

  // ── Section V: 6 short-answer (word form) ──
  29: { type: "short-answer", text: "The kids are looking at the balloons _________ at the school gate.", tag: "color" },
  30: { type: "short-answer", text: 'John Brown won the special prize for "_________ Performance" in the last festival.', tag: "impress" },
  31: { type: "short-answer", text: "_________, quite a few students scored very high in the mid-term test.", tag: "surprise" },
  32: { type: "short-answer", text: "Most families in Sweden have their homes _________ by solar energy.", tag: "heat" },
  33: { type: "short-answer", text: "The student asked his teacher for _________ to leave the classroom.", tag: "permit" },
  34: { type: "short-answer", text: "There was an informative _________ about wildlife protection on HTV9.", tag: "document" },

  // ── Section VI: 2 dictionary short-answer ──
  35: { type: "short-answer", text: "I'll give you this _________, and you can use it in your essay.", tag: "information" },
  36: { type: "short-answer", text: "For _________, please contact us without hesitation.", tag: "information" },

  // ── Section VII: 4 sentence rewrite ──
  37: rewrite("Kate finds it difficult to cook a decent meal.", "Kate has"),
  38: rewrite("They haven't met each other for quite some time.", "It has been"),
  39: rewrite("This language school is better than any other one in the area.", "No other"),
  40: rewrite("The team finally produced a good solution to the problem.", "The team finally came"),
};

// ============================================================================
// MOCK EXAMS — 3 demo cases (1 mã / 13 mã / 24 mã)
// ============================================================================
//
// Slug mimics real CMS slugs so the eventual swap (mock → API) is mechanical.
// All 3 mocks share the same SECTIONS + QUESTIONS skeleton above — only meta
// differs (slug, title, code count, demo phase, etc.).
// ============================================================================

export const EXAM_DE_MAU_1MA: Exam = {
  meta: {
    slug: "de-mau-thpt-qg-2026-tieng-anh",
    title: "Đề tham khảo THPT Quốc gia 2026",
    subjectLabel: "Môn Tiếng Anh",
    description:
      "Đề tham khảo chính thức của Bộ GD&ĐT cho kỳ thi tốt nghiệp THPT Quốc gia 2026 môn Tiếng Anh. Đề gồm 40 câu trắc nghiệm — thời gian 60 phút. Dùng để luyện tập trước kỳ thi.",
    totalQuestions: 40,
    durationMinutes: 60,
    examDate: "10/05/2026",
    views: "42.180",
    numCodes: 1,
    numCodesReady: 1,
    showOnlineOption: true,
    pdfEnabled: true,
    demoMode: "ready-1",
  },
  sections: SECTIONS,
  questions: QUESTIONS,
};

export const EXAM_THI_THU_13MA: Exam = {
  meta: {
    slug: "de-thi-thu-thpt-2026-tieng-anh",
    title: "Đề thi thử tốt nghiệp THPT 2026 — Sở GD Hà Nội",
    subjectLabel: "Môn Tiếng Anh",
    description:
      "Đề thi thử tốt nghiệp THPT 2026 môn Tiếng Anh do Sở GD&ĐT Hà Nội tổ chức — 13 mã đề, 40 câu trắc nghiệm, 60 phút. Cập nhật ngay sau giờ thi.",
    totalQuestions: 40,
    durationMinutes: 60,
    examDate: "15/06/2026",
    views: "98.420",
    numCodes: 13,
    numCodesReady: 5,
    showOnlineOption: false,
    pdfEnabled: false,
    demoMode: "ready-multi",
  },
  sections: SECTIONS,
  questions: QUESTIONS,
};

export const EXAM_THPT_24MA: Exam = {
  meta: {
    slug: "de-thi-thpt-qg-2026-tieng-anh",
    title: "Đề thi tốt nghiệp THPT Quốc gia 2026",
    subjectLabel: "Môn Tiếng Anh",
    description:
      "Đề thi chính thức Kỳ thi tốt nghiệp THPT Quốc gia 2026 môn Tiếng Anh. Đề gồm 40 câu trắc nghiệm bao quát ngữ âm, ngữ pháp, đọc hiểu, từ vựng và viết lại câu — thời gian làm bài 60 phút. Tổ chức thi đồng loạt toàn quốc theo Bộ GD&ĐT.",
    totalQuestions: 40,
    durationMinutes: 60,
    examDate: "27/06/2026",
    views: "284.300",
    numCodes: 24,
    numCodesReady: 8,
    showOnlineOption: true,
    pdfEnabled: false,
    demoMode: "ready-multi",
  },
  sections: SECTIONS,
  questions: QUESTIONS,
};

const MOCKS_BY_SLUG: Record<string, Exam> = {
  [EXAM_DE_MAU_1MA.meta.slug]: EXAM_DE_MAU_1MA,
  [EXAM_THI_THU_13MA.meta.slug]: EXAM_THI_THU_13MA,
  [EXAM_THPT_24MA.meta.slug]: EXAM_THPT_24MA,
};

export function getExamBySlug(slug: string): Exam | null {
  return MOCKS_BY_SLUG[slug] ?? null;
}

export function getAllExamSlugs(): string[] {
  return Object.keys(MOCKS_BY_SLUG);
}

/**
 * Build an Exam from a CMS exam doc. Sections + questions reuse the mock
 * skeleton (real question import comes later). Meta is derived from CMS
 * fields with sensible defaults for fields the CMS does not yet expose.
 */
export function examFromCms(cms: {
  slug: string;
  title: string;
  category: string;
  examType: string;
  year: string;
  province?: { slug: string; name: string } | null;
  pdfFile?: unknown;
  answerFile?: unknown;
  _status: 'draft' | 'published';
  createdAt: string;
}): Exam {
  const hasPdf = Boolean(cms.pdfFile);
  const hasAnswer = Boolean(cms.answerFile);
  const subjectLabel = 'Môn Tiếng Anh';
  const provinceLabel = cms.province?.name ? ` ${cms.province.name}` : '';
  const examTypeLabel = cms.examType === 'chinh-thuc' ? 'chính thức'
    : cms.examType === 'thi-thu' ? 'thi thử'
    : 'minh hoạ';
  const description = `Đề ${examTypeLabel}${provinceLabel} năm ${cms.year}. ${subjectLabel}. 40 câu trắc nghiệm, 60 phút.`;

  let demoMode: 'waiting' | 'ready-1' | 'ready-multi' = 'waiting';
  let numCodesReady = 0;
  if (cms._status === 'published' && hasPdf) {
    demoMode = 'ready-1';
    numCodesReady = 1;
  }
  const examDate = (() => {
    const d = new Date(cms.createdAt);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}/${d.getFullYear()}`;
  })();

  return {
    meta: {
      slug: cms.slug,
      title: cms.title,
      subjectLabel,
      description,
      totalQuestions: 40,
      durationMinutes: 60,
      examDate,
      views: '0',
      numCodes: 1,
      numCodesReady,
      showOnlineOption: true,
      pdfEnabled: hasPdf,
      demoMode,
    },
    sections: SECTIONS,
    questions: QUESTIONS,
  };
}

// ============================================================================
// STATE MACHINE — phase + code statuses
// ============================================================================

export type Phase = "waiting" | "ready-1" | "ready-multi";
export type CodeStatus = "ready" | "pending";

export type ExamCode = {
  code: string;
  status: CodeStatus;
  /** Marks the freshly-arrived code (chat13). */
  isNew: boolean;
};

export function generateCodes(n: number): string[] {
  const codes: string[] = [];
  for (let i = 0; i < n; i++) codes.push(String(101 + i));
  return codes;
}

export function getCodeStatuses(meta: Pick<ExamMeta, "numCodes" | "numCodesReady">): ExamCode[] {
  const all = generateCodes(meta.numCodes);
  return all.map((code, i) => ({
    code,
    status: i < meta.numCodesReady ? "ready" : "pending",
    isNew:
      meta.numCodesReady > 0 &&
      i === meta.numCodesReady - 1 &&
      meta.numCodesReady < meta.numCodes,
  }));
}

export function resolvePhase(
  meta: Pick<ExamMeta, "demoMode" | "numCodesReady" | "numCodes">,
): Phase {
  if (meta.demoMode === "waiting") return "waiting";
  if (meta.demoMode === "ready-1") return "ready-1";
  if (meta.numCodesReady === 0) return "waiting";
  // 1 mã đề = đề cũ/đề mẫu/đề luyện — không cần tab chọn mã, coerce về ready-1.
  // Khớp resolveState() trong design v2 de-thi-render.js (chat25).
  if (meta.numCodes <= 1) return "ready-1";
  return "ready-multi";
}

/**
 * Pick active mã đề. Priority:
 *   1. `requestedMa` if present in list
 *   2. First `ready` code
 *   3. First code
 */
export function pickActiveCode(codes: ExamCode[], requestedMa?: string | null): ExamCode | null {
  if (codes.length === 0) return null;
  if (requestedMa) {
    const found = codes.find((c) => c.code === requestedMa);
    if (found) return found;
  }
  return codes.find((c) => c.status === "ready") ?? codes[0];
}

// ============================================================================
// STATUS STRIP COPY
// ============================================================================

export type StatusStripVariant = "is-waiting" | "is-mixed" | "is-ready";

export type StatusStripContent = {
  variant: StatusStripVariant;
  /** HTML allowed. */
  html: string;
  action?: { label: string; href: string };
};

export function buildStatusStrip(meta: ExamMeta): StatusStripContent {
  const phase = resolvePhase(meta);
  const codes = getCodeStatuses(meta);
  const readyN = codes.filter((c) => c.status === "ready").length;
  const totalN = codes.length;

  if (phase === "waiting") {
    return {
      variant: "is-waiting",
      html: `<b>Đang chờ đề lên hệ thống.</b> Đề sẽ được cập nhật ngay khi có (thường trong vòng 30–60 phút sau giờ thi kết thúc).`,
      action: { label: "🔔 Báo tôi khi có đề", href: "#notify" },
    };
  }

  if (phase === "ready-1") {
    return {
      variant: "is-ready",
      html: `<b>Đề đã sẵn sàng.</b> Cập nhật <b>27/06/2026 11:23</b>. Đáp án dự kiến công bố sau 2–4 giờ.`,
    };
  }

  // ready-multi
  if (readyN < totalN) {
    return {
      variant: "is-mixed",
      html: `<b>Đã có ${readyN}/${totalN} mã đề.</b> Các mã còn lại đang được cập nhật — nhân viên istudy gõ liên tục, dự kiến đủ trong vòng 2 giờ.`,
    };
  }
  return {
    variant: "is-ready",
    html: `<b>Đã có đủ ${totalN} mã đề.</b> Cập nhật xong lúc <b>27/06/2026 13:08</b>. Đáp án đang được giải bởi giáo viên 9.0 IELTS / GV THPT.`,
  };
}

// ============================================================================
// PDF FILENAME
// ============================================================================

export function pdfFilename(maCode?: string | null): string {
  return maCode
    ? `De_thi_THPT_2026_TiengAnh_ma_${maCode}.pdf`
    : `De_thi_THPT_2026_TiengAnh.pdf`;
}

// ============================================================================
// TIMER UTILITY
// ============================================================================

export function formatTimer(seconds: number): { mm: string; ss: string } {
  const safe = Math.max(0, seconds);
  const mm = Math.floor(safe / 60).toString().padStart(2, "0");
  const ss = (safe % 60).toString().padStart(2, "0");
  return { mm, ss };
}
