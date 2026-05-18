export const INDEX_CSS = String.raw`
  /* ============================================================
     Homepage scoped CSS — ported from design-v2/project/index.html
     ============================================================ */

  /* ---------- Hero ---------- */
  .hero {
    background: linear-gradient(160deg, #fff 0%, var(--red-light) 60%, #FFF5F5 100%);
    padding: 64px 40px 56px;
    position: relative;
    overflow: hidden;
  }
  .hero-circle {
    position: absolute; top: -120px; right: -120px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: rgba(232,25,44,0.04);
  }
  .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; }
  .hero-grid {
    display: grid; grid-template-columns: 1fr 520px; gap: 0;
    align-items: center;
  }
  .hero-content { max-width: 680px; }
  .hero h1 {
    font-size: 52px; font-weight: 800; color: var(--dark);
    line-height: 1.15; margin-bottom: 8px; letter-spacing: -1.5px;
  }
  .hero h1 .accent { color: var(--red); }
  .hero p {
    font-size: 17px; color: var(--g500);
    line-height: 1.8; margin-bottom: 36px; max-width: 520px;
  }
  .search-bar {
    display: flex; align-items: center;
    background: var(--white); border-radius: 14px;
    padding: 5px 5px 5px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
    border: 1px solid var(--g200); max-width: 480px;
  }
  .search-bar input {
    border: none; outline: none; flex: 1; padding: 12px;
    font-size: 15px; background: transparent;
  }
  .search-bar .icon { color: var(--g500); }

  /* ---------- Exam / popular / post cards ---------- */
  .exam-card {
    border: 1px solid var(--g200); border-radius: 16px; padding: 20px;
    background: var(--white); position: relative; overflow: hidden;
    transition: all .2s; display: block; text-decoration: none; color: inherit;
  }
  .exam-card:hover {
    box-shadow: 0 12px 32px rgba(232,25,44,0.08);
    transform: translateY(-2px);
    border-color: rgba(232,25,44,0.3);
  }
  .exam-card::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0;
    height: 3px; background: var(--red);
  }
  .exam-card-head {
    display: flex; justify-content: space-between; align-items: flex-start;
    margin-bottom: 12px;
  }
  .exam-card-title {
    font-size: 14px; font-weight: 600; color: var(--dark);
    line-height: 1.6; margin: 0 0 16px; min-height: 66px;
  }
  .exam-card-meta {
    display: flex; gap: 14px; font-size: 12px; color: var(--g500);
    border-top: 1px solid var(--g100); padding-top: 12px;
  }
  .meta-item { display: flex; align-items: center; gap: 4px; }

  .grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }

  /* =================================================================
     Countdown card — polaroid / sticker frame (matches coming-soon
     "cs-art-frame"). White bg, hard 4px black shadow, slight rotation,
     corner sticker pinned top-right, polaroid caption pinned top-center.
     ================================================================= */
  .hero-countdown {
    justify-self: end;
    margin-right: 130px;
    max-width: 520px;
  }

  .countdown-card {
    --cd-rot: 1.2deg;
    --cd-accent: var(--red);
    position: relative;
    background: var(--white);
    color: var(--dark);
    border: 1.5px solid #1A1A1A;
    border-radius: 22px;
    padding: 36px 22px 22px;
    display: flex; flex-direction: column; gap: 12px;
    box-shadow: 4px 4px 0 #1A1A1A;
    overflow: visible;
    transform: rotate(var(--cd-rot));
    transition: transform .25s ease, box-shadow .25s ease;
  }

  /* polaroid caption */
  .countdown-card .cd-cap {
    position: absolute; top: 14px; left: 50%;
    transform: translateX(-50%);
    font-family: 'Fredoka','Lexend',sans-serif;
    font-size: 11px; font-weight: 600;
    color: #737373;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    white-space: nowrap;
    display: inline-flex; align-items: center; gap: 8px;
    z-index: 2;
  }
  .countdown-card .cd-cap .cd-pulse { width: 7px; height: 7px; }

  .cd-pulse {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--cd-accent);
    box-shadow: 0 0 0 0 rgba(232,25,44,0.6);
    animation: cdPulse 1.6s infinite;
  }
  @keyframes cdPulse {
    0%   { box-shadow: 0 0 0 0   rgba(232,25,44,0.6); }
    70%  { box-shadow: 0 0 0 10px rgba(232,25,44,0); }
    100% { box-shadow: 0 0 0 0   rgba(232,25,44,0); }
  }

  .cd-headline {
    font-size: 17px; font-weight: 700; line-height: 1.35; margin: 0;
    letter-spacing: -0.3px; position: relative; z-index: 1; color: var(--dark);
    padding-right: 78px; /* leave room for corner sticker */
  }
  .countdown-card[data-sticker="off"] .cd-headline { padding-right: 0; }
  .cd-headline span {
    color: var(--cd-accent);
    font-size: 14px; font-weight: 600;
    display: block; margin-top: 4px;
    white-space: nowrap;
  }

  /* corner sticker (rotated red circle, top-right) */
  .countdown-card .cd-corner-sticker {
    position: absolute; right: -16px; top: -16px;
    width: 86px; height: 86px;
    border-radius: 50%;
    background: var(--cd-accent);
    color: #fff;
    border: 1.5px solid #1A1A1A;
    box-shadow: 4px 4px 0 #1A1A1A;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    font-family: 'Fredoka','Lexend',sans-serif;
    font-size: 12px; font-weight: 700; line-height: 1.15;
    text-transform: lowercase;
    transform: rotate(8deg);
    z-index: 3;
    padding: 8px;
  }

  /* clock face (used in pre-state only) */
  .countdown-card .cd-clock {
    display: flex; align-items: flex-end; gap: 4px;
    background: linear-gradient(135deg, #FFFAF0 0%, #FFF0E6 100%);
    border: 1.5px solid #1A1A1A;
    border-radius: 14px; padding: 14px 10px;
    box-shadow: 2px 2px 0 #1A1A1A;
    position: relative; z-index: 1;
  }
  .cd-unit { flex: 1; display: flex; flex-direction: column; align-items: center; }
  .cd-num {
    font-family: 'Lexend','Be Vietnam Pro',monospace;
    font-weight: 800; font-size: 30px; line-height: 1;
    color: var(--cd-accent);
    letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
  }
  .cd-lbl {
    font-size: 10px; font-weight: 600; letter-spacing: 1px;
    color: var(--g500); margin-top: 6px; text-transform: uppercase;
  }
  .cd-sep {
    font-size: 22px; font-weight: 700;
    color: rgba(232,25,44,0.35);
    transform: translateY(-12px);
    animation: cdBlink 1s infinite;
  }
  @keyframes cdBlink { 50% { opacity: 0.3; } }

  /* quote / wish (pre-state) */
  .countdown-card .cd-quote {
    position: relative; z-index: 1;
    background: var(--red-light);
    border-left: 3px solid var(--cd-accent);
    padding: 12px 14px; border-radius: 0 10px 10px 0;
  }
  .cd-quote-mark { width: 16px; height: 16px; color: var(--cd-accent); opacity: .8; }
  .cd-quote p { font-size: 13px; line-height: 1.6; color: var(--g700); margin: 4px 0 0; }
  .cd-quote p strong { color: var(--cd-accent); font-weight: 700; }
  .cd-quote-by { font-size: 11px; color: var(--g500); margin-top: 6px; font-style: italic; }

  /* CTA pulse animation */
  .countdown-card .cd-cta {
    align-self: flex-start;
    position: relative; z-index: 1;
    margin-top: 2px;
    animation: cdCtaPulse 2.2s ease-in-out infinite;
    will-change: transform, box-shadow;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .countdown-card .cd-cta .icon { animation: cdCtaArrow 1.4s ease-in-out infinite; }
  .countdown-card .cd-cta:hover { animation-play-state: paused; }
  @keyframes cdCtaPulse {
    0%, 100% {
      transform: translateY(0);
      box-shadow: 0 0 0 0  rgba(232,25,44,0.5),
                  0 4px 0  rgba(232,25,44,0.3);
    }
    50% {
      transform: translateY(-3px);
      box-shadow: 0 0 0 10px rgba(232,25,44,0),
                  0 10px 22px -6px rgba(232,25,44,0.6);
    }
  }
  @keyframes cdCtaArrow {
    0%, 100% { transform: translateX(0); }
    60%      { transform: translateX(4px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .countdown-card .cd-cta,
    .countdown-card .cd-cta .icon { animation: none; }
  }

  /* ---------- State-aware: de / dap-an ready banner ---------- */
  /* The clock is rendered conditionally in JSX (pre only), and the
     ready banner is rendered conditionally too — but we keep CSS rules
     defensive so any future static rendering still hides cleanly. */
  .countdown-card[data-state="de"] .cd-clock,
  .countdown-card[data-state="dap-an"] .cd-clock { display: none; }

  .countdown-card[data-state="de"] .cd-quote,
  .countdown-card[data-state="dap-an"] .cd-quote { display: none; }

  .countdown-card .cd-ready {
    position: relative;
    display: block;
    margin: 14px 0 16px;
    padding: 22px 18px 18px;
    border: 1.5px solid #1A1A1A;
    border-radius: 16px;
    box-shadow: 2px 2px 0 #1A1A1A;
    text-align: center;
    overflow: hidden;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    transition: transform .15s, box-shadow .15s;
  }
  .countdown-card .cd-ready:hover {
    transform: translate(-1px, -1px);
    box-shadow: 4px 4px 0 #1A1A1A;
  }
  .countdown-card .cd-ready:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 #1A1A1A;
  }
  .countdown-card[data-state="de"] .cd-ready {
    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
  }
  .countdown-card[data-state="dap-an"] .cd-ready {
    background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
  }
  .countdown-card .cd-ready::after {
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(circle at 10% 22%, rgba(255,255,255,.7) 1.6px, transparent 2.2px),
      radial-gradient(circle at 88% 18%, rgba(0,0,0,.12) 1.6px, transparent 2.2px),
      radial-gradient(circle at 80% 84%, rgba(255,255,255,.6) 1.6px, transparent 2.2px),
      radial-gradient(circle at 20% 78%, rgba(0,0,0,.10) 1.6px, transparent 2.2px);
  }
  .countdown-card .cd-ready-emoji {
    font-size: 38px; line-height: 1; display: inline-block;
    animation: cdReadyWiggle 2.4s ease-in-out infinite;
    transform-origin: 50% 80%;
  }
  @keyframes cdReadyWiggle {
    0%, 100% { transform: rotate(-7deg); }
    50%      { transform: rotate(9deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .countdown-card .cd-ready-emoji { animation: none; }
  }
  .countdown-card .cd-ready-title {
    margin: 8px 0 2px;
    font-family: 'Fredoka','Lexend',sans-serif;
    font-size: 24px; font-weight: 700; color: #1A1A1A;
    letter-spacing: -0.5px;
  }
  .countdown-card .cd-ready-sub {
    font-size: 13px; color: #525252; font-weight: 500;
  }

  /* ---------- Popular bộ đề cards ---------- */
  .popular-card {
    background: var(--white); border-radius: 16px; overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--g200);
    display: block; transition: all .2s;
    text-decoration: none; color: inherit;
  }
  .popular-card:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    transform: translateY(-2px);
  }
  .popular-cover {
    height: 130px;
    background: linear-gradient(135deg, var(--red-light), #FFF5F5);
    display: flex; align-items: center; justify-content: center;
    font-size: 52px; position: relative;
  }
  .popular-cover .badge-abs { position: absolute; top: 12px; left: 12px; }
  .popular-body { padding: 14px 20px 18px; }
  .popular-body h3 {
    font-size: 14px; font-weight: 600; color: var(--dark);
    line-height: 1.5; margin: 0 0 12px; min-height: 42px;
  }
  .popular-body .meta { display: flex; gap: 16px; font-size: 13px; color: var(--g500); }

  /* ---------- Post cards ---------- */
  .post-card {
    padding: 20px; border-radius: 16px; cursor: pointer;
    border: 1px solid var(--g200);
    display: block; transition: all .2s;
    background: var(--white);
    text-decoration: none; color: inherit;
  }
  .post-card:hover { border-color: rgba(232,25,44,0.3); transform: translateY(-2px); }
  .post-card .cat {
    font-size: 11px; font-weight: 600; color: var(--red);
    background: var(--red-light);
    padding: 3px 10px; border-radius: 6px;
  }
  .post-card h3 {
    font-size: 14px; font-weight: 600; color: var(--dark);
    line-height: 1.6; margin: 12px 0; min-height: 44px;
  }
  .post-card .meta { display: flex; gap: 16px; font-size: 12px; color: var(--g500); }

  /* ---------- CTA banner ---------- */
  .cta {
    background: linear-gradient(135deg, var(--red), #B91C30);
    padding: 64px 40px; text-align: center;
  }
  .cta-inner { max-width: 560px; margin: 0 auto; }
  .cta h2 { font-size: 30px; font-weight: 800; color: var(--white); margin: 0 0 8px; }
  .cta p { font-size: 15px; color: rgba(255,255,255,0.75); margin-bottom: 28px; }
  .cta-form { display: flex; gap: 8px; max-width: 440px; margin: 0 auto; }
  .cta-form .input-wrap {
    flex: 1; display: flex; align-items: center;
    background: rgba(255,255,255,0.15);
    border-radius: 12px; padding: 0 16px;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .cta-form .input-wrap .icon { color: rgba(255,255,255,0.7); }
  .cta-form input {
    border: none; outline: none; flex: 1;
    padding: 14px 12px; font-size: 14px;
    background: transparent; color: var(--white);
  }
  .cta-form input::placeholder { color: rgba(255,255,255,0.6); }
  .cta-form button {
    padding: 14px 28px; border-radius: 12px;
    background: var(--white); color: var(--red);
    border: none; font-size: 15px; font-weight: 700; cursor: pointer;
  }

  /* ---------- Tabs / section chrome ---------- */
  .tab-pills { display: flex; gap: 8px; }
  .tab-pill {
    padding: 8px 16px; border-radius: 8px; border: none;
    font-size: 13px; font-weight: 500; cursor: pointer;
    background: var(--white); color: var(--g600);
  }
  .tab-pill.active { background: var(--red); color: var(--white); }

  section.gray-section { background: var(--g50); padding: 52px 40px; }
  section.section { max-width: 1280px; margin: 0 auto; padding: 52px 40px; }

  /* ---------- Responsive ---------- */
  @media (max-width: 900px) {
    .grid-4 { grid-template-columns: 1fr 1fr; }
    .grid-3 { grid-template-columns: 1fr; }
    .hero h1 { font-size: 36px; }
    .hero { padding: 48px 16px; }
    .hero-grid {
      grid-template-columns: 1fr; gap: 32px;
      justify-items: center; text-align: center;
    }
    .hero-content { max-width: 100%; }
    .hero-content .search-bar { margin: 0 auto; }
    .hero-countdown {
      width: 100%; max-width: 420px;
      margin: 0 auto;
      justify-self: center;
    }
    section.section, section.gray-section { padding: 32px 16px; }
  }
`;
