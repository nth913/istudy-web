/**
 * Coming-soon page styles — ported from /tmp/design-bundle/istudy-v2/project/coming-soon.css.
 *
 * The original CSS was scoped on `body.cs` (full-page body class). In the Next.js
 * port we apply `.cs` to a `<main>` wrapper instead, so all `body.cs` selectors
 * are rewritten to `.cs` here.
 *
 * Vibe variants (y2k, doodle) and mascot toggles (book, coffee) from the original
 * mockup are dropped — the published page is locked to `vibe-sticker mascot-rocket`.
 * Keep the base layout + sticker styles fully intact so the SVG mascot, decorative
 * tapes/sparkles, ETA bar, tiles and FYI strip all render unchanged.
 */
export const COMING_SOON_CSS = String.raw`
:root {
  --cs-accent: #E8192C;
  --cs-accent-soft: #FFE4E6;
  --cs-bg: #FFFAF0;
  --cs-ink: #1A1A1A;
  --cs-paper: #FFFFFF;
  --cs-shadow-hard: 4px 4px 0 #1A1A1A;
  --cs-shadow-card: 0 18px 40px -22px rgba(26,26,26,.30), 0 2px 6px rgba(26,26,26,.04);
}

/* Page background paints; sticker vibe is the default */
.cs { background: var(--cs-bg); }

/* ---------- HERO ---------- */
.cs-hero {
  position: relative;
  padding: 56px 40px 72px;
  overflow: hidden;
  background: linear-gradient(180deg, #FFFAF0 0%, #FFF0F1 100%);
}
.cs-hero-inner { max-width: 1240px; margin: 0 auto; position: relative; z-index: 2; }
.cs-hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 56px;
  align-items: center;
}

/* ---------- LEFT: copy ---------- */
.cs-stamp {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 12px; font-weight: 700; letter-spacing: .8px;
  text-transform: uppercase;
  padding: 8px 14px 8px 12px;
  border-radius: 999px;
  background: var(--cs-paper);
  color: var(--cs-accent);
  border: 1.5px solid var(--cs-ink);
  box-shadow: var(--cs-shadow-hard);
  margin-bottom: 28px;
  transform: rotate(-1.2deg);
}
.cs-stamp-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--cs-accent);
  box-shadow: 0 0 0 0 rgba(232,25,44,.6);
  animation: csPulse 1.6s infinite;
}
@keyframes csPulse {
  0%   { box-shadow: 0 0 0 0   rgba(232,25,44,.6); }
  70%  { box-shadow: 0 0 0 10px rgba(232,25,44,0); }
  100% { box-shadow: 0 0 0 0   rgba(232,25,44,0); }
}
.cs-stamp-tag {
  margin-left: 4px;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--cs-ink);
  color: #FFB200;
  letter-spacing: 1.2px;
}

.cs-h1 {
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: clamp(40px, 5.4vw, 68px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -1.6px;
  color: var(--cs-ink);
  margin: 0 0 22px;
  text-wrap: balance;
}
.cs-h1-italic {
  font-style: italic;
  color: var(--cs-accent);
  font-weight: 600;
}
.cs-h1-mark {
  position: relative;
  display: inline-block;
  color: var(--cs-ink);
  padding: 0 6px;
}
.cs-h1-mark::before {
  content: "";
  position: absolute;
  inset: 4% -8px -8% -8px;
  background: var(--cs-accent);
  z-index: -1;
  border-radius: 8px 14px 6px 12px / 10px 6px 14px 6px;
  transform: rotate(-1.4deg);
  opacity: .85;
}
.cs-h1-mark > span { color: #fff; }
.cs-h1-spark {
  display: inline-block;
  width: .85em; height: .85em;
  color: #FFB200;
  vertical-align: -.04em;
  margin-left: 6px;
  animation: csSpin 4s linear infinite;
  transform-origin: center;
}
@keyframes csSpin {
  0%   { transform: rotate(0deg)   scale(1); }
  50%  { transform: rotate(180deg) scale(1.18); }
  100% { transform: rotate(360deg) scale(1); }
}

.cs-sub {
  font-size: 17px;
  line-height: 1.75;
  color: #404040;
  max-width: 560px;
  margin: 0 0 32px;
}
.cs-sub b { color: var(--cs-ink); font-weight: 700; }

/* ---------- ETA progress ---------- */
.cs-eta {
  background: var(--cs-paper);
  border: 1.5px solid var(--cs-ink);
  border-radius: 18px;
  padding: 18px 20px 16px;
  box-shadow: var(--cs-shadow-hard);
  margin-bottom: 28px;
  max-width: 580px;
}
.cs[data-eta="false"] .cs-eta { display: none; }
.cs-eta-head {
  display: flex; align-items: center; justify-content: space-between;
  gap: 12px; margin-bottom: 14px; flex-wrap: wrap;
}
.cs-eta-lbl {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase;
  color: var(--cs-ink);
}
.cs-eta-val {
  display: inline-flex; align-items: baseline; gap: 8px;
  font-size: 13px; color: #525252;
}
.cs-eta-val [data-eta-pct] {
  font-family: 'Fredoka','Lexend',monospace;
  font-size: 26px; font-weight: 700;
  color: var(--cs-accent); letter-spacing: -1px;
  font-variant-numeric: tabular-nums;
}
.cs-eta-pct-sym { color: var(--cs-accent); font-weight: 700; margin-left: -4px; }
.cs-eta-sep { color: #D4D4D4; }
.cs-eta-when b { color: var(--cs-ink); font-weight: 700; }

.cs-eta-bar {
  position: relative;
  height: 14px;
  background: #F5F5F5;
  border: 1.5px solid var(--cs-ink);
  border-radius: 999px;
  overflow: visible;
}
.cs-eta-fill {
  position: absolute; inset: 0 auto 0 0;
  background: repeating-linear-gradient(
    -45deg,
    var(--cs-accent) 0 10px,
    #FF6B7A 10px 20px
  );
  border-radius: 999px;
  animation: csStripe 2s linear infinite;
}
@keyframes csStripe {
  to { background-position: 28px 0; }
}
.cs-eta-thumb {
  position: absolute; top: 50%;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--cs-ink);
  border: 3px solid var(--cs-paper);
  box-shadow: 0 0 0 2px var(--cs-ink);
  transform: translate(-50%, -50%);
}
.cs-eta-thumb-flag {
  position: absolute;
  top: -34px; left: 50%; transform: translateX(-50%) rotate(-2deg);
  background: #FFB200;
  border: 1.5px solid var(--cs-ink);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 10px; font-weight: 700;
  white-space: nowrap;
  color: var(--cs-ink);
}
.cs-eta-thumb-flag::after {
  content: "";
  position: absolute;
  bottom: -6px; left: 50%; transform: translateX(-50%) rotate(45deg);
  width: 8px; height: 8px;
  background: #FFB200;
  border-right: 1.5px solid var(--cs-ink);
  border-bottom: 1.5px solid var(--cs-ink);
}

.cs-eta-ticks {
  display: flex; justify-content: space-between;
  margin-top: 14px;
  font-size: 11px; color: #737373; font-weight: 500;
}
.cs-eta-ticks .is-current {
  color: var(--cs-accent); font-weight: 700;
}

/* ---------- CTAs ---------- */
.cs-ctas {
  display: flex; gap: 12px; flex-wrap: wrap; align-items: stretch;
  margin-bottom: 24px;
}
.cs-cta-primary {
  font-weight: 700;
  border: 1.5px solid var(--cs-ink);
  box-shadow: var(--cs-shadow-hard);
  transition: transform .15s, box-shadow .15s;
}
.cs-cta-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--cs-ink);
}
.cs-cta-primary:active {
  transform: translate(0, 0);
  box-shadow: 0 0 0 var(--cs-ink);
}

.cs-notify {
  display: flex; align-items: stretch;
  background: var(--cs-paper);
  border: 1.5px solid var(--cs-ink);
  border-radius: 12px;
  padding: 4px 4px 4px 14px;
  box-shadow: var(--cs-shadow-hard);
  transition: transform .15s, box-shadow .15s;
}
.cs-notify:focus-within {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--cs-ink);
}
.cs-notify input {
  border: none; outline: none; background: transparent;
  font-size: 14px; min-width: 180px;
  font-family: inherit;
}
.cs-cta-notify {
  background: var(--cs-ink);
  color: var(--cs-paper);
  border: none;
  padding: 10px 16px;
  border-radius: 9px;
  font-weight: 600;
  cursor: pointer;
}
.cs-cta-notify:hover { background: #404040; }
.cs-notify.is-sent { background: #DCFCE7; border-color: #16A34A; }
.cs-notify.is-sent .cs-cta-notify { background: #16A34A; }

/* ---------- trust row ---------- */
.cs-trust {
  display: flex; align-items: center; gap: 12px;
  font-size: 13px; color: #525252;
}
.cs-trust b { color: var(--cs-ink); font-weight: 700; }
.cs-trust-avatars { display: inline-flex; }
.cs-trust-avatars > span {
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 2px solid var(--cs-paper);
  margin-right: -8px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: var(--cs-ink);
}

/* ---------- RIGHT: mascot art ---------- */
.cs-hero-art {
  position: relative;
  display: flex; justify-content: center; align-items: center;
}
.cs-art-frame {
  position: relative;
  width: 100%; max-width: 480px;
  aspect-ratio: 1;
  background: var(--cs-paper);
  border: 1.5px solid var(--cs-ink);
  border-radius: 24px;
  box-shadow: var(--cs-shadow-hard);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  transform: rotate(1.2deg);
}
.cs-art-cap {
  position: absolute; top: 16px; left: 50%;
  transform: translateX(-50%);
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: 11px; font-weight: 500;
  color: #737373;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.cs-mascot { width: 100%; height: 100%; display: block; animation: csBob 4s ease-in-out infinite; }
@keyframes csBob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* corner sticker */
.cs-corner-sticker {
  position: absolute;
  right: -14px; top: -14px;
  width: 92px; height: 92px;
  border-radius: 50%;
  background: var(--cs-accent);
  color: #fff;
  border: 1.5px solid var(--cs-ink);
  box-shadow: var(--cs-shadow-hard);
  display: flex; align-items: center; justify-content: center;
  text-align: center;
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: 13px; font-weight: 700; line-height: 1.1;
  text-transform: lowercase;
  transform: rotate(8deg);
  z-index: 3;
}

/* mascot micro-animations (rocket-specific) */
.cs-flame { transform-origin: center top; animation: csFlame .25s ease-in-out infinite alternate; transform-box: fill-box; }
@keyframes csFlame { to { transform: scaleY(1.08) scaleX(.96); } }

/* ---------- DECO layer ---------- */
.cs-deco { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
.cs-deco > * { position: absolute; }

/* washi tape strips */
.cs-tape {
  width: 180px; height: 30px;
  background:
    repeating-linear-gradient(45deg, transparent 0 8px, rgba(0,0,0,.06) 8px 16px),
    #FFB200;
  border: 1.5px solid var(--cs-ink);
  border-radius: 2px;
  box-shadow: 2px 3px 0 rgba(26,26,26,.18);
}
.cs-tape--1 { top: 60px; left: -36px; transform: rotate(-18deg); background-color: #FBCFE8; }
.cs-tape--2 { top: 38px; right: 4%; transform: rotate(12deg); width: 200px; background-color: #BFDBFE; }
.cs-tape--3 { bottom: 40px; left: 35%; transform: rotate(-6deg); width: 140px; background-color: #FFB200; }

/* sparkles */
.cs-spark { width: 36px; height: 36px; color: var(--cs-accent); }
.cs-spark--1 { top: 28%; left: 46%; color: #FFB200; animation: csSpin 5s linear infinite; }
.cs-spark--2 { top: 14%; right: 16%; width: 24px; height: 24px; color: var(--cs-accent); animation: csSpin 6s linear infinite reverse; }
.cs-spark--3 { bottom: 18%; right: 8%; width: 28px; height: 28px; color: #2563EB; animation: csSpin 7s linear infinite; }

/* doodles */
.cs-doodle { color: var(--cs-ink); opacity: .35; }
.cs-doodle--curl    { top: 22%; left: 38%; width: 100px; height: 50px; opacity: .25; }
.cs-doodle--arrow   { top: 44%; left: 47%; width: 130px; height: 70px; transform: rotate(8deg); color: var(--cs-accent); opacity: .65; }
.cs-doodle--scribble{ bottom: 18%; left: 6%; width: 70px; height: 70px; opacity: .35; }

/* ---------- WHILE-YOU-WAIT ---------- */
.cs-while {
  padding: 28px 40px 80px;
  background: var(--cs-bg);
  position: relative;
}
.cs-while-inner { max-width: 1240px; margin: 0 auto; }
.cs-while-head {
  display: flex; justify-content: space-between; align-items: flex-end;
  gap: 24px; margin-bottom: 28px; flex-wrap: wrap;
}
.cs-while-title {
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: clamp(26px, 3.2vw, 36px);
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: -.8px;
  color: var(--cs-ink);
}
.cs-while-title-mark {
  position: relative;
  color: var(--cs-accent);
  font-style: italic;
}
.cs-while-title-mark::after {
  content: "";
  position: absolute;
  left: -2px; right: -2px; bottom: -2px; height: 6px;
  background: #FFB200;
  z-index: -1;
  border-radius: 4px 14px 6px 12px / 6px 4px 14px 6px;
  transform: skewX(-6deg);
}
.cs-while-sub { color: #525252; font-size: 15px; line-height: 1.65; margin: 0; max-width: 560px; }

.cs-while .see-all {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--cs-accent); font-weight: 700; font-size: 14px;
  text-decoration: none;
}

.cs-while-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 36px;
}

.cs-tile {
  background: var(--cs-paper);
  border: 1.5px solid var(--cs-ink);
  border-radius: 18px;
  padding: 22px 22px 20px;
  display: flex; flex-direction: column; gap: 10px;
  box-shadow: var(--cs-shadow-hard);
  transition: transform .15s, box-shadow .15s;
  position: relative; overflow: hidden;
  min-height: 240px;
  color: inherit; text-decoration: none;
}
.cs-tile:hover {
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0 var(--cs-ink);
}
.cs-tile-icon {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  background: var(--cs-accent-soft);
  color: var(--cs-accent);
  border: 1.5px solid var(--cs-ink);
}
.cs-tile-icon svg { width: 22px; height: 22px; }
.cs-tile-tag {
  font-size: 11px; font-weight: 700; letter-spacing: .6px;
  text-transform: uppercase;
  color: var(--cs-ink); opacity: .55;
  margin-top: 6px;
}
.cs-tile h3 {
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: 19px; font-weight: 600;
  margin: 0; color: var(--cs-ink); letter-spacing: -.3px;
}
.cs-tile p { font-size: 13px; line-height: 1.65; color: #525252; margin: 0; flex: 1; }
.cs-tile-cta {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 700;
  color: var(--cs-accent);
  transition: gap .15s;
}
.cs-tile:hover .cs-tile-cta { gap: 12px; }

.cs-tile--green  .cs-tile-icon { background: #DCFCE7; color: #16A34A; }
.cs-tile--green  .cs-tile-cta  { color: #16A34A; }
.cs-tile--purple .cs-tile-icon { background: #F3E8FF; color: #7C3AED; }
.cs-tile--purple .cs-tile-cta  { color: #7C3AED; }
.cs-tile--orange .cs-tile-icon { background: #FEF3C7; color: #D97706; }
.cs-tile--orange .cs-tile-cta  { color: #D97706; }

.cs-tile::after {
  content: "";
  position: absolute;
  top: 18px; right: 18px;
  width: 14px; height: 14px;
  background: radial-gradient(circle, currentColor 30%, transparent 32%);
  color: var(--cs-accent);
  opacity: .12;
  border-radius: 50%;
}

/* ---------- FYI strip ---------- */
.cs-fyi {
  margin-top: 12px;
  padding: 20px 24px;
  background: var(--cs-paper);
  border: 1.5px dashed var(--cs-ink);
  border-radius: 18px;
  display: grid; grid-template-columns: auto 1fr; gap: 18px; align-items: center;
}
.cs-fyi-eyebrow {
  display: inline-block;
  font-family: 'Fredoka','Lexend',sans-serif;
  font-size: 18px; font-weight: 700;
  background: #FFB200;
  border: 1.5px solid var(--cs-ink);
  padding: 6px 14px 4px;
  border-radius: 999px;
  transform: rotate(-2deg);
  letter-spacing: -.3px;
}
.cs-fyi p { font-size: 14px; line-height: 1.7; color: #525252; margin: 0; }
.cs-fyi p b { color: var(--cs-ink); font-weight: 700; }
.cs-fyi a { color: var(--cs-accent); text-decoration: underline; text-decoration-style: wavy; text-underline-offset: 3px; }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 980px) {
  .cs-hero { padding: 36px 16px 48px; }
  .cs-hero-grid { grid-template-columns: 1fr; gap: 32px; }
  .cs-hero-art { order: -1; }
  .cs-art-frame { max-width: 320px; }
  .cs-h1 { font-size: clamp(34px, 9vw, 48px); }
  .cs-tape--1, .cs-tape--2 { display: none; }
  .cs-doodle--arrow { display: none; }
  .cs-while { padding: 24px 16px 56px; }
  .cs-while-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .cs-fyi { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .cs-while-grid { grid-template-columns: 1fr; }
  .cs-ctas { flex-direction: column; align-items: stretch; }
  .cs-notify input { min-width: 0; flex: 1; }
  .cs-eta-ticks { font-size: 10px; }
  .cs-eta-ticks span:nth-child(even) { display: none; }
}

/* ---------- PRINT ---------- */
@media print {
  .cs-deco, .cs-corner-sticker, .cs-ctas { display: none; }
  .cs { background: #fff; }
}
`;
