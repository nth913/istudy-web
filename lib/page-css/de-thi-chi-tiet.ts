export const DE_THI_CHI_TIET_CSS = String.raw`
  /* ============================================
     istudy — Đề thi chi tiết (lifecycle: waiting / ready-1 / ready-multi)
     Ported từ de-dap-an.css + de-dap-an-waiting.css
     ============================================ */

  /* ===== PAGE SCAFFOLD ===== */
  .page-wrap { background: var(--g50); min-height: 100vh; padding-bottom: 60px; }
  .container-md { max-width: 1100px; margin: 0 auto; padding: 24px 40px; }

  /* ===== HEAD CARD ===== */
  .head-card {
    background: #fff; border-radius: 22px; padding: 28px 32px;
    border: 1px solid var(--g200); margin-bottom: 16px;
  }
  .head-meta { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
  .head-card h1 { font-size: 26px; font-weight: 800; color: var(--dark); margin: 0 0 8px; line-height: 1.35; letter-spacing: -0.3px; }
  .head-card .desc { font-size: 14px; color: var(--g600); margin: 0 0 18px; line-height: 1.6; max-width: 720px; }

  .info-row { display: flex; gap: 18px; padding: 12px 0; border-top: 1px solid var(--g100); border-bottom: 1px solid var(--g100); margin-bottom: 16px; font-size: 13px; color: var(--g600); flex-wrap: wrap; }
  .info-row span { display: inline-flex; align-items: center; gap: 6px; }
  .info-row b { color: var(--dark); font-weight: 600; }

  .head-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .head-actions .btn { padding: 10px 18px; font-size: 14px; border-radius: 10px; }
  .head-actions .btn .icon { width: 15px; height: 15px; }

  /* Cross-link button with status chip */
  .btn-xlink { position: relative; }
  .btn-xlink .xlink-chip {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 11px; font-weight: 600;
    background: rgba(255,255,255,0.85); color: var(--g600);
    padding: 2px 7px; border-radius: 999px;
    margin-left: 4px; border: 1px solid rgba(0,0,0,0.06);
  }
  .btn-xlink.is-pending {
    background: var(--g100); color: var(--g500); border-color: var(--g200);
    cursor: not-allowed;
  }
  .btn-xlink.is-pending:hover { background: var(--g100); border-color: var(--g200); }

  /* ===== STATUS STRIP ===== */
  .status-strip {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    background: #fff; border-radius: 14px; padding: 14px 18px;
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
  .status-strip .ss-grow { flex: 1; min-width: 100px; }
  .status-strip .ss-action { font-weight: 600; cursor: pointer; }
  .status-strip .ss-action:hover { text-decoration: underline; }

  @keyframes ssPulse {
    0%   { box-shadow: 0 0 0 0 rgba(217,119,6,0.45); }
    70%  { box-shadow: 0 0 0 10px rgba(217,119,6,0); }
    100% { box-shadow: 0 0 0 0 rgba(217,119,6,0); }
  }

  /* ===== TAB STRIP (cho nhiều mã đề) ===== */
  .tabs-bar {
    background: #fff; border: 1px solid var(--g200); border-radius: 16px;
    padding: 3px; margin-bottom: 14px;
  }
  .tabs-head {
    display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;
    font-size: 12.5px; color: var(--g600);
  }
  .tabs-head .tabs-jump { position: relative; }
  .tabs-head .tabs-jump-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 12px; border-radius: 8px;
    background: var(--g100); color: var(--g700);
    font-size: 12.5px; font-weight: 600; border: 1px solid var(--g200);
    cursor: pointer;
  }
  .tabs-head .tabs-jump-btn:hover { background: var(--g200); }

  .tabs-scroll {
    display: flex; align-items: flex-start; gap: 4px; position: relative;
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
  }
  .tabs-scroll-track::-webkit-scrollbar { height: 6px; }
  .tabs-scroll-track::-webkit-scrollbar-track {
    background: var(--g100); border-radius: 999px;
    margin: 0 30%;
  }
  .tabs-scroll-track::-webkit-scrollbar-thumb {
    background: var(--g300); border-radius: 999px;
  }
  .tabs-scroll-list {
    display: flex; gap: 4px; padding: 0 8px;
  }
  .tab-pill {
    flex-shrink: 0; display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 14px; border-radius: 9px;
    font-size: 13px; font-weight: 600;
    background: var(--g100); color: var(--g600);
    border: 1px solid transparent; cursor: pointer;
    font-variant-numeric: tabular-nums; transition: all .12s;
    white-space: nowrap; min-height: 36px;
    text-decoration: none;
  }
  .tab-pill:hover { background: var(--g200); color: var(--dark); }
  .tab-pill .tp-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--g400); flex-shrink: 0;
  }
  .tab-pill.is-ready .tp-dot { background: var(--green); }
  .tab-pill.is-pending .tp-dot { background: #D97706; animation: ssPulse 1.4s ease-out infinite; }
  .tab-pill.is-ready { color: var(--g700); }
  .tab-pill.is-pending { color: var(--g500); background: transparent; border-color: var(--g200); }
  .tab-pill.is-pending:hover { background: var(--g100); }
  .tab-pill.is-active { background: var(--red); color: #fff; border-color: var(--red); }
  .tab-pill.is-active .tp-dot { background: #fff; animation: none; }
  .tab-pill.is-active.is-pending { background: #D97706; border-color: #D97706; color: #fff; }
  .tab-pill .tp-new {
    font-size: 9px; font-weight: 800; letter-spacing: 0.5px;
    background: var(--red); color: #fff; padding: 1px 5px;
    border-radius: 4px; line-height: 12px; text-transform: uppercase;
  }
  .tab-pill.is-active .tp-new { background: #fff; color: var(--red); }

  /* ===== WAITING CARD ===== */
  .waiting-card {
    background: #fff; border-radius: 18px;
    border: 1px solid var(--g200); overflow: hidden;
    position: relative;
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
  .waiting-card.is-de .waiting-icon-wrap {
    background: linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%);
    color: var(--red);
  }
  .waiting-icon-wrap svg { width: 36px; height: 36px; stroke-width: 1.8; }
  .waiting-icon-wrap::after {
    content: ""; position: absolute; inset: -4px; border-radius: 22px;
    border: 2px solid currentColor; opacity: 0.18;
    animation: wPing 2s ease-out infinite;
  }
  @keyframes wPing {
    0%   { transform: scale(0.92); opacity: 0.4; }
    100% { transform: scale(1.18); opacity: 0;   }
  }

  .waiting-text h2 {
    font-size: 22px; font-weight: 800; color: var(--dark);
    margin: 0 0 6px; line-height: 1.3;
  }
  .waiting-text p {
    font-size: 14px; color: var(--g600); margin: 0; line-height: 1.6;
    max-width: 580px;
  }

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

  /* ===== SKELETON (paper sheet) ===== */
  .skel-paper-wrap {
    padding: 28px 40px 32px;
    display: flex; justify-content: center;
    position: relative;
  }
  .skel-paper {
    width: 100%; max-width: 640px;
    background: #fff;
    border: 1px solid var(--g200);
    border-radius: 6px;
    padding: 44px 50px;
    box-shadow: 0 1px 12px rgba(0,0,0,0.04);
    position: relative;
    overflow: hidden;
  }
  .skel-paper::after {
    content: ""; position: absolute; left: 0; right: 0; top: 0;
    height: 70px;
    background: linear-gradient(180deg,
      rgba(232,25,44,0) 0%,
      rgba(232,25,44,0.06) 50%,
      rgba(232,25,44,0) 100%);
    animation: scan 3.4s ease-in-out infinite;
  }
  @keyframes scan {
    0%   { transform: translateY(-100px); }
    100% { transform: translateY(680px); }
  }
  .skel-paper .skel-title-bk {
    text-align: center; padding-bottom: 16px;
    border-bottom: 1px dashed var(--g200);
    margin-bottom: 20px;
  }
  .skel-paper .skel-title-bk .sk-l {
    height: 12px; background: linear-gradient(90deg, var(--g200), var(--g100), var(--g200));
    background-size: 200% 100%; border-radius: 3px;
    animation: shimmer 1.6s linear infinite;
  }
  .skel-paper .skel-title-bk .sk-l.w1 { width: 60%; margin: 0 auto 8px; }
  .skel-paper .skel-title-bk .sk-l.w2 { width: 35%; margin: 0 auto; height: 14px; }
  .skel-paper .skel-section { margin: 16px 0 8px; }
  .skel-paper .skel-section .sk-h {
    height: 11px; width: 45%; background: linear-gradient(90deg, #FDE4E7, #FFF, #FDE4E7);
    background-size: 200% 100%; border-radius: 3px;
    animation: shimmer 1.6s linear infinite;
    margin-bottom: 14px;
  }
  .skel-paper .skel-q { margin-bottom: 10px; }
  .skel-paper .skel-q .sk-q-num {
    display: inline-block; width: 18px; height: 9px;
    background: var(--g200); border-radius: 2px; vertical-align: middle;
    margin-right: 8px;
  }
  .skel-paper .skel-q .sk-q-line {
    display: inline-block; height: 9px; background: var(--g100);
    border-radius: 2px; vertical-align: middle;
  }
  .skel-paper .skel-options {
    margin: 6px 0 14px 26px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px 14px;
  }
  .skel-paper .skel-options .sk-o {
    display: flex; align-items: center; gap: 6px;
    font-size: 10px; color: var(--g300);
  }
  .skel-paper .skel-options .sk-o b {
    font-weight: 700; color: var(--g300); width: 12px; flex-shrink: 0;
  }
  .skel-paper .skel-options .sk-o .sk-o-line {
    flex: 1; height: 7px; background: var(--g100); border-radius: 2px;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .expected-list {
    margin: 4px 0 0;
    padding: 16px 40px 28px;
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;
  }
  .expected-list .ex-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px; background: var(--g50);
    border: 1px solid var(--g200); border-radius: 10px;
    font-size: 13px; color: var(--g700);
  }
  .expected-list .ex-item .ex-num {
    width: 24px; height: 24px; border-radius: 6px;
    background: #fff; border: 1px solid var(--g200);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--g500);
    flex-shrink: 0;
  }
  .expected-list .ex-item .ex-meta {
    margin-left: auto; font-size: 11.5px; color: var(--g400); font-weight: 500;
  }

  /* ===== WAITING CTA ===== */
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
    background: #fff;
  }
  .waiting-cta .notify-form input:focus { border-color: var(--red); }

  /* ===== PDF CARD (ready state) ===== */
  .pdf-card {
    background: #fff; border-radius: 16px;
    border: 1px solid var(--g200); overflow: hidden;
  }
  .pdf-toolbar {
    background: var(--g100); padding: 10px 20px;
    border-bottom: 1px solid var(--g200);
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; flex-wrap: wrap;
  }
  .pdf-toolbar .pdf-name {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 600; color: var(--g700);
    min-width: 0;
  }
  .pdf-toolbar .pdf-name .pdf-name-text {
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 380px;
  }
  .pdf-toolbar .pdf-tools {
    display: flex; gap: 4px; align-items: center;
  }
  .pdf-tools .pdf-tool {
    padding: 5px 10px; border-radius: 7px; background: transparent;
    font-size: 12px; font-weight: 600; color: var(--g600); cursor: pointer;
    display: inline-flex; align-items: center; gap: 4px;
    border: none;
  }
  .pdf-tools .pdf-tool:hover { background: #fff; color: var(--dark); }
  .pdf-tools .pdf-tool .icon { width: 13px; height: 13px; }

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
    background: #fff; box-shadow: 0 1px 8px rgba(0,0,0,0.08);
    border-radius: 2px;
  }
  .pdf-viewer__state {
    padding: 32px 20px; text-align: center;
    font-size: 14px; color: var(--g600);
  }
  .pdf-viewer__error { color: var(--red); }

  .pdf-page-mini {
    width: 100%; max-width: 700px; background: #fff;
    box-shadow: 0 1px 14px rgba(0,0,0,0.05);
    border-radius: 4px; padding: 44px 52px;
    border: 1px solid #eee;
    font-size: 13px; color: var(--g700); line-height: 1.9;
  }
  .pdf-page-mini .title-block { text-align: center; margin-bottom: 24px; }
  .pdf-page-mini .t1 { font-size: 13px; font-weight: 800; color: var(--dark); letter-spacing: 0.5px; }
  .pdf-page-mini .t2 { font-size: 14px; font-weight: 800; color: var(--red); margin-top: 4px; }
  .pdf-page-mini .t3 { font-size: 12px; color: var(--g600); margin-top: 4px; }
  .pdf-page-mini .ma-stamp {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 700; padding: 3px 10px;
    border-radius: 999px; margin-top: 8px;
    background: var(--red-bg, var(--red-light)); color: var(--red); border: 1px solid #FECACA;
  }
  .pdf-page-mini h4 { font-weight: 700; color: var(--dark); margin: 22px 0 8px; font-size: 13px; font-style: italic; }
  .pdf-page-mini .q { margin-top: 8px; margin-bottom: 4px; }
  .pdf-page-mini .o { padding-left: 20px; color: var(--g600); }
  .pdf-page-mini .passage {
    background: var(--g50); border-radius: 8px;
    padding: 14px 18px; margin: 8px 0 12px;
    border: 1px solid var(--g200); font-size: 13px; line-height: 1.9;
  }
  .pdf-page-mini .pdf-end {
    text-align: center; font-size: 13px; font-weight: 700;
    color: var(--g400); margin-top: 28px; padding-top: 16px;
    border-top: 2px solid var(--g200);
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 900px) {
    .container-md { padding: 16px; }
    .head-card { padding: 20px; }
    .waiting-head { padding: 24px 20px 16px; grid-template-columns: 1fr; }
    .waiting-meta, .skel-paper-wrap, .waiting-cta, .expected-list { padding-left: 20px; padding-right: 20px; }
    .skel-paper { padding: 24px 22px; }
    .pdf-content { padding: 8px; }
    .pdf-viewer__pages { padding: 4px; gap: 8px; max-height: 75vh; }
    .pdf-page-mini { padding: 24px 20px; }
    .expected-list { grid-template-columns: 1fr; }
  }
`;
