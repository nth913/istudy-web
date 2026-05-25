/**
 * Print homepage scoped CSS.
 *
 * Ported from `/tmp/design-bundle/istudy-v2/project/index-print.html`
 * inline <style> block. Renders a print-optimized version of the home page
 * at `/print` — no header, footer, mega menu, EventPopup, or CTA section.
 *
 * Includes both:
 *  - on-screen "print preview" appearance (so the page is readable in browser)
 *  - `@media print` rules tuned for A4 portrait paper.
 *
 * EventPopup (rendered by root layout) is hidden via `.ev-pop` /
 * `.ev-pop-launcher` rules below.
 */
export const PRINT_INDEX_CSS = String.raw`
  /* ---------- Hide root-layout chrome on print route ---------- */
  .ev-pop, .ev-pop-launcher { display: none !important; }

  /* ---------- Hero ---------- */
  .hero {
    background: linear-gradient(160deg, #fff 0%, var(--red-light) 60%, #FFF5F5 100%);
    padding: 64px 40px 56px;
    position: relative;
    overflow: hidden;
  }
  .hero-circle {
    position: absolute; top: -120px; right: -120px;
    width: 500px; height: 500px; border-radius: 50%;
    background: rgba(232,25,44,0.04);
  }
  .hero-inner { max-width: 1200px; margin: 0 auto; position: relative; }
  .hero-grid {
    display: grid; grid-template-columns: 1fr 360px;
    gap: 48px; align-items: center;
  }
  .hero-content { max-width: 680px; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px; padding: 6px 18px;
    border-radius: 24px; font-size: 13px; font-weight: 600;
    background: var(--red-light); color: var(--red); margin-bottom: 28px;
    border: 1px solid rgba(232,25,44,0.15);
  }
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
    display: flex; align-items: center; background: var(--white);
    border-radius: 14px; padding: 5px 5px 5px 20px;
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
    display: block;
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

  /* ---------- Hero countdown card ---------- */
  .hero-countdown { max-width: 360px; }
  .countdown-card {
    position: relative; overflow: hidden;
    background: var(--white); color: var(--dark);
    border-radius: 20px; padding: 22px 22px 20px;
    display: flex; flex-direction: column; gap: 12px;
    box-shadow:
      0 24px 50px -16px rgba(232,25,44,0.18),
      0 2px 8px rgba(17,17,17,0.04);
    border: 1px solid rgba(232,25,44,0.12);
  }
  .cd-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 700; letter-spacing: 1px;
    color: var(--red); text-transform: uppercase;
    position: relative; z-index: 1;
  }
  .cd-pulse {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--red);
  }
  .cd-headline {
    font-size: 17px; font-weight: 700; line-height: 1.35; margin: 0;
    letter-spacing: -0.3px; position: relative; z-index: 1;
    color: var(--dark);
  }
  .cd-headline span {
    color: var(--red); font-size: 14px; font-weight: 600;
    display: inline-block; margin-top: 2px;
  }
  .cd-clock {
    display: flex; align-items: flex-end; gap: 4px;
    background: linear-gradient(135deg, #FFF5F6 0%, var(--red-light) 100%);
    border: 1px solid rgba(232,25,44,0.18);
    border-radius: 14px; padding: 14px 10px;
    position: relative; z-index: 1;
  }
  .cd-unit { flex: 1; display: flex; flex-direction: column; align-items: center; }
  .cd-num {
    font-family: 'Lexend','Be Vietnam Pro',monospace;
    font-weight: 800; font-size: 30px; line-height: 1;
    color: var(--red); letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
  }
  .cd-lbl {
    font-size: 10px; font-weight: 600; letter-spacing: 1px;
    color: var(--g500); margin-top: 6px; text-transform: uppercase;
  }
  .cd-sep {
    font-size: 22px; font-weight: 700; color: rgba(232,25,44,0.35);
    transform: translateY(-12px);
  }
  .cd-quote {
    position: relative; z-index: 1;
    background: var(--red-light); border-left: 3px solid var(--red);
    padding: 12px 14px; border-radius: 0 10px 10px 0;
  }
  .cd-quote-mark { width: 16px; height: 16px; color: var(--red); opacity: .8; }
  .cd-quote p {
    font-size: 13px; line-height: 1.6; color: var(--g700);
    margin: 4px 0 0;
  }
  .cd-quote p strong { color: var(--red); font-weight: 700; }
  .cd-quote-by {
    font-size: 11px; color: var(--g500); margin-top: 6px;
    font-style: italic;
  }
  .cd-cta { align-self: flex-start; position: relative; z-index: 1; margin-top: 2px; }

  /* ---------- Section + popular + post ---------- */
  .popular-card {
    background: var(--white); border-radius: 16px; overflow: hidden;
    border: 1px solid var(--g200); display: block;
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
  .popular-body .meta {
    display: flex; gap: 16px; font-size: 13px; color: var(--g500);
  }

  .post-card {
    padding: 20px; border-radius: 16px;
    border: 1px solid var(--g200); display: block;
    background: var(--white);
  }
  .post-card .cat {
    font-size: 11px; font-weight: 600; color: var(--red);
    background: var(--red-light); padding: 3px 10px; border-radius: 6px;
  }
  .post-card h3 {
    font-size: 14px; font-weight: 600; color: var(--dark);
    line-height: 1.6; margin: 12px 0; min-height: 44px;
  }
  .post-card .meta {
    display: flex; gap: 16px; font-size: 12px; color: var(--g500);
  }

  .tab-pills { display: flex; gap: 8px; }
  .tab-pill {
    padding: 8px 16px; border-radius: 8px; border: none;
    font-size: 13px; font-weight: 500;
    background: var(--white); color: var(--g600);
  }
  .tab-pill.active { background: var(--red); color: var(--white); }

  section.gray-section { background: var(--g50); padding: 52px 40px; }
  section.section { max-width: 1280px; margin: 0 auto; padding: 52px 40px; }

  /* ---------- Print-specific (A4 portrait) ---------- */
  @media print {
    @page { size: A4 portrait; margin: 10mm; }
    html, body { background: #fff !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

    /* Hide chrome that doesn't make sense in print */
    .header, .footer,
    .mega-wrap,
    .ev-pop, .ev-pop-launcher,
    .cta { display: none !important; }

    /* Neutralize hover / animation / transforms / shadows */
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Sections: full width, no fancy backgrounds */
    .hero { padding: 16mm 8mm 10mm; background: #fff !important; overflow: visible; }
    .hero-circle { display: none !important; }
    .hero-inner { max-width: 100% !important; }
    .hero-grid {
      grid-template-columns: 1.2fr 1fr !important;
      gap: 12mm !important; align-items: start !important;
    }
    .hero h1 { font-size: 34pt !important; line-height: 1.1 !important; }
    .hero p { font-size: 11pt !important; max-width: 100% !important; margin-bottom: 14px !important; }
    .search-bar { border: 1px solid #ccc !important; }

    .countdown-card { border: 1px solid #e5c8cb !important; padding: 14px !important; }
    .cd-clock { padding: 10px !important; }
    .cd-num { font-size: 22pt !important; }

    section.stats-bar { padding: 0 !important; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; }
    .stats-grid { max-width: 100% !important; }

    section.section, section.gray-section {
      max-width: 100% !important;
      padding: 10mm 8mm !important;
      background: #fff !important;
      break-inside: avoid;
    }
    section.gray-section > div { max-width: 100% !important; }

    /* Page breaks between major sections */
    section.section,
    section.gray-section { break-before: page; }
    section.hero,
    section.stats-bar { break-before: auto; }

    .grid-4 { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
    .grid-3 { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; }

    .exam-card, .popular-card, .post-card {
      break-inside: avoid;
      border: 1px solid #d1d5db !important;
    }
    .popular-cover { height: 90px !important; }

    a { color: inherit !important; text-decoration: none !important; }
  }
`;
