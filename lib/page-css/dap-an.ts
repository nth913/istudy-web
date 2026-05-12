export const DAP_AN_CSS = String.raw`
  /* ===== PAGE LAYOUT ===== */
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .container-sm { max-width: 1020px; margin: 0 auto; padding: 24px 40px 40px; }

  /* HEAD CARD */
  .head-card { background: linear-gradient(135deg, var(--green-bg), #fff); border-radius: 20px; padding: 28px 32px; border: 1px solid #BBF7D0; margin-bottom: 18px; }
  .head-card .tag { display: inline-flex; align-items: center; gap: 6px; background: #fff; color: var(--green); padding: 6px 14px; border-radius: 999px; font-size: 12px; font-weight: 700; border: 1px solid #BBF7D0; margin-bottom: 12px; }
  .head-card h1 { font-size: 24px; font-weight: 800; color: var(--dark); margin: 0 0 6px; line-height: 1.4; }
  .head-card .sub { font-size: 14px; color: var(--g500); margin: 0; }
  .head-actions { display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap; }

  /* TABS */
  .tabs { display: flex; gap: 4px; margin-bottom: 16px; background: #fff; padding: 6px; border-radius: 14px; border: 1px solid var(--g200); width: fit-content; max-width: 100%; overflow-x: auto; }
  .tab-btn { padding: 10px 20px; border-radius: 9px; background: transparent; border: 0; font-size: 13px; font-weight: 600; color: var(--g500); cursor: pointer; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
  .tab-btn:hover { color: var(--dark); }
  .tab-btn.active { background: var(--red); color: #fff; }
  .tab-pane { display: none; }
  .tab-pane.active { display: block; }

  /* STATS */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px; }
  .stat-mini { background: #fff; border: 1px solid var(--g200); border-radius: 14px; padding: 16px; text-align: center; }
  .stat-mini .v { font-size: 22px; font-weight: 800; color: var(--red); margin-bottom: 2px; }
  .stat-mini.g .v { color: var(--green); }
  .stat-mini.b .v { color: var(--blue); }
  .stat-mini.p .v { color: var(--purple); }
  .stat-mini .l { font-size: 12px; color: var(--g500); }

  /* HUONG DAN STRIP */
  .huongdan {
    background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 14px;
    padding: 14px 18px; margin-bottom: 16px;
    font-size: 13px; line-height: 1.6; color: #1E40AF;
  }
  .huongdan strong { color: var(--blue); font-weight: 700; }

  /* SHARED CONTEXT (passage / audio / image) — appears BEFORE one or more questions */
  .context-card {
    background: #fff; border: 1px solid var(--g200); border-radius: 14px;
    padding: 16px 20px; margin-bottom: 12px;
  }
  .context-card .ctx-label {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
    color: var(--g500); margin-bottom: 8px;
  }
  .context-card .ctx-body { font-size: 14px; line-height: 1.8; color: var(--g700); }
  .context-card .ctx-body strong { color: var(--dark); }
  .context-card .ctx-body .speaker { color: var(--red); font-weight: 700; }

  /* AUDIO BAR (compact, inside context) */
  .audio-bar {
    display: flex; align-items: center; gap: 12px;
    background: #FAFAFA; border: 1px solid var(--g200);
    padding: 10px 14px; border-radius: 10px; margin-bottom: 10px;
  }
  .audio-bar .play { width: 34px; height: 34px; border-radius: 50%; background: var(--purple); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; font-size: 13px; }
  .audio-bar .wave { flex: 1; display: flex; align-items: center; gap: 2px; }
  .audio-bar .wave span { display: block; width: 3px; background: var(--purple); opacity: 0.55; border-radius: 2px; }
  .audio-bar .time { font-size: 12px; color: var(--g500); font-variant-numeric: tabular-nums; }
  .audio-bar .label { font-size: 12px; font-weight: 700; color: var(--purple); }
  .transcript-toggle { font-size: 12px; font-weight: 600; color: var(--g500); cursor: pointer; padding: 6px 0; user-select: none; }
  .transcript-toggle:hover { color: var(--red); }

  /* ===== QUESTION CARD ===== */
  .qcard {
    background: #fff; border: 1px solid var(--g200); border-radius: 16px;
    margin-bottom: 14px; overflow: hidden;
    transition: border-color .15s;
  }
  .qcard:hover { border-color: var(--g300); }

  .qhead-bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 14px 20px 0; flex-wrap: wrap;
  }
  .qhead-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex: 1; min-width: 0; }

  /* Câu N pill (left-most, green) */
  .pill-cau {
    display: inline-flex; align-items: center; gap: 4px;
    background: var(--green); color: #fff;
    padding: 5px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 700;
    white-space: nowrap; flex-shrink: 0;
  }
  /* Variants for context: writing/short-answer => orange; True/False => blue */
  .pill-cau.is-short { background: #0EA5E9; }
  .pill-cau.is-write { background: var(--orange); }

  /* Question type label (purple lozenge, all caps) */
  .pill-type {
    display: inline-flex; align-items: center;
    background: #F3E8FF; color: var(--purple);
    padding: 5px 12px; border-radius: 999px;
    font-size: 11px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
    white-space: nowrap;
  }

  /* Topic / grammar tag (light gray + emoji) */
  .pill-topic {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--g100); color: var(--g700);
    padding: 5px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 600;
    white-space: nowrap;
  }
  .pill-topic .emo { font-size: 13px; }

  /* Right side link */
  .related-link {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--blue); font-size: 12px; font-weight: 600;
    text-decoration: underline; text-underline-offset: 3px;
    white-space: nowrap;
  }
  .related-link:hover { color: var(--red); }
  .related-link::before { content: '🔗'; text-decoration: none; display: inline-block; font-size: 12px; }

  .qbody-wrap { padding: 14px 20px 18px; }
  .qstem { font-size: 14.5px; color: var(--g800); margin: 0 0 14px; line-height: 1.75; }
  .qstem strong { color: var(--dark); font-weight: 700; }
  .qstem em { font-style: italic; }
  .qstem .speaker-name { color: var(--g800); font-weight: 600; }

  /* OPTIONS — 2x2 grid */
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .opt {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 10px;
    background: #fff; border: 1.5px solid var(--g200);
    font-size: 14px; color: var(--g700);
    min-height: 48px;
  }
  .opt .lt { font-weight: 600; color: var(--g800); }
  .opt.right {
    background: var(--green-bg); border-color: var(--green);
    color: var(--g800); font-weight: 600;
  }
  .opt.right .check {
    color: var(--green); font-weight: 800; font-size: 16px; margin-right: 2px;
  }
  .opt.right .lt { color: var(--green); font-weight: 700; }
  .opt.wrong { background: var(--red-light); border-color: #FECACA; color: var(--red); }

  /* ERROR ID: stem with labeled underlines */
  .err-stem { font-size: 16px; color: var(--g800); line-height: 2.4; margin: 4px 0 12px; }
  .err-tag {
    position: relative; display: inline-block;
    border-bottom: 2px solid var(--g500);
    padding-left: 16px; margin: 0 4px;
  }
  .err-tag .lab {
    position: absolute; left: 2px; top: -6px;
    font-size: 11px; font-weight: 800; color: var(--red);
  }
  .err-tag.is-error { background: #FEE2E2; color: var(--red); border-bottom-color: var(--red); padding: 2px 8px 2px 16px; border-radius: 4px; }

  /* GREEN ANSWER BANNER (used for error-id correct sentence, fill-in answer, T/F result) */
  .answer-banner {
    display: flex; gap: 12px; align-items: flex-start;
    background: var(--green-bg); border-radius: 12px;
    padding: 14px 18px; margin-top: 4px;
    font-size: 14px; line-height: 1.6;
  }
  .answer-banner .icon { color: var(--green); font-size: 18px; line-height: 1.4; flex-shrink: 0; font-weight: 800; }
  .answer-banner .lbl {
    font-size: 11px; font-weight: 800; color: var(--green);
    text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px;
  }
  .answer-banner .val { color: var(--dark); font-weight: 700; }
  .answer-banner.is-false { background: #FEF2F2; }
  .answer-banner.is-false .icon, .answer-banner.is-false .lbl { color: var(--red); }

  /* FILL: multiple suggested answers */
  .fill-row { display: flex; flex-direction: column; gap: 8px; }

  /* MODEL ANSWER (writing) */
  .model {
    background: #FFFBEB;
    border: 1px solid #FDE68A; border-radius: 12px;
    padding: 16px 20px;
    font-size: 14px; line-height: 1.85; color: var(--g700);
  }
  .model .ml { font-size: 11px; font-weight: 800; color: var(--orange); text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 8px; }
  .model em { color: var(--g600); }

  /* EXPLAIN TOGGLE */
  .expl-toggle {
    margin-top: 14px;
    display: flex; align-items: center; gap: 10px;
    background: #FAFAFA; border: 1px solid var(--g200);
    padding: 12px 16px; border-radius: 10px;
    width: 100%; cursor: pointer;
    font-size: 13px; font-weight: 600; color: var(--g700);
    text-align: left;
  }
  .expl-toggle:hover { background: var(--g100); }
  .expl-toggle .chev { margin-left: auto; transition: transform .2s; color: var(--g500); font-size: 10px; }
  .qcard.open .expl-toggle { background: #FEF2F2; border-color: #FECACA; color: var(--red); }
  .qcard.open .expl-toggle .chev { transform: rotate(180deg); color: var(--red); }

  .expl-body { display: none; margin-top: 10px; }
  .qcard.open .expl-body { display: block; }
  .expl-content {
    background: #F0FDF4;
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 13.5px; line-height: 1.85; color: var(--g800);
  }
  .expl-content .expl-title {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; color: var(--green);
    text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;
  }
  .expl-content p { margin: 0 0 6px; }
  .expl-content ul { margin: 6px 0 0; padding-left: 4px; list-style: none; }
  .expl-content ul li { padding-left: 14px; position: relative; margin-bottom: 4px; }
  .expl-content ul li::before { content: '•'; position: absolute; left: 0; top: 0; color: var(--green); font-weight: 800; }
  .expl-content strong { color: var(--dark); font-weight: 700; }
  .expl-content em { color: var(--g600); font-style: italic; }
  .expl-content .vocab { margin-top: 8px; display: grid; gap: 4px; }
  .expl-content .vocab > div { display: flex; gap: 10px; font-size: 12.5px; }
  .expl-content .vocab .w { color: var(--green); font-weight: 700; min-width: 130px; }
  .expl-content .tip { margin-top: 10px; padding-top: 8px; border-top: 1px dashed #BBF7D0; font-size: 12.5px; color: var(--g600); }

  /* TAB 2: KEY BOARD */
  .key-board {
    background: linear-gradient(135deg, #FFF5F5, #fff);
    border: 1px solid var(--g200); border-radius: 20px;
    padding: 48px 56px; position: relative; overflow: hidden;
  }
  .key-board::before { content: ''; position: absolute; inset: 0; background: url('assets/istudy-circle.png') center/280px no-repeat; opacity: 0.08; pointer-events: none; }
  .key-board::after { content: 'www.istudy.group'; position: absolute; left: 50%; top: 56%; transform: translateX(-50%); color: var(--red); font-size: 16px; font-style: italic; opacity: 0.35; pointer-events: none; font-family: Georgia, serif; }
  .key-title { text-align: center; font-size: 14px; font-weight: 800; color: var(--dark); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px; position: relative; }
  .key-title .ln { font-size: 13px; color: var(--g500); font-weight: 600; text-transform: none; letter-spacing: normal; margin-top: 4px; }
  .key-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px 32px; font-family: Georgia, 'Times New Roman', serif; font-size: 22px; color: var(--dark); position: relative; }
  .key-grid > div { display: flex; gap: 14px; align-items: baseline; }
  .key-grid .n { color: var(--g500); min-width: 32px; text-align: right; font-weight: 400; }
  .key-grid .a { font-weight: 700; }
  .key-foot { text-align: center; margin-top: 28px; font-size: 11px; color: var(--g400); position: relative; }

  /* TAB 3 */
  .img-tab { background: #fff; border-radius: 16px; border: 1px solid var(--g200); padding: 28px; text-align: center; }
  .img-tab img { max-width: 100%; height: auto; border-radius: 10px; }
  .img-tab .cap { font-size: 12px; color: var(--g500); margin-top: 12px; }

  @media (max-width: 800px) {
    .container-sm { padding: 16px; }
    .head-card { padding: 20px; }
    .qhead-bar, .qbody-wrap { padding-left: 16px; padding-right: 16px; }
    .opts { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .related-link { width: 100%; margin-top: 4px; }
    .key-grid { grid-template-columns: repeat(2, 1fr); font-size: 18px; }
    .key-board { padding: 28px 24px; }
  }
`;
