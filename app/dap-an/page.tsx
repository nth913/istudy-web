import Link from "next/link";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DAP_AN_CSS } from "@/lib/page-css/dap-an";
import { DapAnActionLink, NotifyDapAnForm, RelatedLink } from "./DapAnActions";
import {
  answerKeyForCode,
  buildAnswerCardMeta,
  buildStatusStripCopy,
  DEFAULT_DAP_AN_STATE,
  getCodeStatuses,
  normalizeDapAnState,
  resolveActiveMa,
  resolveStatePhase,
  type CodeEntry,
} from "@/lib/render/dap-an";

export const metadata = {
  title: "Đáp án — Đề tham khảo vào lớp 10 TP.HCM 2026 — istudy",
  description:
    "Đáp án đề tham khảo vào lớp 10 TP.HCM 2026 — môn Tiếng Anh. Đáp án chính thức từ istudy Team, cập nhật theo từng mã đề.",
};

// ─────────────────────── Mock data ────────────────────────────
// 1 đề Tiếng Anh "Đề minh hoạ vào 10 TPHCM 2026", ~10 câu mẫu phủ nhiều dạng.

type AnswerBanner = { label: string; value: ReactNode; variant?: "is-false" };

type Question = {
  kind: "q";
  cau: number;
  pillClass?: "is-short" | "is-write";
  qtype: string;
  topicEmoji: string;
  topic: string;
  relatedHref?: string;
  relatedLabel?: string;
  stem: ReactNode;
  errStem?: ReactNode;
  options?: { letter: string; text: ReactNode; correct?: boolean }[];
  answerBanner?: AnswerBanner;
  answerBanners?: AnswerBanner[];
  model?: ReactNode;
  explanation: ReactNode;
  explToggleLabel?: string;
};

type ContextCard = {
  kind: "ctx";
  id: string;
  label: string;
  body?: ReactNode;
  audio?: { duration: string; track: string; color?: "purple" | "orange" };
  transcript?: ReactNode;
};

type Item = Question | ContextCard;

