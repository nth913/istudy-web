"use client";
import Link from "next/link";
import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { LAM_BAI_CSS } from "@/lib/page-css/lam-bai";

type Section = {
  id: string;
  title: string;
  meta: string;
  range: [number, number];
  intro?: { title: string; html: string };
};

type Question =
  | { type: "mcq"; text: string; opts: string[] }
  | { type: "mcq-sign"; text: string; sign: string; opts: string[] }
  | { type: "mcq-cloze"; text: string; opts: string[] }
  | { type: "tf"; text: string }
  | { type: "wf"; text: string; tag: string }
  | { type: "rewrite"; text: string; prompt: string };

const SECTIONS: Section[] = [
  { id: "I", title: "I. Trắc nghiệm — Phát âm, trọng âm, ngữ pháp, từ vựng, giao tiếp", meta: "3.5 điểm • 14 câu", range: [1, 14] },
  { id: "II", title: "II. Đọc biển báo", meta: "0.5 điểm • 2 câu", range: [15, 16] },
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
  { id: "V", title: "V. Word Formation", meta: "1.5 điểm • 6 câu", range: [29, 34] },
  { id: "VI", title: "VI. Dictionary Entry", meta: "0.5 điểm • 2 câu", range: [35, 36] },
  { id: "VII", title: "VII. Viết lại câu", meta: "1.0 điểm • 4 câu", range: [37, 40] },
];

const QUESTIONS: Record<number, Question> = {
  1: { type: "mcq", text: "Which word has the underlined part pronounced differently from that of the others?", opts: ["stay<u>s</u>", "know<u>s</u>", "reset<u>s</u>", "burn<u>s</u>"] },
  2: { type: "mcq", text: "Which word has the underlined part pronounced differently from that of the others?", opts: ["s<u>e</u>ll", "f<u>e</u>nce", "tr<u>e</u>nd", "m<u>e</u>"] },
  3: { type: "mcq", text: "Which word has a different stress pattern from that of the others?", opts: ["future", "equip", "modern", "happy"] },
  4: { type: "mcq", text: "Which word has a different stress pattern from that of the others?", opts: ["discover", "beautiful", "digital", "educate"] },
  5: { type: "mcq", text: `<span class="speaker">Helen:</span> You seem to be busy with something. What's that, Sam?<br><span class="speaker">Sam:</span> I _________ an article about our school festival.`, opts: ["wrote", "am writing", "write", "have written"] },
  6: { type: "mcq", text: `<span class="speaker">Harry:</span> Where's the cat? I can't find it anywhere.<br><span class="speaker">Luke:</span> It might be _________ the table, sleeping again.`, opts: ["in", "over", "under", "between"] },
  7: { type: "mcq", text: `<span class="speaker">Thomas:</span> Are you keen _________ joining the art club this term?`, opts: ["at", "with", "in", "on"] },
  8: { type: "mcq", text: `<span class="speaker">David:</span> The teacher says we must _________ a survey on local recycling.`, opts: ["break down", "come across", "carry out", "go over"] },
  9: { type: "mcq", text: `<span class="speaker">Mike:</span> Do you know the girl _________ won the school's singing contest?`, opts: ["who", "whom", "which", "whose"] },
  10: { type: "mcq", text: `<span class="speaker">Mark:</span> How do you describe your new teacher of English?<br><span class="speaker">Helen:</span> He's amazing. He's a/an _________ teacher; that's why we respect him.`, opts: ["dull", "old-fashioned", "dedicated", "timid"] },
  11: { type: "mcq", text: `<span class="speaker">Ben:</span> _________ it's raining, shall we still go for a walk?`, opts: ["Because", "But", "Although", "So"] },
  12: { type: "mcq", text: `<span class="speaker">Minh:</span> How often do you go out for a movie or concert?<br><span class="speaker">Long:</span> Not quite often! I don't have much time for _________`, opts: ["entertainment", "knowledge", "training", "sports"] },
  13: { type: "mcq", text: `<span class="speaker">Christ:</span> Have a wonderful holiday, Minh! — <span class="speaker">Minh:</span> _________.`, opts: ["I've no idea.", "What's happening?", "OK, we do, too.", "Thanks! The same to you!"] },
  14: { type: "mcq", text: `<span class="speaker">Caroline:</span> _________.<br><span class="speaker">Lisa:</span> Sorry, the bus broke down on the way here.`, opts: ["How do you go to school every day?", "Where have you been? I've been waiting for ages!", "Can you see the bus stop down the street?", "Buses are punctual, and it's cheap to travel on them"] },
  15: { type: "mcq-sign", text: "What does the sign tell you to do?", sign: "⚠ SCHOOL ZONE — Học sinh qua đường", opts: ["Give the pupils a lift", "Slow down; school pupils ahead", "Take good care of kids", "Pay no attention to kids"] },
  16: { type: "mcq-sign", text: "What does the sign say?", sign: "⚠ CAUTION: SLIPPERY WHEN WET", opts: ["You can dance on the floor", "You must dry the floor first", "The floor is always slippery", "Be careful walking if it's wet"] },
  17: { type: "mcq-cloze", text: "(17)", opts: ["movie", "job", "sport", "work"] },
  18: { type: "mcq-cloze", text: "(18)", opts: ["open", "empty", "tall", "narrow"] },
  19: { type: "mcq-cloze", text: "(19)", opts: ["time", "stress", "hope", "energy"] },
  20: { type: "mcq-cloze", text: "(20)", opts: ["think", "relax", "train", "perform"] },
  21: { type: "mcq-cloze", text: "(21)", opts: ["quick", "slow", "hard", "heavy"] },
  22: { type: "mcq-cloze", text: "(22)", opts: ["of", "for", "with", "in"] },
  23: { type: "tf", text: "Đờn ca tài tử originated from the South of Vietnam." },
  24: { type: "tf", text: "Đờn ca tài tử is very popular with young people nowadays." },
  25: { type: "tf", text: "To keep Đờn ca tài tử alive, we should teach it in schools." },
  26: { type: "tf", text: "Online platforms have nothing to do with the preservation of Đờn ca tài tử." },
  27: { type: "mcq", text: "According to the passage, Đờn ca tài tử is slowly disappearing because", opts: ["it doesn't have much value", "no good musicians can play it", "people are more interested in new things", "it is no longer played at community events"] },
  28: { type: "mcq", text: "All of the following are mentioned EXCEPT _________", opts: ["heartfelt lyrics", "supporting local musicians", "scientific seminars", "saving is more than preserving the past"] },
  29: { type: "wf", text: "The kids are looking at the balloons _________ at the school gate.", tag: "color" },
  30: { type: "wf", text: 'John Brown won the special prize for "_________ Performance" in the last festival.', tag: "impress" },
  31: { type: "wf", text: "_________, quite a few students scored very high in the mid-term test.", tag: "surprise" },
  32: { type: "wf", text: "Most families in Sweden have their homes _________ by solar energy.", tag: "heat" },
  33: { type: "wf", text: "The student asked his teacher for _________ to leave the classroom.", tag: "permit" },
  34: { type: "wf", text: "There was an informative _________ about wildlife protection on HTV9.", tag: "document" },
  35: { type: "wf", text: "I'll give you this _________, and you can use it in your essay.", tag: "information" },
  36: { type: "wf", text: "For _________, please contact us without hesitation.", tag: "information" },
  37: { type: "rewrite", text: "Kate finds it difficult to cook a decent meal.", prompt: "Kate has" },
  38: { type: "rewrite", text: "They haven't met each other for quite some time.", prompt: "It has been" },
  39: { type: "rewrite", text: "This language school is better than any other one in the area.", prompt: "No other" },
  40: { type: "rewrite", text: "The team finally produced a good solution to the problem.", prompt: "The team finally came" },
};

