"use client";
import Link from "next/link";
import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { LAM_BAI_CSS } from "@/lib/page-css/lam-bai";
import { EXAM_THPT_24MA } from "@/lib/render/__mocks__/exam-fixtures";
import {
  formatTimer,
  type QuestionBlock,
  type SingleChoiceBlock,
  type TrueFalseBlock,
  type ShortAnswerBlock,
} from "@/lib/render/de-thi";

const LETTERS = ["A", "B", "C", "D"];
const CURRENT = 5;
const FLAGGED = new Set([9, 14]);
const INITIAL_ANSWERED = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];

export default function LamBaiPage() {
  const exam = EXAM_THPT_24MA;
  const SECTIONS = exam.sections;
  const QUESTIONS = exam.questions;
  const TOTAL = exam.meta.totalQuestions;
  const initialSeconds = exam.meta.durationMinutes * 60;

  const [picks, setPicks] = useState<Record<number, number>>({ 5: 1 });
  const [texts, setTexts] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<Set<number>>(() => new Set(INITIAL_ANSWERED));
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  const { mm, ss } = formatTimer(seconds);
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
        if (!q) continue;
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
            <QuestionBody
              q={q}
              i={i}
              pickIdx={picks[i]}
              text={texts[i] ?? ""}
              pick={pick}
              setText={setText}
            />
          </div>
        );
      }
    }
    return out;
  }, [picks, texts, answered, SECTIONS, QUESTIONS]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: LAM_BAI_CSS }} />

      <header className="exam-bar">
        <div className="left">
          <Link href="/de-thi-chi-tiet" className="logo-mini" title="Quay lại">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo/istudy-circle-64.png" alt="istudy" width={32} height={32} />
          </Link>
          <h1>{exam.meta.title.split(" — ").slice(-1)[0]} — {exam.meta.subjectLabel}</h1>
        </div>
        <div className="right">
          <span className="chip-timer">
            ⏱ <span>{mm}:{ss}</span>
          </span>
          <span className="chip-count">
            Còn lại <strong>{remaining}</strong>/{TOTAL}
          </span>
          <Link href="/ket-qua" className="btn btn--red btn--small">
            ✓ Nộp bài
          </Link>
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
                  <a className={cls} href={`#q${i}`} key={i}>
                    {i}
                  </a>
                );
              })}
            </div>

            <div className="legend">
              <div>
                <span className="swatch" style={{ background: "var(--green-bg)", border: "1px solid #BBF7D0" }} /> Đã làm
              </div>
              <div>
                <span className="swatch" style={{ background: "var(--red)" }} /> Chưa làm
              </div>
            </div>

            <div className="panel-divider" />

            <div className="struct-title">Cấu trúc đề</div>
            {SECTIONS.map((sec) => (
              <div className="stat-line" key={sec.id}>
                <span>{sec.title.split("—")[0].trim()}</span>
                <strong>{sec.range[1] - sec.range[0] + 1}</strong>
              </div>
            ))}

            <Link href="/ket-qua" className="submit-big">
              ✓ Nộp bài
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}

// ============================================================================
// QUESTION BODY — lookup by block.type (13 dạng)
// ============================================================================

type QBProps = {
  q: QuestionBlock;
  i: number;
  pickIdx: number | undefined;
  text: string;
  pick: (q: number, idx: number) => void;
  setText: (q: number, v: string) => void;
};

function QuestionBody(props: QBProps) {
  const { q } = props;
  switch (q.type) {
    case "single-choice":
      return <SingleChoiceBody {...props} q={q} />;
    case "true-false":
      return <TrueFalseBody {...props} q={q} />;
    case "short-answer":
      return <ShortAnswerBody {...props} q={q} />;
    case "multi-choice":
      return <MultiChoiceFallback {...props} q={q} />;
    case "essay":
    case "ordering":
    case "matching":
    case "fill-blank":
    case "audio":
    case "image-hotspot":
    case "formula":
    case "drag-drop":
    case "table":
      // TODO(istudy-T??): render dedicated UI for these dạng once design v2 covers them.
      return (
        <div className="qtext">
          <em style={{ color: "var(--g500)" }}>
            [{q.type}] Dạng câu hỏi này đang được thiết kế — placeholder hiển thị stem.
          </em>
          <div dangerouslySetInnerHTML={{ __html: q.text }} />
        </div>
      );
  }
}

function SingleChoiceBody({
  q,
  i,
  pickIdx,
  pick,
}: QBProps & { q: SingleChoiceBlock }) {
  const isCloze = q.subtype === "cloze";
  const isSign = q.subtype === "sign";
  return (
    <>
      {isCloze ? (
        <div className="qtext">
          <strong style={{ color: "var(--red)" }}>{q.text}</strong>
        </div>
      ) : (
        <>
          <div className="qtext" dangerouslySetInnerHTML={{ __html: q.text }} />
          {isSign && q.sign && <div className="sign-tag">{q.sign}</div>}
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

function MultiChoiceFallback({
  q,
  i,
  pickIdx,
  pick,
}: QBProps & { q: { type: "multi-choice"; text: string; opts: string[] } }) {
  // TODO(istudy-T??): support multi-select state. For now treat as single-choice display.
  return (
    <>
      <div className="qtext" dangerouslySetInnerHTML={{ __html: q.text }} />
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

function TrueFalseBody({
  q,
  i,
  pickIdx,
  pick,
}: QBProps & { q: TrueFalseBlock }) {
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

function ShortAnswerBody({
  q,
  i,
  text,
  setText,
}: QBProps & { q: ShortAnswerBlock }) {
  // Rewrite (`tag` used as prompt) renders with arrow prefix; word-form (`tag` used as root) renders as pill.
  const isRewriteLike = q.tag && /^[A-Z]/.test(q.tag);
  if (isRewriteLike) {
    return (
      <>
        <div className="qtext">{q.text}</div>
        <div className="rw-row">
          <span className="rw-prompt">
            <span className="arrow">→</span> {q.tag}
          </span>
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
  return (
    <>
      <div className="qtext">{q.text}</div>
      <div className="wf-row">
        {q.tag && <span className="wf-tag">{q.tag}</span>}
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