const items: Item[] = [
  // 1 — Hoàn thành câu
  {
    kind: "q",
    cau: 1,
    qtype: "Hoàn thành câu",
    topicEmoji: "📗",
    topic: "Câu điều kiện loại 2",
    relatedHref: "#",
    stem: <>If I _______ enough money, I would travel around the world next summer.</>,
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "had", correct: true },
      { letter: "C", text: "have had" },
      { letter: "D", text: "will have" },
    ],
    explanation: (
      <>
        <p>
          <strong>Câu điều kiện loại 2</strong> diễn tả điều không có thật ở hiện tại / tương lai.
        </p>
        <ul>
          <li>
            Công thức: <strong>If + S + V(quá khứ đơn), S + would + V(bare)</strong>.
          </li>
          <li>
            Vế sau là &quot;would travel&quot; → vế if bắt buộc dùng <strong>quá khứ đơn</strong>.
          </li>
          <li>
            Đáp án: <strong>B. had</strong>.
          </li>
        </ul>
        <div className="tip">💡 Mẹo: thấy &quot;would/could + V&quot; ở vế sau, vế if đi với quá khứ đơn.</div>
      </>
    ),
  },
  // 2 — Tìm lỗi sai
  {
    kind: "q",
    cau: 2,
    qtype: "Tìm lỗi sai",
    topicEmoji: "📗",
    topic: "Despite / Although",
    relatedHref: "#",
    stem: <span style={{ color: "var(--g500)", fontSize: 13 }}>Identify the error in the underlined part:</span>,
    errStem: (
      <>
        <span className="err-tag is-error">
          <span className="lab">A</span>Despite
        </span>{" "}
        the rain{" "}
        <span className="err-tag">
          <span className="lab">B</span>was heavy
        </span>
        , we{" "}
        <span className="err-tag">
          <span className="lab">C</span>decided to continue
        </span>{" "}
        our trip to the{" "}
        <span className="err-tag">
          <span className="lab">D</span>countryside
        </span>
        .
      </>
    ),
    answerBanner: {
      label: "Lỗi tại vị trí A · Câu đúng:",
      value: "Although the rain was heavy, we decided to continue our trip to the countryside.",
    },
    explanation: (
      <>
        <p>
          Lỗi tại vị trí <strong>A: &quot;Despite&quot;</strong>
        </p>
        <ul>
          <li>
            <strong>Despite + N / V-ing</strong>, không đi với mệnh đề.
          </li>
          <li>Sau &quot;Despite&quot; là cả một mệnh đề &quot;the rain was heavy&quot; → sai.</li>
          <li>
            Sửa: <strong>Although</strong> the rain was heavy, ... HOẶC <strong>Despite</strong> the heavy rain, ...
          </li>
        </ul>
      </>
    ),
  },
  // 3 — Đồng nghĩa
  {
    kind: "q",
    cau: 3,
    qtype: "Tìm từ đồng nghĩa",
    topicEmoji: "📕",
    topic: "Từ vựng · Tính từ",
    relatedHref: "#",
    relatedLabel: "Xem từ vựng liên quan",
    stem: (
      <>
        Choose the word CLOSEST in meaning to the underlined word.
        <br />
        The professor&apos;s lecture was extremely <u>fascinating</u> and kept everyone engaged.
      </>
    ),
    options: [
      { letter: "A", text: "boring" },
      { letter: "B", text: "captivating", correct: true },
      { letter: "C", text: "ordinary" },
      { letter: "D", text: "confusing" },
    ],
    explanation: (
      <>
        <ul>
          <li>
            <strong>fascinating</strong> = rất hấp dẫn, lôi cuốn.
          </li>
          <li>
            Từ đồng nghĩa gần nhất là <strong>captivating</strong> (lôi cuốn).
          </li>
        </ul>
        <div className="vocab">
          <div>
            <span className="w">fascinating</span>
            <span>= captivating, intriguing, gripping</span>
          </div>
          <div>
            <span className="w">boring</span>
            <span>(trái nghĩa) nhàm chán</span>
          </div>
        </div>
      </>
    ),
  },
  // 4 — Trái nghĩa
  {
    kind: "q",
    cau: 4,
    qtype: "Tìm từ trái nghĩa",
    topicEmoji: "📕",
    topic: "Từ vựng · Tính từ",
    stem: (
      <>
        Choose the word OPPOSITE in meaning to the underlined word.
        <br />
        She is well-known for her <u>generous</u> donations to charity.
      </>
    ),
    options: [
      { letter: "A", text: "kind" },
      { letter: "B", text: "helpful" },
      { letter: "C", text: "stingy", correct: true },
      { letter: "D", text: "caring" },
    ],
    explanation: (
      <ul>
        <li>
          <strong>generous</strong> = hào phóng.
        </li>
        <li>
          Trái nghĩa là <strong>stingy</strong> = keo kiệt, bủn xỉn.
        </li>
        <li>A, B, D đều là từ đồng nghĩa với generous.</li>
      </ul>
    ),
  },
  // 5 — Chia động từ
  {
    kind: "q",
    cau: 5,
    pillClass: "is-short",
    qtype: "Chia động từ",
    topicEmoji: "📗",
    topic: "Quá khứ hoàn thành",
    relatedHref: "#",
    stem: (
      <>
        By the time we arrived at the cinema, the movie <em>(start)</em> ____ for half an hour.
      </>
    ),
    answerBanner: { label: "Đáp án", value: "had started" },
    explanation: (
      <>
        <ul>
          <li>
            &quot;By the time + S + V(quá khứ đơn)&quot; → vế chính dùng <strong>quá khứ hoàn thành (had + V3)</strong>.
          </li>
          <li>Diễn tả hành động xảy ra trước hành động khác trong quá khứ.</li>
        </ul>
        <div className="tip">💡 Dấu hiệu: &quot;by the time&quot;, &quot;before&quot;, &quot;after&quot; + quá khứ đơn → vế kia quá khứ hoàn thành.</div>
      </>
    ),
  },
  // ctx-cloze
  {
    kind: "ctx",
    id: "ctx-cloze",
    label: "📄 Đoạn văn (cloze) — dùng cho Câu 6 – 7",
    body: (
      <>
        Plastic pollution is one of the biggest environmental problems today. Every year, millions of tons of plastic{" "}
        <strong style={{ color: "var(--green)" }}>(6) end up</strong> in our oceans, harming marine life and ecosystems. To{" "}
        <strong style={{ color: "var(--green)" }}>(7) tackle</strong> this issue, many countries have started banning single-use plastics.
      </>
    ),
  },
  // 6 — Cloze passage
  {
    kind: "q",
    cau: 6,
    qtype: "Hoàn thành đoạn văn",
    topicEmoji: "📗",
    topic: "Hoà hợp chủ–vị",
    relatedHref: "#",
    stem: (
      <>
        … millions of tons of plastic <strong>(6) ______</strong> in our oceans …
      </>
    ),
    options: [
      { letter: "A", text: "have" },
      { letter: "B", text: "has" },
      { letter: "C", text: "end up", correct: true },
      { letter: "D", text: "ends up" },
    ],
    explanation: (
      <ul>
        <li>
          Chủ ngữ &quot;millions of tons&quot; (số nhiều) + &quot;every year&quot; (hiện tại đơn) → động từ{" "}
          <strong>nguyên thể không s</strong>.
        </li>
        <li>
          Cụm <strong>end up + V-ing / in</strong> = kết thúc / cuối cùng ở đâu.
        </li>
      </ul>
    ),
  },
  // 7 — Cloze passage 2
  {
    kind: "q",
    cau: 7,
    qtype: "Hoàn thành đoạn văn",
    topicEmoji: "📗",
    topic: "To + V(bare)",
    stem: (
      <>
        To <strong>(7) ______</strong> this issue, many countries have started banning single-use plastics.
      </>
    ),
    options: [
      { letter: "A", text: "tackle", correct: true },
      { letter: "B", text: "tackling" },
      { letter: "C", text: "tackled" },
      { letter: "D", text: "tackles" },
    ],
    explanation: (
      <ul>
        <li>&quot;To + V(bare)&quot; — sau &quot;to&quot; là động từ nguyên thể.</li>
        <li>
          <strong>tackle</strong> = giải quyết (vấn đề).
        </li>
      </ul>
    ),
  },
  // ctx-reading
  {
    kind: "ctx",
    id: "ctx-reading",
    label: "📄 Đoạn đọc hiểu — dùng cho Câu 8",
    body: (
      <>
        <strong>The Rise of Online Learning</strong>
        <br />
        Online learning has grown rapidly in the past decade, especially after the COVID-19 pandemic. Many universities now offer
        courses entirely online, allowing students from around the world to access quality education. However, online learning
        also has drawbacks. Experts agree that a <strong>blended approach</strong>, combining online and in-person classes, often
        produces the best results.
      </>
    ),
  },
  // 8 — Đọc hiểu
  {
    kind: "q",
    cau: 8,
    qtype: "Đọc hiểu",
    topicEmoji: "📘",
    topic: "Ý chính của đoạn",
    relatedHref: "#",
    stem: <>What is the main idea of the passage?</>,
    options: [
      { letter: "A", text: "Online learning is always better than traditional classes" },
      { letter: "B", text: "Online learning has both pros and cons, and blended is ideal", correct: true },
      { letter: "C", text: "Universities will close because of online education" },
      { letter: "D", text: "Students prefer studying at home" },
    ],
    explanation: (
      <ul>
        <li>Đoạn văn nêu cả ưu điểm và nhược điểm.</li>
        <li>
          Kết luận đề cao mô hình <strong>blended approach</strong>.
        </li>
        <li>→ Đáp án B phản ánh đầy đủ ý chính.</li>
      </ul>
    ),
  },
  // 9 — Viết lại câu
  {
    kind: "q",
    cau: 9,
    pillClass: "is-short",
    qtype: "Viết lại câu",
    topicEmoji: "📗",
    topic: "Hiện tại hoàn thành · since/for",
    relatedHref: "#",
    stem: (
      <>
        &quot;I haven&apos;t seen Tom for two years.&quot; → <em>(since)</em>
      </>
    ),
    answerBanners: [
      { label: "Đáp án", value: "It is two years since I last saw Tom." },
      { label: "Hoặc", value: "The last time I saw Tom was two years ago." },
    ],
    explanation: (
      <>
        <p>Các cấu trúc tương đương:</p>
        <ul>
          <li>S + haven&apos;t + V3 + for + (thời gian)</li>
          <li>= The last time + S + V(quá khứ) + was + (thời gian) + ago</li>
          <li>= It is + (thời gian) + since + S + last + V(quá khứ)</li>
        </ul>
      </>
    ),
  },
  // 10 — Kết hợp câu
  {
    kind: "q",
    cau: 10,
    pillClass: "is-short",
    qtype: "Kết hợp câu",
    topicEmoji: "📗",
    topic: "Mệnh đề mục đích · so that",
    relatedHref: "#",
    stem: (
      <>
        She studied very hard. She wanted to pass the entrance exam. <em>(so that)</em>
      </>
    ),
    answerBanner: { label: "Đáp án", value: "She studied very hard so that she could pass the entrance exam." },
    explanation: (
      <ul>
        <li>
          <strong>so that + S + can/could + V</strong> = để mà (chỉ mục đích).
        </li>
        <li>
          Vế trước &quot;studied&quot; là quá khứ → dùng <strong>could</strong> cho hài hoà thì.
        </li>
      </ul>
    ),
  },
  // 11 — Viết email
  {
    kind: "q",
    cau: 11,
    pillClass: "is-write",
    qtype: "Viết email",
    topicEmoji: "✍️",
    topic: "Writing · 80–100 từ",
    relatedHref: "#",
    stem: (
      <>
        Write an email (80–100 words) to your friend Mai, telling her about a book you have recently read. Include: (1) book&apos;s
        title and author, (2) why you liked it, (3) recommendation.
      </>
    ),
    model: (
      <>
        <div className="ml">✍️ Bài mẫu tham khảo (96 từ)</div>
        Hi Mai,
        <br />
        How are you? I&apos;m writing to tell you about a wonderful book I&apos;ve just finished reading. It&apos;s called{" "}
        <em>&quot;The Little Prince&quot;</em> by Antoine de Saint-Exupéry — a short novel I borrowed from our library.
        <br />
        <br />
        I really enjoyed it because the story is simple but full of meaning. It teaches us about friendship, love, and what truly
        matters in life.
        <br />
        <br />
        I think you&apos;d love it too. Let me know when you finish it!
        <br />
        <br />
        Best,
        <br />
        Linh
      </>
    ),
    explToggleLabel: "Tiêu chí chấm điểm",
    explanation: (
      <>
        <div className="expl-title">🍎 Tiêu chí chấm (2.0 điểm)</div>
        <ul>
          <li>
            <strong>Cấu trúc email (0.5đ):</strong> chào hỏi, body chia đoạn rõ, kết &amp; ký tên.
          </li>
          <li>
            <strong>Nội dung (0.75đ):</strong> đủ 3 ý — tên sách + tác giả, lý do thích, gợi ý đọc.
          </li>
          <li>
            <strong>Ngữ pháp &amp; từ vựng (0.5đ):</strong> đa dạng thì, từ vựng phong phú.
          </li>
          <li>
            <strong>Mạch lạc (0.25đ):</strong> dùng từ nối, ý kế thừa nhau.
          </li>
        </ul>
      </>
    ),
  },
  // ctx-audio-1
  {
    kind: "ctx",
    id: "ctx-audio-1",
    label: "🎧 Bài nghe 1 — dùng cho Câu 12",
    audio: { duration: "0:00 / 1:24", track: "Track 1" },
    transcript: (
      <>
        <span className="speaker">Anna:</span> Hi John, are you free on Saturday evening?
        <br />
        <span className="speaker">John:</span> Actually, I&apos;m planning to attend a concert at the City Hall. It starts at 7.
        <br />
        <span className="speaker">Anna:</span> Oh, sounds great! Who&apos;s performing?
        <br />
        <span className="speaker">John:</span> A local jazz band. The tickets are only 100,000 VND. Want to join me?
      </>
    ),
  },
  // 12 — Nghe MC
  {
    kind: "q",
    cau: 12,
    qtype: "Nghe trắc nghiệm",
    topicEmoji: "🎧",
    topic: "Chi tiết thông tin",
    stem: <>What time does the concert start?</>,
    options: [
      { letter: "A", text: "6:00 PM" },
      { letter: "B", text: "6:30 PM" },
      { letter: "C", text: "7:00 PM", correct: true },
      { letter: "D", text: "7:30 PM" },
    ],
    explanation: (
      <ul>
        <li>
          John nói: &quot;<em>It starts at 7</em>.&quot; → đáp án C.
        </li>
      </ul>
    ),
  },
  // ctx-audio-2
  {
    kind: "ctx",
    id: "ctx-audio-2",
    label: "🎧 Bài nghe 2 — dùng cho Câu 13",
    audio: { duration: "0:00 / 0:48", track: "Track 2", color: "orange" },
    transcript: (
      <em>
        Good morning everyone. Due to the heavy rain, today&apos;s outdoor sports activities have been cancelled. The science fair
        scheduled for tomorrow will still go ahead as planned. Thank you.
      </em>
    ),
  },
  // 13 — Nghe T/F
  {
    kind: "q",
    cau: 13,
    qtype: "Nghe đúng / sai",
    topicEmoji: "🎧",
    topic: "Suy luận đồng nghĩa",
    stem: <>Today&apos;s outdoor sports activities have been postponed because of bad weather.</>,
    answerBanner: {
      label: "Đáp án · TRUE",
      value: <>&quot;cancelled&quot; = đã bị huỷ vì heavy rain (bad weather).</>,
    },
    explanation: (
      <ul>
        <li>
          Trong bài: &quot;<em>Due to the heavy rain, today&apos;s outdoor sports activities have been cancelled.</em>&quot;
        </li>
        <li>&quot;due to heavy rain&quot; = vì mưa lớn (bad weather). → TRUE.</li>
      </ul>
    ),
  },
  // ctx-audio-3
  {
    kind: "ctx",
    id: "ctx-audio-3",
    label: "🎧 Bài nghe 3 — Library Membership Form (Câu 14)",
    audio: { duration: "0:00 / 1:12", track: "Track 3" },
    body: (
      <>
        <strong>Library Membership Form</strong>
        <br />
        Full name: <em>Sarah Johnson</em>
        <br />
        Date of birth: <strong style={{ color: "var(--green)" }}>(14) _____________</strong>
      </>
    ),
  },
  // 14 — Nghe điền từ
  {
    kind: "q",
    cau: 14,
    pillClass: "is-short",
    qtype: "Nghe điền từ",
    topicEmoji: "🎧",
    topic: "Số đếm · Ngày tháng",
    relatedHref: "#",
    stem: (
      <>
        Điền vào ô <strong>(14) Date of birth</strong> (không quá 3 từ).
      </>
    ),
    answerBanner: { label: "Đáp án", value: "15 March 2008" },
    explanation: (
      <ul>
        <li>
          Audio: &quot;<em>I was born on the fifteenth of March, two thousand and eight.</em>&quot;
        </li>
        <li>
          Viết theo định dạng ngày: <strong>15 March 2008</strong>. Chấp nhận 15/03/2008.
        </li>
      </ul>
    ),
  },
  // ctx-audio-4
  {
    kind: "ctx",
    id: "ctx-audio-4",
    label: "🎧 Bài nghe 4 — Podcast với Dr. Lan (Câu 15)",
    audio: { duration: "0:00 / 1:36", track: "Track 4" },
    transcript: (
      <em>
        Welcome to today&apos;s podcast. We&apos;re talking with Dr. Lan, a marine biologist. Dr. Lan has worked at the Nha Trang
        Marine Institute for fifteen years. She believes that rising sea temperatures are the biggest threat to coral reefs today.
      </em>
    ),
  },
  // 15 — Nghe Q&A
  {
    kind: "q",
    cau: 15,
    pillClass: "is-short",
    qtype: "Nghe trả lời ngắn",
    topicEmoji: "🎧",
    topic: "Bắt ý chính",
    relatedHref: "#",
    stem: <>What does she consider the biggest threat to coral reefs?</>,
    answerBanner: { label: "Đáp án", value: "Rising sea temperatures" },
    explanation: (
      <ul>
        <li>
          Audio: &quot;<em>She believes that rising sea temperatures are the biggest threat to coral reefs today.</em>&quot;
        </li>
        <li>
          Đáp án 3–4 từ: <strong>rising sea temperatures</strong>.
        </li>
      </ul>
    ),
  },
];