const LETTERS = ["A", "B", "C", "D"];
const CURRENT = 5;
const FLAGGED = new Set([9, 14]);
const INITIAL_ANSWERED = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const TOTAL = 40;

export default function LamBaiPage() {
  const [picks, setPicks] = useState<Record<number, number>>({ 5: 1 });
  const [texts, setTexts] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<Set<number>>(() => new Set(INITIAL_ANSWERED));
  const [seconds, setSeconds] = useState(72 * 60 + 13);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const mm = Math.floor(seconds / 60).toString().padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  const remaining = TOTAL - answered.size;

  const pick = (q: number, idx: number) => {
    setPicks((p) => ({ ...p, [q]: idx }));
    setAnswered((a) => {
      const n = new Set(a);
      n.add(q);
      return n;
    });
  };

  const setText = (q: number, v: string) => {
    setTexts((t) => ({ ...t, [q]: v }));
    setAnswered((a) => {
      const n = new Set(a);
      if (v.trim()) n.add(q);
      else n.delete(q);
      return n;
    });
  };

  const cards = useMemo(() => {
    const out: JSX.Element[] = [];
    for (const sec of SECTIONS) {
      out.push(
        <div className="sec-head" id={`sec-${sec.id}`} key={`sec-${sec.id}`}>
          <div>
            <div className="ttl">{sec.title}</div>
            <div className="meta">{sec.meta}</div>
          </div>
          <span className="sec-pill">{sec.range[1] - sec.range[0] + 1} câu</span>
        </div>
      );

      if (sec.intro) {
        out.push(
          <div className="qcard" style={{ paddingTop: 18 }} key={`intro-${sec.id}`}>
            <div className="shared">
              <strong className="title">{sec.intro.title}</strong>
              <span dangerouslySetInnerHTML={{ __html: sec.intro.html }} />
            </div>
          </div>
        );
      }

      for (let i = sec.range[0]; i <= sec.range[1]; i++) {
        const q = QUESTIONS[i];
        const isCurr = i === CURRENT;
        const isFlag = FLAGGED.has(i);
        const isAns = answered.has(i);
        const cls = ["qcard"];
        if (isCurr) cls.push("is-current");
        else if (isFlag) cls.push("is-flagged");
        else if (isAns) cls.push("is-answered");

        out.push(
          <div className={cls.join(" ")} id={`q${i}`} key={`q${i}`}>
            <div className="qnum">{i}</div>
            {renderBody(q, i, picks[i], texts[i] ?? "", pick, setText)}
          </div>
        );
      }
    }
    return out;
  }, [picks, texts, answered]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAM_BAI_CSS }} />

      <header className="exam-bar">
        <div className="left">
          <Link href="/de-thi-chi-tiet" className="logo-mini" title="Quay lại">
            <img src="/logo/istudy-circle-64.png" alt="istudy" width={32} height={32} />
          </Link>
          <h1>Đề tham khảo lớp 10 TPHCM 2026 — Tiếng Anh</h1>
        </div>
        <div className="right">
          <span className="chip-timer">⏱ <span>{mm}:{ss}</span></span>
          <span className="chip-count">Còn lại <strong>{remaining}</strong>/{TOTAL}</span>
          <Link href="/ket-qua" className="btn btn--red btn--small">✓ Nộp bài</Link>
        </div>
      </header>

      <div className="exam-layout">
        <div className="questions-col">{cards}</div>

        <aside>
          <div className="panel">
            <h3>Bảng câu hỏi</h3>
            <div className="qmap">
              {Array.from({ length: TOTAL }, (_, k) => k + 1).map((i) => {
                let cls = "";
                if (i === CURRENT) cls = "current";
                else if (FLAGGED.has(i)) cls = "flag";
                else if (answered.has(i)) cls = "done";
                return (
                  <a className={cls} href={`#q${i}`} key={i}>{i}</a>
                );
              })}
            </div>

            <div className="legend">
              <div><span className="swatch" style={{ background: "var(--green-bg)", border: "1px solid #BBF7D0" }} /> Đã làm</div>
              <div><span className="swatch" style={{ background: "var(--red)" }} /> Chưa làm</div>
            </div>

            <div className="panel-divider" />

            <div className="struct-title">Cấu trúc đề</div>
            <div className="stat-line"><span>I. Trắc nghiệm</span><strong>14</strong></div>
            <div className="stat-line"><span>II. Biển báo</span><strong>2</strong></div>
            <div className="stat-line"><span>III. Cloze</span><strong>6</strong></div>
            <div className="stat-line"><span>IV. Đọc hiểu</span><strong>6</strong></div>
            <div className="stat-line"><span>V. Word form</span><strong>6</strong></div>
            <div className="stat-line"><span>VI. Từ điển</span><strong>2</strong></div>
            <div className="stat-line"><span>VII. Viết lại câu</span><strong>4</strong></div>

            <Link href="/ket-qua" className="submit-big">✓ Nộp bài</Link>
          </div>
        </aside>
      </div>
    </>
  );
}

