export const DAP_AN_CSS = String.raw`
  /* ============================================
     istudy — Đáp án page (v2 design v2 refresh 2026-05-18)
     Ports: dap-an.html + de-dap-an.css + de-dap-an-waiting.css
     chat21 final tweaks applied (see comments inline).
     ============================================ */

  /* ===== PAGE SCAFFOLD ===== */
  .page-wrap { background: var(--g50); min-height: 100vh; padding-bottom: 60px; }
  .container-md { max-width: 1100px; margin: 0 auto; padding: 24px 40px; }

  /* ===== HEAD CARD ===== */
  .head-card {
    background: var(--white); border-radius: 22px; padding: 28px 32px;
    border: 1px solid var(--g200); margin-bottom: 16px;
  }
  .head-card.is-dapan {
    background: linear-gradient(135deg, var(--green-bg) 0%, #fff 60%);
    border-color: #BBF7D0;
  }
  .head-meta { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
  .head-card h1 {
    font-size: 26px; font-weight: 800; color: var(--dark);
    margin: 0 0 8px; line-height: 1.35; letter-spacing: -0.3px;
  }
  .head-card .desc { font-size: 14px; color: var(--g600); margin: 0 0 18px; line-height: 1.6; max-width: 720px; }

  .info-row {
    display: flex; gap: 18px; padding: 12px 0;
    border-top: 1px solid var(--g100); border-bottom: 1px solid var(--g100);
    margin-bottom: 16px; font-size: 13px; color: var(--g600); flex-wrap: wrap;
  }
  .info-row span { display: inline-flex; align-items: center; gap: 6px; }
  .info-row b { color: var(--dark); font-weight: 600; }

  .head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .head-actions .btn { padding: 10px 18px; font-size: 14px; border-radius: 10px; }
  .head-actions .btn[aria-disabled="true"] { opacity: 0.55; pointer-events: none; }

  /* ===== STATUS STRIP ===== */
  .status-strip {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    background: var(--white); border-radius: 14px; padding: 14px 18px;
    border: 1px solid var(--g200); margin-bottom: 14px;
    font-size: 13.5px; color: var(--g700);
  }
  .status-strip.is-waiting { background: #FFF8EC; border-color: #FCD89D; color: #8A5410; }
  .status-strip.is-mixed   { background: #EFF6FF; border-color: #BFDBFE; color: #1E40AF; }
  .status-strip.is-ready   { background: #F0FDF4; border-color: #BBF7D0; color: #14532D; }
  .status-strip .ss-dot {
    width: 10px; height: 10px; border-radius: 50%;
    flex-shrink: 0; box-shadow: 0 0 0 4px rgba(0,0,0,0.04);
  }
  .status-strip.is-waiting .ss-dot { background: #D97706; animation: ssPulse 1.4s ease-out infinite; }
  .status-strip.is-mixed   .ss-dot { background: var(--blue); animation: ssPulse 1.4s ease-out infinite; }
  .status-strip.is-ready   .ss-dot { background: var(--green); }
  .status-strip b { font-weight: 700; }
  .status-strip .ss-grow { flex: 1; min-width: 200px; line-height: 1.55; }
  .status-strip .ss-action {
    font-weight: 600; cursor: pointer; color: inherit;
    white-space: nowrap;
  }
  .status-strip .ss-action:hover { text-decoration: underline; }

  @keyframes ssPulse {
    0%   { box-shadow: 0 0 0 0 rgba(217,119,6,0.45); }
    70%  { box-shadow: 0 0 0 10px rgba(217,119,6,0); }
    100% { box-shadow: 0 0 0 0 rgba(217,119,6,0); }
  }

  /* ===== TABS BAR (mã đề strip) ===== */
  .tabs-bar {
    background: var(--white); border: 1px solid var(--g200); border-radius: 16px;
    padding: 3px 8px 6px; margin-bottom: 14px;
  }
  /* chat21: center-align tabs-head, no chip, no label */
  .tabs-head {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-bottom: 8px; padding-top: 6px;
  }

  /* "Chọn mã đề" jump button (renamed from "Nhảy tới mã", centered) */
  .tabs-jump { position: relative; }
  .tabs-jump-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 14px; border-radius: 8px;
    background: var(--g100); color: var(--g700);
    font-size: 12.5px; font-weight: 600; border: 1px solid var(--g200);
    cursor: pointer; list-style: none;
  }
  .tabs-jump-btn::-webkit-details-marker { display: none; }
  .tabs-jump-btn:hover { background: var(--g200); }
  .tabs-jump .jump-chev { font-size: 10px; opacity: 0.6; }
  .tabs-jump[open] .jump-chev { transform: rotate(180deg); }

  .tabs-jump-menu {
    position: absolute; left: 50%; transform: translateX(-50%); top: calc(100% + 6px); z-index: 20;
    background: var(--white); border: 1px solid var(--g200); border-radius: 10px;
    box-shadow: 0 10px 30px rgba(17,17,17,0.10);
    padding: 8px; min-width: 240px; max-height: 280px; overflow-y: auto;
  }
  .tabs-jump-menu .tjm-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px;
  }
  .tjm-item {
    padding: 7px 4px; border-radius: 6px; font-size: 12px; font-weight: 600;
    text-align: center; cursor: pointer; color: var(--g700);
    background: var(--g100); display: flex; align-items: center; justify-content: center; gap: 4px;
    text-decoration: none;
  }
  .tjm-item:hover { background: var(--g200); }
  .tjm-item.is-ready  { background: #F0FDF4; color: var(--green); }
  .tjm-item.is-quick  { background: rgba(59,130,246,0.10); color: #1E40AF; }
  .tjm-item.is-pending { background: #FFF8EC; color: #8A5410; }
  .tjm-item.is-active { background: var(--dark); color: #fff; }
  .tjm-item .tjm-d { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.6; }
  .tjm-item.is-pending .tjm-d { background: #D97706; animation: ssPulse 1.4s ease-out infinite; opacity: 1; }
  .tjm-item.is-quick .tjm-d   { background: #3B82F6; opacity: 1; }
  .tjm-item.is-ready .tjm-d   { background: var(--green); opacity: 1; }

  /* chat21 final: thanh scroll ngang giới hạn ~720px, canh giữa */
  .tabs-scroll {
    display: flex; align-items: flex-start; gap: 4px;
    max-width: 720px; margin: 0 auto;
    position: relative;
  }
  .tabs-scroll .tabs-nav {
    width: 30px; height: 36px; border-radius: 8px;
    background: var(--g100); color: var(--g600);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; border: 1px solid var(--g200);
  }
  .tabs-scroll .tabs-nav:hover { background: var(--g200); color: var(--dark); }
  .tabs-scroll-track {
    flex: 1; overflow-x: auto; overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: var(--g300) transparent;
    padding-bottom: 10px;
    scroll-behavior: smooth;
  }
  .tabs-scroll-track::-webkit-scrollbar { height: 6px; }
  /* chat21: scrollbar track ngắn — margin 30% mỗi bên */
  .tabs-scroll-track::-webkit-scrollbar-track {
    background: var(--g100); border-radius: 999px;
    margin: 0 30%;
  }
  .tabs-scroll-track::-webkit-scrollbar-thumb { background: var(--g300); border-radius: 999px; }
  .tabs-scroll-track::-webkit-scrollbar-thumb:hover { background: var(--g400); }
  .tabs-scroll-list { display: flex; gap: 4px; padding: 0 8px; }

  .tab-pill {
    flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 9px;
    font-size: 13px; font-weight: 600;
    background: var(--g100); color: var(--g600);
    border: 1px solid transparent;
    text-decoration: none;
    font-variant-numeric: tabular-nums; transition: all .12s;
    white-space: nowrap; min-height: 36px;
  }
  .tab-pill:hover { background: var(--g200); color: var(--dark); }
  .tab-pill .tp-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--g400); flex-shrink: 0;
  }

  /* 3-state colors for đáp án */
  .tab-pill.is-pending .tp-dot { background: #D97706; animation: ssPulse 1.4s ease-out infinite; }
  .tab-pill.is-pending { color: var(--g500); background: transparent; border-color: var(--g200); }
  .tab-pill.is-pending:hover { background: var(--g100); }
  .tab-pill.is-quick .tp-dot   { background: #3B82F6; }
  .tab-pill.is-quick {
    color: var(--g700); background: rgba(59,130,246,0.08);
    border-color: rgba(59,130,246,0.18);
  }
  .tab-pill.is-quick:hover { background: rgba(59,130,246,0.14); }
  .tab-pill.is-ready .tp-dot { background: var(--green); }
  .tab-pill.is-ready { background: rgba(22,163,74,0.08); border-color: rgba(22,163,74,0.18); color: var(--g700); }
  .tab-pill.is-ready:hover { background: rgba(22,163,74,0.14); }

  .tab-pill.is-active.is-ready    { background: var(--green); border-color: var(--green); color: #fff; }
  .tab-pill.is-active.is-quick    { background: #3B82F6;     border-color: #3B82F6;     color: #fff; }
  .tab-pill.is-active.is-pending  { background: #D97706;     border-color: #D97706;     color: #fff; }
  .tab-pill.is-active .tp-dot { background: var(--white); animation: none; }

  .tab-pill .tp-new {
    font-size: 9px; font-weight: 800; letter-spacing: 0.5px;
    background: var(--red); color: #fff; padding: 1px 5px;
    border-radius: 4px; line-height: 12px; text-transform: uppercase;
  }
  .tab-pill.is-active .tp-new { background: var(--white); color: var(--green); }

  /* ===== TOP-LEVEL VIEW TABS (Đáp án chi tiết / Bảng đáp án / Ảnh đáp án) ===== */
  .tabs {
    display: flex; gap: 4px; margin-bottom: 16px; background: var(--white);
    padding: 6px; border-radius: 14px; border: 1px solid var(--g200);
    width: fit-content; max-width: 100%; overflow-x: auto;
  }
  .tab-btn {
    padding: 10px 20px; border-radius: 9px; background: transparent; border: 0;
    font-size: 13px; font-weight: 600; color: var(--g500);
    cursor: pointer; white-space: nowrap; text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .tab-btn:hover { color: var(--dark); }
  .tab-btn.active { background: var(--red); color: #fff; }
  .tab-pane { display: block; }

  /* ===== HUONG DAN STRIP ===== */
  .huongdan {
    background: #EFF6FF; border: 1px solid #DBEAFE; border-radius: 14px;
    padding: 14px 18px; margin-bottom: 16px;
    font-size: 13px; line-height: 1.6; color: #1E40AF;
  }
  .huongdan strong { color: var(--blue); font-weight: 700; }

  /* ===== CONTEXT CARD (passage / audio) ===== */
  .context-card {
    background: var(--white); border: 1px solid var(--g200); border-radius: 14px;
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
  .transcript-details { margin-top: 4px; }
  .transcript-details summary { list-style: none; cursor: pointer; }
  .transcript-details summary::-webkit-details-marker { display: none; }
  .transcript-toggle {
    font-size: 12px; font-weight: 600; color: var(--g500);
    padding: 6px 0; user-select: none; display: inline-block;
  }
  .transcript-toggle:hover { color: var(--red); }
  .transcript-body { margin-top: 8px; padding: 12px 14px; background: #FAFAFA; border-radius: 8px; }

  /* AUDIO BAR */
  .audio-bar {
    display: flex; align-items: center; gap: 12px;
    background: #FAFAFA; border: 1px solid var(--g200);
    padding: 10px 14px; border-radius: 10px; margin-bottom: 10px;
  }
  .audio-bar .play {
    width: 34px; height: 34px; border-radius: 50%; background: var(--purple);
    color: #fff; display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 13px;
  }
  .audio-bar .wave { flex: 1; display: flex; align-items: center; gap: 2px; }
  .audio-bar .wave span { display: block; width: 3px; background: var(--purple); opacity: 0.55; border-radius: 2px; }
  .audio-bar .time { font-size: 12px; color: var(--g500); font-variant-numeric: tabular-nums; }
  .audio-bar .label { font-size: 12px; font-weight: 700; color: var(--purple); }

  /* ===== QUESTION CARD (collapsible via <details>) ===== */
  .qcard {
    background: var(--white); border: 1px solid var(--g200); border-radius: 16px;
    margin-bottom: 14px; overflow: hidden;
    transition: border-color .15s;
  }
  .qcard:hover { border-color: var(--g300); }
  .qcard summary { list-style: none; cursor: pointer; }
  .qcard summary::-webkit-details-marker { display: none; }
  .qcard .qcard-summary { display: block; }

  .qhead-bar {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; padding: 14px 20px 0; flex-wrap: wrap;
  }
  .qhead-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; flex: 1; min-width: 0; }

  .pill-cau {
    display: inline-flex; align-items: center; gap: 4px;
    background: var(--green); color: #fff;
    padding: 5px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 700;
    white-space: nowrap; flex-shrink: 0;
  }
  .pill-cau.is-short { background: #0EA5E9; }
  .pill-cau.is-write { background: var(--orange); }

  .pill-type {
    display: inline-flex; align-items: center;
    background: #F3E8FF; color: var(--purple);
    padding: 5px 12px; border-radius: 999px;
    font-size: 11px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;
    white-space: nowrap;
  }
  .pill-topic {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--g100); color: var(--g700);
    padding: 5px 12px; border-radius: 999px;
    font-size: 12px; font-weight: 600;
    white-space: nowrap;
  }
  .pill-topic .emo { font-size: 13px; }

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

  /* Options */
  .opts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .opt {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 16px; border-radius: 10px;
    background: var(--white); border: 1.5px solid var(--g200);
    font-size: 14px; color: var(--g700);
    min-height: 48px;
  }
  .opt .lt { font-weight: 600; color: var(--g800); }
  .opt.right {
    background: var(--green-bg); border-color: var(--green);
    color: var(--g800); font-weight: 600;
  }
  .opt.right .check { color: var(--green); font-weight: 800; font-size: 16px; margin-right: 2px; }
  .opt.right .lt { color: var(--green); font-weight: 700; }

  /* Error ID stem */
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

  /* Answer banner */
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

  .fill-row { display: flex; flex-direction: column; gap: 8px; }

  /* Model (writing sample) */
  .model {
    background: #FFFBEB;
    border: 1px solid #FDE68A; border-radius: 12px;
    padding: 16px 20px;
    font-size: 14px; line-height: 1.85; color: var(--g700);
  }
  .model .ml {
    font-size: 11px; font-weight: 800; color: var(--orange);
    text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 8px;
  }
  .model em { color: var(--g600); }

  /* Expand marker (visible under summary when not open) */
  .expl-marker {
    display: flex; align-items: center; gap: 10px;
    margin: 0 20px 16px;
    background: #FAFAFA; border: 1px solid var(--g200);
    padding: 10px 16px; border-radius: 10px;
    font-size: 13px; font-weight: 600; color: var(--g700);
  }
  .expl-marker .chev {
    margin-left: auto; transition: transform .2s;
    color: var(--g500); font-size: 10px;
  }
  .qcard[open] .expl-marker { background: #FEF2F2; border-color: #FECACA; color: var(--red); }
  .qcard[open] .expl-marker .chev { transform: rotate(180deg); color: var(--red); }

  .expl-body { padding: 0 20px 16px; }
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
  .expl-content .tip {
    margin-top: 10px; padding-top: 8px; border-top: 1px dashed #BBF7D0;
    font-size: 12.5px; color: var(--g600);
  }

  /* ===== WAITING CARD ===== */
  .waiting-card {
    background: var(--white); border-radius: 18px;
    border: 1px solid var(--g200); overflow: hidden;
    position: relative; margin-bottom: 14px;
  }
  .waiting-head {
    padding: 32px 40px 20px;
    display: grid; grid-template-columns: auto 1fr; gap: 22px;
    align-items: center;
  }
  .waiting-icon-wrap {
    width: 72px; height: 72px; border-radius: 18px;
    display: flex; align-items: center; justify-content: center;
    position: relative; flex-shrink: 0;
  }
  .waiting-card.is-dapan .waiting-icon-wrap {
    background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
    color: var(--green);
  }
  .waiting-icon-wrap svg { width: 36px; height: 36px; }
  .waiting-icon-wrap::after {
    content: ""; position: absolute; inset: -4px; border-radius: 22px;
    border: 2px solid currentColor; opacity: 0.18;
    animation: wPing 2s ease-out infinite;
  }
  @keyframes wPing {
    0%   { transform: scale(0.92); opacity: 0.4; }
    100% { transform: scale(1.18); opacity: 0;   }
  }

  .waiting-text h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 0 0 6px; line-height: 1.3; }
  .waiting-text p { font-size: 14px; color: var(--g600); margin: 0; line-height: 1.6; max-width: 580px; }

  .waiting-meta {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 40px;
    border-top: 1px dashed var(--g200);
    border-bottom: 1px dashed var(--g200);
    font-size: 12.5px; color: var(--g500);
    flex-wrap: wrap;
  }
  .waiting-meta span { display: inline-flex; align-items: center; gap: 6px; }
  .waiting-meta b { color: var(--g700); font-weight: 600; }

  /* Skeleton: answer-grid pending */
  .skel-answer-wrap { padding: 24px 40px 32px; }
  .skel-answer-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
    gap: 8px;
    max-width: 720px; margin: 0 auto 20px;
  }
  .skel-ans-cell {
    background: #F0FDF4; border: 1px solid #BBF7D0;
    border-radius: 10px; padding: 10px 12px;
    display: flex; align-items: center; gap: 8px;
    position: relative; overflow: hidden;
  }
  .skel-ans-cell::before {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
    transform: translateX(-100%);
    animation: shimmer-h 2.2s ease-in-out infinite;
  }
  @keyframes shimmer-h {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%);  }
  }
  .skel-ans-cell .ans-num {
    font-size: 12px; font-weight: 700; color: var(--green);
    font-variant-numeric: tabular-nums;
    background: var(--white); padding: 2px 6px; border-radius: 5px;
    border: 1px solid #BBF7D0; flex-shrink: 0;
    position: relative; z-index: 1;
  }
  .skel-ans-cell .ans-box {
    flex: 1; height: 14px; border-radius: 4px;
    background: rgba(22,163,74,0.12);
    position: relative; z-index: 1;
  }
  .skel-progress {
    max-width: 720px; margin: 0 auto 16px;
    background: var(--white); border: 1px solid var(--g200);
    border-radius: 12px; padding: 14px 18px;
    display: flex; align-items: center; gap: 14px;
  }
  .skel-progress .sp-text { font-size: 13px; color: var(--g700); font-weight: 600; }
  .skel-progress .sp-bar {
    flex: 1; height: 6px; background: var(--g100);
    border-radius: 999px; overflow: hidden;
  }
  .skel-progress .sp-bar > div {
    height: 100%;
    background: linear-gradient(90deg, var(--green) 0%, #4ADE80 100%);
    border-radius: 999px;
  }
  .skel-progress .sp-pct {
    font-size: 13px; font-weight: 700; color: var(--green);
    font-variant-numeric: tabular-nums; min-width: 40px; text-align: right;
  }

  .waiting-cta {
    display: flex; gap: 10px; padding: 0 40px 32px;
    flex-wrap: wrap;
  }
  .waiting-cta .notify-form {
    display: flex; gap: 6px; flex: 1; min-width: 280px;
  }
  .waiting-cta .notify-form input {
    flex: 1; padding: 12px 16px; border-radius: 12px;
    border: 1px solid var(--g300); font-size: 14px; outline: none;
    background: var(--white);
  }
  .waiting-card.is-dapan .notify-form input:focus { border-color: var(--green); }

  /* ===== ANSWER KEY CARD ===== */
  .ans-key-card {
    background: var(--white); border-radius: 16px;
    border: 1px solid var(--g200); padding: 24px 28px;
    margin-bottom: 14px;
  }
  .ans-key-head {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; margin-bottom: 16px; flex-wrap: wrap;
  }
  .ans-key-head h3 {
    font-size: 16px; font-weight: 700; margin: 0; color: var(--dark);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .ans-key-head h3 .ans-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 22px; height: 22px; border-radius: 6px;
    background: var(--green-bg); color: var(--green); font-weight: 800;
    border: 1px solid #BBF7D0;
  }
  .ans-key-head .akh-meta { font-size: 12.5px; color: var(--g500); }

  .ans-state-badges {
    display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px;
  }
  .state-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 999px;
  }
  .state-badge--ready {
    background: var(--green-bg); color: var(--green); border: 1px solid #BBF7D0;
  }
  .state-badge--pending {
    background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE;
  }
  .state-badge--pending .badge-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #3B82F6;
    animation: ssPulse 1.4s ease-out infinite;
  }

  .ans-key-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    gap: 6px;
  }
  .ans-key-cell {
    background: #F8FAFC; border: 1px solid var(--g200);
    border-radius: 8px; padding: 8px 10px;
    display: flex; align-items: center; justify-content: space-between;
    font-size: 13px; font-variant-numeric: tabular-nums;
  }
  .ans-key-cell .akc-n { color: var(--g500); font-weight: 600; }
  .ans-key-cell .akc-v {
    font-weight: 800; color: var(--green);
    width: 22px; height: 22px; border-radius: 5px;
    display: flex; align-items: center; justify-content: center;
    background: var(--white); border: 1px solid #BBF7D0;
  }

  /* ===== TAB 2: KEY BOARD (50 đáp án + watermark) ===== */
  .key-board {
    background: linear-gradient(135deg, #FFF5F5, #fff);
    border: 1px solid var(--g200); border-radius: 20px;
    padding: 48px 56px; position: relative; overflow: hidden;
  }
  /* Watermark "istudy" circle pseudo-element (CSS only, no asset dependency) */
  .key-board::before {
    content: 'istudy';
    position: absolute; left: 50%; top: 50%;
    transform: translate(-50%, -50%) rotate(-18deg);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 220px; font-weight: 800;
    color: var(--green); opacity: 0.06; pointer-events: none;
    letter-spacing: -4px;
  }
  /* "aistudy.com.vn" chìm mờ giữa */
  .key-board::after {
    content: 'aistudy.com.vn';
    position: absolute; left: 50%; top: 56%;
    transform: translateX(-50%);
    color: var(--red); font-size: 18px; font-style: italic;
    opacity: 0.32; pointer-events: none;
    font-family: Georgia, serif; letter-spacing: 1px;
  }
  .key-title {
    text-align: center; font-size: 14px; font-weight: 800; color: var(--dark);
    letter-spacing: 1px; text-transform: uppercase;
    margin-bottom: 24px; position: relative;
  }
  .key-title .ln {
    font-size: 13px; color: var(--g500); font-weight: 600;
    text-transform: none; letter-spacing: normal; margin-top: 4px;
  }
  .key-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px 32px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 22px; color: var(--dark); position: relative;
  }
  .key-grid > div { display: flex; gap: 14px; align-items: baseline; }
  .key-grid .n { color: var(--g500); min-width: 32px; text-align: right; font-weight: 400; }
  .key-grid .a { font-weight: 700; }
  .key-foot {
    text-align: center; margin-top: 28px;
    font-size: 11px; color: var(--g400); position: relative;
  }
  .key-print-hint {
    text-align: center; font-size: 12px; color: var(--g500);
    margin: 14px 0 0;
  }
  .key-print-hint kbd {
    background: var(--g100); border: 1px solid var(--g300);
    border-radius: 4px; padding: 1px 6px; font-size: 11px;
    font-family: ui-monospace, monospace; color: var(--g700);
  }

  /* Print rules — bảng đáp án friendly */
  @media print {
    .page-wrap { background: #fff; padding: 0; }
    .head-actions, .status-strip, .tabs-bar, .tabs, .huongdan,
    nav.breadcrumb, .key-print-hint, .container-md > div[style*="text-align"] { display: none !important; }
    .container-md { padding: 0; max-width: none; }
    .head-card { box-shadow: none; border: none; padding: 0 0 12px; }
    .key-board { box-shadow: none; border: 1px solid #ddd; padding: 28px 32px; }
    .key-board::before { opacity: 0.08; }
    .key-board::after  { opacity: 0.35; }
  }

  /* ===== PREVIEW BLOCK (3 câu đầu) ===== */
  .preview-detail-block {
    background: var(--white); border: 1px solid var(--g200); border-radius: 16px;
    padding: 20px 24px; margin-bottom: 14px;
  }
  .preview-detail-block .pdb-title {
    font-size: 14px; font-weight: 700; color: var(--g700);
    margin: 0 0 14px; display: flex; align-items: center; gap: 8px;
  }
  .preview-detail-block .pdb-badge {
    font-size: 11px; background: #F3E8FF; color: var(--purple);
    padding: 3px 10px; border-radius: 999px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.5px;
  }
  .pdb-item {
    background: var(--white); border: 1px solid var(--g200); border-radius: 12px;
    padding: 16px 18px; margin-bottom: 10px;
  }
  .pdb-item-head {
    display: flex; gap: 10px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;
  }
  .pdb-qpill {
    background: var(--green); color: #fff;
    font-size: 12px; font-weight: 700;
    padding: 3px 10px; border-radius: 999px;
  }
  .pdb-akey {
    font-size: 11px; background: var(--green-bg); color: var(--green);
    padding: 2px 9px; border-radius: 5px; font-weight: 700;
    border: 1px solid #BBF7D0;
  }
  .pdb-q {
    font-size: 13.5px; color: var(--g700); line-height: 1.7; margin-bottom: 8px;
  }
  .pdb-sol {
    font-size: 13px; color: var(--g600); line-height: 1.7;
    padding: 10px 14px; background: #FAFAFA;
    border-left: 3px solid var(--green);
    border-radius: 0 8px 8px 0;
  }
  .pdb-sol-lbl { color: var(--green); font-weight: 700; }
  .pdb-all-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 13px; font-weight: 600; color: var(--green);
    margin-top: 8px; text-decoration: none;
  }
  .pdb-all-link:hover { text-decoration: underline; }

  /* ===== QUICK-ONLY WAITING STRIP (status=quick) ===== */
  .quick-waiting-strip {
    margin-top: 0; margin-bottom: 14px;
    padding: 20px 22px; border-radius: 14px;
    background: linear-gradient(135deg, #EFF6FF 0%, #fff 70%);
    border: 1px solid #BFDBFE;
  }
  .quick-waiting-strip .qws-head {
    display: flex; gap: 14px; align-items: center;
  }
  .quick-waiting-strip .qws-icon-wrap {
    width: 48px; height: 48px; border-radius: 12px;
    background: var(--white); border: 1px solid #BFDBFE;
    display: flex; align-items: center; justify-content: center;
    color: #1E40AF; flex-shrink: 0; position: relative;
  }
  .quick-waiting-strip .qws-icon-ping {
    position: absolute; inset: -3px; border: 2px solid #3B82F6;
    opacity: 0.35; border-radius: 14px;
    animation: wPing 2s ease-out infinite;
  }
  .quick-waiting-strip .qws-text { flex: 1; min-width: 0; }
  .quick-waiting-strip .qws-title {
    font-size: 15px; font-weight: 700; color: #1E40AF; margin-bottom: 4px;
  }
  .quick-waiting-strip .qws-sub {
    font-size: 13px; color: #3B5BAB; line-height: 1.6; margin: 0;
  }
  .quick-waiting-strip .qws-skel-list {
    margin-top: 16px; display: flex; flex-direction: column; gap: 8px;
  }
  .quick-waiting-strip .qws-skel-cell {
    background: var(--white); border: 1px dashed #BFDBFE; border-radius: 10px;
    padding: 14px 16px; position: relative; overflow: hidden;
  }
  .quick-waiting-strip .qws-skel-cell::before {
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(191,219,254,0.4), transparent);
    transform: translateX(-100%);
    animation: shimmer-h 2.4s ease-in-out infinite;
  }
  .quick-waiting-strip .qws-skel-head {
    display: flex; gap: 8px; align-items: center; margin-bottom: 8px; position: relative;
  }
  .quick-waiting-strip .qws-q {
    background: #3B82F6; color: #fff; font-size: 11px; font-weight: 700;
    padding: 3px 10px; border-radius: 999px;
  }
  .quick-waiting-strip .qws-akey {
    font-size: 11px; color: #1E40AF; font-weight: 600;
  }
  .quick-waiting-strip .qws-skel-line {
    height: 9px; background: #EFF6FF; border-radius: 3px;
    margin-bottom: 6px; position: relative;
  }
  .quick-waiting-strip .qws-skel-line:last-child { margin-bottom: 0; }
  .quick-waiting-strip .qws-cta {
    margin-top: 14px; display: flex; gap: 10px; flex-wrap: wrap;
  }
  .quick-waiting-strip .qws-cta-btn {
    padding: 8px 16px; font-size: 13px;
    color: #1E40AF; border-color: #BFDBFE;
  }

  /* ===== TAB 3: ẢNH ĐÁP ÁN ===== */
  .img-tab {
    background: var(--white); border-radius: 16px; border: 1px solid var(--g200);
    padding: 28px; text-align: center;
  }
  .img-tab img { max-width: 100%; height: auto; border-radius: 10px; }
  .img-tab .cap { font-size: 12px; color: var(--g500); margin-top: 12px; }

  /* ===== PDF VIEWER CARD ===== */
  .pdf-card {
    background: var(--white); border-radius: 16px;
    border: 1px solid var(--g200); overflow: hidden;
  }
  .pdf-content {
    padding: 16px; display: flex; justify-content: center;
    background: #FAFAFA;
  }

  /* ===== PDF VIEWER (PDF.js render) ===== */
  .pdf-viewer { width: 100%; max-width: 900px; }
  .pdf-viewer__pages {
    display: flex; flex-direction: column; align-items: center;
    gap: 12px; max-height: min(80vh, 1000px);
    overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding: 8px; background: #f1f1f1; border-radius: 6px;
  }
  .pdf-page-canvas {
    display: block; width: 100%; height: auto;
    background: var(--white); box-shadow: 0 1px 8px rgba(0,0,0,0.08);
    border-radius: 2px;
  }
  .pdf-viewer__state {
    padding: 32px 20px; text-align: center;
    font-size: 14px; color: var(--g600);
  }
  .pdf-viewer__error { color: var(--red); }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    .container-md { padding: 16px; }
    .head-card { padding: 20px; }
    .head-card h1 { font-size: 22px; }
    .waiting-head { padding: 24px 20px 16px; grid-template-columns: 1fr; }
    .waiting-meta, .skel-answer-wrap, .waiting-cta { padding-left: 20px; padding-right: 20px; }
    .opts { grid-template-columns: 1fr; }
    .key-grid { grid-template-columns: repeat(2, 1fr); font-size: 18px; }
    .key-board { padding: 28px 24px; }
    .ans-key-card { padding: 18px 16px; }
    .qhead-bar, .qbody-wrap { padding-left: 16px; padding-right: 16px; }
    .expl-marker { margin-left: 16px; margin-right: 16px; }
    .expl-body { padding-left: 16px; padding-right: 16px; }
    .pdf-content { padding: 8px; }
    .pdf-viewer__pages { padding: 4px; gap: 8px; max-height: 75vh; }
  }
`;