// Stable pseudo-random heights for audio wave bars (avoids hydration mismatch).
const WAVE_HEIGHTS = Array.from({ length: 32 }, (_, i) => 4 + ((i * 7 + 3) % 17));

function AudioBar({ audio }: { audio: NonNullable<ContextCard["audio"]> }) {
  const orange = audio.color === "orange";
  return (
    <div className="audio-bar" role="region" aria-label={`Bài nghe ${audio.track}`}>
      <div className="play" style={orange ? { background: "var(--orange)" } : undefined} aria-hidden="true">
        ▶
      </div>
      <div className="wave" aria-hidden="true">
        {WAVE_HEIGHTS.map((h, i) => (
          <span key={i} style={{ height: `${h}px` }} />
        ))}
      </div>
      <span className="time">{audio.duration}</span>
      <span className="label" style={orange ? { color: "var(--orange)" } : undefined}>
        {audio.track}
      </span>
    </div>
  );
}

function Ctx({ c }: { c: ContextCard }) {
  const hasTranscript = !!c.transcript;
  return (
    <div className="context-card">
      <div className="ctx-label">{c.label}</div>
      {c.audio && <AudioBar audio={c.audio} />}
      {hasTranscript && (
        <details className="transcript-details">
          <summary className="transcript-toggle">📝 Xem transcript</summary>
          <div className="ctx-body transcript-body">{c.transcript}</div>
        </details>
      )}
      {c.body && <div className="ctx-body">{c.body}</div>}
    </div>
  );
}