function renderBody(
  q: Question,
  i: number,
  pickIdx: number | undefined,
  text: string,
  pick: (q: number, idx: number) => void,
  setText: (q: number, v: string) => void
) {
  if (q.type === "mcq" || q.type === "mcq-sign" || q.type === "mcq-cloze") {
    return (
      <>
        {q.type === "mcq-cloze" ? (
          <div className="qtext"><strong style={{ color: "var(--red)" }}>{q.text}</strong></div>
        ) : (
          <>
            <div className="qtext" dangerouslySetInnerHTML={{ __html: q.text }} />
            {q.type === "mcq-sign" && <div className="sign-tag">{q.sign}</div>}
          </>
        )}
        <div className="opts">
          {q.opts.map((opt, idx) => (
            <button
              key={idx}
              className={`opt${pickIdx === idx ? " selected" : ""}`}
              onClick={() => pick(i, idx)}
              type="button"
            >
              <span className="ltr">{LETTERS[idx]}.</span>
              <span dangerouslySetInnerHTML={{ __html: opt }} />
            </button>
          ))}
        </div>
      </>
    );
  }

  if (q.type === "tf") {
    return (
      <>
        <div className="qtext">{q.text}</div>
        <div className="tf">
          {["True", "False"].map((label, idx) => (
            <button
              key={label}
              className={`opt${pickIdx === idx ? " selected" : ""}`}
              onClick={() => pick(i, idx)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>
      </>
    );
  }

  if (q.type === "wf") {
    return (
      <>
        <div className="qtext">{q.text}</div>
        <div className="wf-row">
          <span className="wf-tag">{q.tag}</span>
          <input
            className="qinput"
            type="text"
            placeholder="Điền đáp án…"
            value={text}
            onChange={(e) => setText(i, e.target.value)}
          />
        </div>
      </>
    );
  }

  // rewrite
  return (
    <>
      <div className="qtext">{q.text}</div>
      <div className="rw-row">
        <span className="rw-prompt"><span className="arrow">→</span> {q.prompt}</span>
        <input
          className="qinput"
          type="text"
          placeholder="…"
          value={text}
          onChange={(e) => setText(i, e.target.value)}
        />
      </div>
    </>
  );
}