function QCard({ q }: { q: Question }) {
  const explLabel = q.explToggleLabel ?? "Xem giải thích chi tiết";
  return (
    <details className="qcard">
      <summary className="qcard-summary" aria-label={`Câu ${q.cau} · ${q.qtype}`}>
        <div className="qhead-bar">
          <div className="qhead-meta">
            <span className={`pill-cau${q.pillClass ? " " + q.pillClass : ""}`}>Câu {q.cau}</span>
            <span className="pill-type">{q.qtype}</span>
            <span className="pill-topic">
              <span className="emo">{q.topicEmoji}</span>
              {q.topic}
            </span>
          </div>
          {q.relatedHref && (
            <RelatedLink className="related-link" label={q.relatedLabel} />
          )}
        </div>
        <div className="qbody-wrap">
          <p className="qstem">{q.stem}</p>

          {q.errStem && <div className="err-stem">{q.errStem}</div>}

          {q.options && (
            <div className="opts" role="list">
              {q.options.map((o) => (
                <div className={`opt${o.correct ? " right" : ""}`} key={o.letter} role="listitem">
                  {o.correct && (
                    <span className="check" aria-label="Đáp án đúng">
                      ✓
                    </span>
                  )}
                  <span className="lt">{o.letter}.</span> {o.text}
                </div>
              ))}
            </div>
          )}

          {q.answerBanner && (
            <div className={`answer-banner${q.answerBanner.variant ? " " + q.answerBanner.variant : ""}`}>
              <span className="icon" aria-hidden="true">
                {q.answerBanner.variant === "is-false" ? "✗" : "✓"}
              </span>
              <div>
                <div className="lbl">{q.answerBanner.label}</div>
                <div className="val">{q.answerBanner.value}</div>
              </div>
            </div>
          )}

          {q.answerBanners && (
            <div className="fill-row">
              {q.answerBanners.map((b, i) => (
                <div key={i} className={`answer-banner${b.variant ? " " + b.variant : ""}`}>
                  <span className="icon" aria-hidden="true">
                    ✓
                  </span>
                  <div>
                    <div className="lbl">{b.label}</div>
                    <div className="val">{b.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {q.model && <div className="model">{q.model}</div>}
        </div>
      </summary>

      <div className="expl-body">
        <div className="expl-content">
          {q.explToggleLabel ? null : <div className="expl-title">🍎 Giải thích chi tiết</div>}
          {q.explanation}
        </div>
      </div>

      <div className="expl-marker" aria-hidden="true">
        💡 <span>{explLabel}</span>
        <span className="chev">▼</span>
      </div>
    </details>
  );
}

// ─────────────────────── Bảng đáp án (50 câu format) ──────────────────────
const KEY_50: string[] = (() => {
  // Pad/extend to 50 entries with a deterministic mock key
  const base = [
    "C",
    "A",
    "B",
    "C",
    "had started",
    "C",
    "A",
    "B",
    "It is two years…",
    "so that she could…",
    "(bài mẫu)",
    "C",
    "TRUE",
    "15 March 2008",
    "rising sea temperatures",
  ];
  const out: string[] = [];
  const letters = ["A", "B", "C", "D"];
  for (let i = 0; i < 50; i++) {
    if (i < base.length) out.push(base[i]);
    else out.push(letters[(i * 11 + 7) % 4]);
  }
  return out;
})();

// ─────────────────────── Tab content blocks ────────────────────────────────
function DetailTabContent() {
  return (
    <div className="tab-pane active" role="tabpanel" id="pane-detail" aria-labelledby="tab-detail">
      <div className="huongdan">
        💡 <strong>Hướng dẫn:</strong> Mỗi câu hiện đầy đủ câu hỏi, các lựa chọn và đáp án đúng được highlight. Nhấn vào
        khung câu để mở rộng phần <strong>Giải thích chi tiết</strong>.
      </div>
      {items.map((it) => (it.kind === "ctx" ? <Ctx key={it.id} c={it} /> : <QCard key={`q${it.cau}`} q={it} />))}
    </div>
  );
}

function KeyTabContent() {
  return (
    <div className="tab-pane active" role="tabpanel" id="pane-key" aria-labelledby="tab-key">
      <div className="key-board" aria-label="Bảng đáp án 50 câu">
        <div className="key-title">
          BẢNG ĐÁP ÁN CHÍNH THỨC
          <div className="ln">Đề minh hoạ vào 10 TP.HCM 2026 — Môn Tiếng Anh</div>
        </div>
        <div className="key-grid">
          {KEY_50.map((a, i) => (
            <div key={i}>
              <span className="n">{i + 1}</span>
              <span className="a">{a}</span>
            </div>
          ))}
        </div>
        <div className="key-foot">— aistudy.com.vn © 2026 —</div>
      </div>
      <p className="key-print-hint">🖨️ Dùng tổ hợp <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>P</kbd> để in / lưu PDF bảng đáp án.</p>
    </div>
  );
}

function ImageTabContent() {
  return (
    <div className="tab-pane active" role="tabpanel" id="pane-image" aria-labelledby="tab-image">
      <div className="img-tab">
        {/* Ảnh đáp án chính thức đã pre-watermark (chat1 — pre-burned image is acceptable). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/uploads/024.png" alt="Ảnh đáp án chính thức từ istudy Team" />
        <div className="cap">Ảnh đáp án chính thức · Cập nhật 27/06/2026 · aistudy.com.vn</div>
      </div>
    </div>
  );
}

// ─────────────────────── Tabs bar (mã đề) ─────────────────────────────────
function TabsBar({
  codes,
  active,
  buildHref,
}: {
  codes: CodeEntry[];
  active: CodeEntry | null;
  buildHref: (ma: string) => string;
}) {
  // chat21 final:
  // - Bỏ label "Chọn mã đề:"
  // - Bỏ chip "8/24 mã đáp án nhanh"
  // - Đổi nút "Nhảy tới mã" → "Chọn mã đề" + center align
  // - tabs-scroll bar max-width ~720px, center (handled in CSS)
  // - Bỏ nút 🔔 "Báo khi đủ"
  return (
    <div className="tabs-bar" role="tablist" aria-label="Chọn mã đề">
      <div className="tabs-head">
        {/* "Chọn mã đề" jump button — pure CSS dropdown via :focus-within of <details> */}
        <details className="tabs-jump">
          <summary className="tabs-jump-btn">
            Chọn mã đề
            <span className="jump-chev" aria-hidden="true">
              ▾
            </span>
          </summary>
          <div className="tabs-jump-menu open" role="menu">
            <div className="tjm-grid">
              {codes.map((c) => {
                const isActive = active?.code === c.code;
                return (
                  <Link
                    key={c.code}
                    href={buildHref(c.code)}
                    role="menuitem"
                    className={`tjm-item is-${c.status}${isActive ? " is-active" : ""}`}
                  >
                    <span className="tjm-d" aria-hidden="true" />
                    {c.code}
                  </Link>
                );
              })}
            </div>
          </div>
        </details>
      </div>
      <div className="tabs-scroll">
        <div className="tabs-scroll-track">
          <div className="tabs-scroll-list">
            {codes.map((c) => {
              const isActive = active?.code === c.code;
              return (
                <Link
                  key={c.code}
                  href={buildHref(c.code)}
                  role="tab"
                  aria-selected={isActive}
                  className={`tab-pill is-${c.status}${isActive ? " is-active" : ""}`}
                >
                  <span className="tp-dot" aria-hidden="true" />
                  {c.code}
                  {c.isNew && (
                    <span className="tp-new" aria-label="Mới có">
                      mới
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────── Waiting card (per mã hoặc cả trang) ──────────────
function WaitingCard({ maCode, state }: { maCode?: string; state: typeof DEFAULT_DAP_AN_STATE }) {
  const phase = resolveStatePhase(state);
  const titleText = maCode
    ? `Mã đề ${maCode} — istudy Team đang giải`
    : phase === "waiting"
      ? "Đáp án đang được istudy Team giải"
      : "Đáp án đang chuẩn bị";

  const subText = maCode
    ? `istudy Team đang giải mã ${maCode} — dự kiến hoàn thành trong vòng 30–60 phút. Trong lúc chờ, bạn có thể xem đáp án các mã khác ở thanh tab phía trên.`
    : `Tổ giảng viên istudy gồm 12 thầy/cô (GV THPT chuyên + GV luyện thi top trường) đang giải đề và viết lời giải chi tiết. Đáp án sẽ được công bố theo từng mã đề — ưu tiên mã được hỏi nhiều nhất.`;

  const progressPct = maCode ? 42 : Math.round((state.soMaReady / Math.max(state.soMa, 1)) * 100);
  const progressLabel = maCode
    ? `Mã ${maCode}: ${progressPct}% câu đã giải xong`
    : `${state.soMaReady}/${state.soMa} mã đề đã có đáp án`;

  return (
    <div className="waiting-card is-dapan">
      <div className="waiting-head">
        <div className="waiting-icon-wrap" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="m8 10 2 2 4-4" />
            <path d="m8 16 2 2 4-4" />
          </svg>
        </div>
        <div className="waiting-text">
          <h2>{titleText}</h2>
          <p>{subText}</p>
        </div>
      </div>

      <div className="skel-answer-wrap">
        <div className="skel-progress">
          <div className="sp-text">{progressLabel}</div>
          <div className="sp-bar">
            <div style={{ width: `${progressPct}%` }} />
          </div>
          <div className="sp-pct">{progressPct}%</div>
        </div>
        <div className="skel-answer-grid" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <div className="skel-ans-cell" key={i}>
              <span className="ans-num">Câu {i + 1}</span>
              <span className="ans-box" />
            </div>
          ))}
        </div>
      </div>

      <div className="waiting-meta">
        <span>
          👨‍🏫 istudy Team: <b>Thầy Long, cô Hà, thầy Phúc…</b>
        </span>
        <span>
          ⏱ Dự kiến xong: <b>{maCode ? "~45 phút" : "~2 giờ"}</b>
        </span>
        <span>
          🔔 <b>{maCode ? "92" : "724"}</b> bestie đang hóng
        </span>
      </div>

      <div className="waiting-cta" id="notify">
        <Link href={`/de-thi-chi-tiet${maCode ? `?ma=${maCode}` : ""}`} className="btn btn--outline">
          ← Quay lại xem đề
        </Link>
        <NotifyDapAnForm maCode={maCode} />
      </div>
    </div>
  );
}

// ─────────────────────── Ready answer card ────────────────────────────────
function AnswerCard({ maCode, hasDetailed }: { maCode: string | null; hasDetailed: boolean }) {
  const keys = answerKeyForCode(maCode || "101");
  const meta = buildAnswerCardMeta(maCode, hasDetailed);

  return (
    <div className="ans-key-card">
      <div className="ans-key-head">
        <h3>
          <span className="ans-icon" aria-hidden="true">
            ✓
          </span>
          {meta.title}
        </h3>
        <div className="akh-meta">{meta.metaLine}</div>
      </div>

      <div className="ans-state-badges">
        {meta.badges.map((b, i) => (
          <span key={i} className={`state-badge state-badge--${b.tone}`}>
            {b.tone === "pending" && <span className="badge-dot" aria-hidden="true" />}
            {b.label}
          </span>
        ))}
      </div>

      <div className="ans-key-grid">
        {keys.map((k, i) => (
          <div className="ans-key-cell" key={i}>
            <span className="akc-n">Câu {i + 1}</span>
            <span className="akc-v">{k}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────── Page (Server Component) ──────────────────────────
type SearchParams = { tab?: string; ma?: string; mode?: string };

export default async function DapAnPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  // Tab selection: detail (default) | key | image
  const tab: "detail" | "key" | "image" =
    sp.tab === "key" || sp.tab === "image" ? sp.tab : "detail";

  // Demo mode override via ?mode=ready-1|waiting (default = ready-multi via DEFAULT_DAP_AN_STATE)
  const demoMode =
    sp.mode === "waiting" || sp.mode === "ready-1" || sp.mode === "ready-multi"
      ? sp.mode
      : DEFAULT_DAP_AN_STATE.demoMode;

  const state = normalizeDapAnState({ ...DEFAULT_DAP_AN_STATE, demoMode });
  const codes = getCodeStatuses(state);
  const phase = resolveStatePhase(state);
  const active = resolveActiveMa(codes, sp.ma);
  const strip = buildStatusStripCopy(state, codes);

  const buildTabHref = (t: "detail" | "key" | "image") => {
    const params = new URLSearchParams();
    if (t !== "detail") params.set("tab", t);
    if (sp.ma) params.set("ma", sp.ma);
    if (sp.mode && sp.mode !== DEFAULT_DAP_AN_STATE.demoMode) params.set("mode", sp.mode);
    const q = params.toString();
    return `/dap-an${q ? `?${q}` : ""}`;
  };

  const buildMaHref = (ma: string) => {
    const params = new URLSearchParams();
    if (tab !== "detail") params.set("tab", tab);
    params.set("ma", ma);
    if (sp.mode && sp.mode !== DEFAULT_DAP_AN_STATE.demoMode) params.set("mode", sp.mode);
    return `/dap-an?${params.toString()}`;
  };

  // Show tabs-bar only in ready-multi phase
  const showTabsBar = phase === "ready-multi";

  // Pick content for the detail tab: waiting card (when no answer available) vs detail items
  let detailContent: ReactNode;
  if (tab === "detail") {
    if (phase === "waiting") {
      detailContent = <WaitingCard state={state} />;
    } else if (phase === "ready-1") {
      detailContent = (
        <>
          <AnswerCard maCode="101" hasDetailed />
          <DetailTabContent />
        </>
      );
    } else {
      // ready-multi: hiển thị answer card cho mã active + (nếu active=ready) full detail
      if (!active) {
        detailContent = <WaitingCard state={state} />;
      } else if (active.status === "pending") {
        detailContent = <WaitingCard maCode={active.code} state={state} />;
      } else {
        detailContent = (
          <>
            <AnswerCard maCode={active.code} hasDetailed={active.status === "ready"} />
            {active.status === "ready" && <DetailTabContent />}
          </>
        );
      }
    }
  } else if (tab === "key") {
    detailContent = <KeyTabContent />;
  } else {
    detailContent = <ImageTabContent />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: DAP_AN_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="container-md">
          {/* BREADCRUMB */}
          <nav className="breadcrumb" aria-label="Đường dẫn">
            <Link href="/">Trang chủ</Link>
            <span className="sep">›</span>
            <Link href="/kho-de-thi">Kho đề thi</Link>
            <span className="sep">›</span>
            <Link href="/de-thi-chi-tiet">Đề minh hoạ vào 10 TP.HCM 2026</Link>
            <span className="sep">›</span>
            <span className="current">Đáp án</span>
          </nav>

          {/* HEAD CARD — green tint */}
          <div className="head-card is-dapan">
            <div className="head-meta">
              <span className="badge badge--new">✅ Đáp án chính thức</span>
              <span className="pill pill-green">👨‍🏫 istudy Team giải</span>
            </div>
            <h1>
              Đáp án — Đề minh hoạ vào lớp 10 TP.HCM 2026
              <br />
              Môn Tiếng Anh
            </h1>

            <div className="info-row">
              <span>
                📖 <b>15</b> câu mẫu (đề đầy đủ 40 câu)
              </span>
              <span>
                👨‍🏫 <b>12</b> GV giải
              </span>
              <span>
                👁️ <b>198.420</b> lượt xem
              </span>
              <span>
                🏷️ <b>{state.soMa}</b> mã đề
              </span>
            </div>

            <div className="head-actions">
              <Link
                href={`/de-thi-chi-tiet${active ? `?ma=${active.code}` : ""}`}
                className="btn btn--outline"
              >
                ← Xem lại đề
              </Link>
              <DapAnActionLink
                className="btn btn--outline"
                ariaDisabled={!(active && active.status === "ready") && phase !== "ready-1"}
                title={active && active.status === "ready" ? "" : "Sẽ có khi đáp án được công bố"}
                ariaLabel="Tải đáp án PDF"
              >
                ⬇️ Tải đáp án PDF
              </DapAnActionLink>
              <Link href={`/dap-an?tab=key${active ? `&ma=${active.code}` : ""}`} className="btn btn--outline">
                🖨️ In bảng đáp án
              </Link>
              <Link href="/lam-bai" className="btn btn--primary">
                ✅ Chấm bài của tôi
              </Link>
            </div>
          </div>

          {/* STATUS STRIP */}
          <div className={`status-strip ${strip.variant}`} role="status" aria-live="polite">
            <span className="ss-dot" aria-hidden="true" />
            <div className="ss-grow" dangerouslySetInnerHTML={{ __html: strip.bodyHtml }} />
            {strip.actions.map((a, i) => (
              <Link key={i} href={a.href} className="ss-action">
                {a.label}
              </Link>
            ))}
          </div>

          {/* TAB STRIP (chỉ khi ready-multi) */}
          {showTabsBar && <TabsBar codes={codes} active={active} buildHref={buildMaHref} />}

          {/* Tab switch — 3 views */}
          <div className="tabs" role="tablist" aria-label="Chế độ hiển thị đáp án">
            <Link
              id="tab-detail"
              href={buildTabHref("detail")}
              className={`tab-btn${tab === "detail" ? " active" : ""}`}
              role="tab"
              aria-selected={tab === "detail"}
              aria-controls="pane-detail"
            >
              📖 Đáp án chi tiết
            </Link>
            <Link
              id="tab-key"
              href={buildTabHref("key")}
              className={`tab-btn${tab === "key" ? " active" : ""}`}
              role="tab"
              aria-selected={tab === "key"}
              aria-controls="pane-key"
            >
              📋 Bảng đáp án
            </Link>
            <Link
              id="tab-image"
              href={buildTabHref("image")}
              className={`tab-btn${tab === "image" ? " active" : ""}`}
              role="tab"
              aria-selected={tab === "image"}
              aria-controls="pane-image"
            >
              🖼️ Ảnh đáp án
            </Link>
          </div>

          {/* Tab content */}
          {detailContent}

          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <Link href="/lam-bai" className="btn btn--primary btn--large">
              📝 Làm thử bài này online ngay
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
