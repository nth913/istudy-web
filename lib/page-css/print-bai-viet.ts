/**
 * Print article scoped CSS.
 *
 * Ported from `/tmp/design-bundle/istudy-v2/project/bai-viet-chi-tiet-print.html`
 * inline <style> block. Renders a print-optimized version of an article at
 * `/print/bai-viet/[slug]` — no header, footer, EventPopup, sidebar widgets,
 * comments, or CTAs.
 *
 * Layout strategy:
 *  - Screen: single-column body (no left TOC, no right sidebar) so the
 *    print-preview matches paper output.
 *  - Print: A4 portrait, page breaks between major H2 sections, interactive
 *    chrome hidden.
 */
export const PRINT_BAI_VIET_CSS = String.raw`
  /* ---------- Hide root-layout chrome on print route ---------- */
  body { background: #F7F7F8; }
  .ev-pop, .ev-pop-launcher { display: none !important; }

  /* ---------- Banner ---------- */
  .article-banner {
    position: relative;
    width: 100%;
    height: 380px;
    background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 60%, #FDA4AF 100%);
  }
  .meta-wrap {
    max-width: 820px;
    margin: -300px auto 0;
    padding: 0 32px;
    position: relative;
    z-index: 3;
  }

  /* ---------- Layout (print: single column, no sidebars) ---------- */
  .article-layout {
    max-width: 820px;
    margin: 24px auto 0;
    padding: 0 32px;
    position: relative;
    z-index: 2;
  }

  /* ---------- Panel ---------- */
  .panel {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(15, 15, 15, 0.06), 0 1px 2px rgba(15,15,15,0.04);
    padding: 28px 32px;
    margin-bottom: 12px;
  }

  /* ---------- Meta card ---------- */
  .meta-card { padding: 28px 36px 24px; margin-bottom: 0; }
  .meta-card .crumbs {
    display: flex; gap: 6px; flex-wrap: wrap;
    font-size: 13px; color: var(--g500); margin-bottom: 14px;
  }
  .meta-card .crumbs a { color: var(--g500); }
  .meta-card .crumbs .sep { color: var(--g400); }
  .meta-card .crumbs .current { color: var(--red); font-weight: 600; }
  .meta-card h1 {
    font-size: 30px; font-weight: 800; color: var(--dark);
    line-height: 1.25; margin: 0 0 14px; letter-spacing: -0.4px;
  }
  .meta-card .lede {
    font-size: 15px; line-height: 1.65; color: var(--g600); margin: 0 0 22px;
  }
  .meta-row {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 18px; border-top: 1px solid var(--g100);
    gap: 16px; flex-wrap: wrap;
  }
  .author-block { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .author-block .ava {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--red), #ff6e7a);
    color: #fff; font-weight: 800; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .author-block .sep { color: var(--g300); margin: 0 4px; }
  .author-block .date { font-size: 13px; color: var(--g500); }
  .author-block .n { font-size: 14px; font-weight: 700; color: var(--dark); line-height: 1.3; }
  .read-stats {
    display: flex; gap: 14px; font-size: 12.5px; color: var(--g500);
    align-items: center; flex-wrap: wrap;
  }
  .meta-row-2 {
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap; margin-top: 4px;
  }

  /* ---------- Inner banner ---------- */
  .inner-banner {
    padding: 0;
    overflow: hidden;
    background: linear-gradient(135deg, #FFE3E6 0%, #FFF5F1 60%, #FFEFD5 100%);
    height: 260px;
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .inner-banner .blob {
    position: absolute; border-radius: 50%; opacity: 0.5; pointer-events: none;
  }
  .inner-banner .blob.b1 { width: 220px; height: 220px; background: #FFCFD5; top: -60px; left: -40px; }
  .inner-banner .blob.b2 { width: 160px; height: 160px; background: #FFD8B5; bottom: -40px; right: -20px; }
  .inner-banner .blob.b3 { width: 110px; height: 110px; background: #fff; opacity: 0.4; top: 30%; right: 18%; }
  .inner-banner .card-inside {
    position: relative; z-index: 1;
    background: var(--red); color: #fff;
    padding: 24px 42px; border-radius: 16px;
    text-align: center; box-shadow: 0 12px 32px rgba(232,25,44,0.25);
  }
  .inner-banner .card-inside .eyebrow {
    font-size: 11px; letter-spacing: 2px; font-weight: 600;
    opacity: 0.85; margin-bottom: 8px;
  }
  .inner-banner .card-inside h2 {
    font-size: 30px; font-weight: 700; margin: 0; letter-spacing: -0.3px;
  }
  .inner-banner .card-inside .tag {
    font-size: 12px; opacity: 0.9; margin-top: 6px;
  }

  /* ---------- Key takeaways ---------- */
  .takeaways {
    background: linear-gradient(180deg, #FFFBF0 0%, #FFF7E5 100%);
    border: 1px solid #FDE7B5; border-radius: 16px;
    padding: 24px 28px; margin-bottom: 20px;
  }
  .takeaways .head {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--red); color: #fff;
    padding: 7px 14px; border-radius: 8px;
    font-size: 12px; font-weight: 800; letter-spacing: 1px;
    margin-bottom: 16px;
  }
  .takeaways ol { list-style: none; padding: 0; margin: 0; counter-reset: t; }
  .takeaways li {
    counter-increment: t;
    display: flex; gap: 14px;
    padding: 10px 0;
    font-size: 14.5px; line-height: 1.65; color: var(--g700);
  }
  .takeaways li:not(:last-child) { border-bottom: 1px dashed #FDE7B5; }
  .takeaways li::before {
    content: counter(t);
    flex-shrink: 0;
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--red); color: #fff;
    font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    margin-top: 2px;
  }
  .takeaways li b { color: var(--dark); }

  /* ---------- Article body ---------- */
  .article-body { font-size: 16px; line-height: 1.8; color: var(--g700); }
  .article-body h2 {
    font-size: 24px; font-weight: 800; color: var(--dark);
    margin: 28px 0 14px; padding-left: 14px;
    border-left: 4px solid var(--red);
  }
  .article-body h2:first-child { margin-top: 0; }
  .article-body h3 { font-size: 18px; font-weight: 700; color: var(--dark); margin: 22px 0 10px; }
  .article-body p { margin: 0 0 14px; }
  .article-body strong { color: var(--dark); }
  .article-body ul, .article-body ol { margin: 0 0 16px; padding-left: 22px; }
  .article-body li { margin-bottom: 6px; }
  .article-body em { color: var(--g800); }

  .formula-box {
    background: var(--red-light);
    border-left: 4px solid var(--red);
    padding: 14px 20px; border-radius: 10px; margin: 14px 0;
  }
  .formula-box .lbl {
    font-size: 11px; font-weight: 800; color: var(--red);
    margin-bottom: 4px; letter-spacing: 1px;
  }
  .formula-box code {
    color: var(--dark); font-size: 16px; font-weight: 700;
    font-family: 'Courier New', monospace;
  }

  .example-table {
    width: 100%; border-collapse: collapse; margin: 16px 0;
    background: #fff; border: 1px solid var(--g200);
    border-radius: 12px; overflow: hidden;
  }
  .example-table th {
    background: var(--g100); padding: 11px 14px; text-align: left;
    font-size: 13px; font-weight: 700; color: var(--dark);
  }
  .example-table td { padding: 11px 14px; border-top: 1px solid var(--g200); font-size: 14px; }
  .example-table tr td:first-child { font-style: italic; color: var(--red); font-weight: 600; }

  .callout {
    background: #FEF9C3; border: 1px solid #FDE68A;
    border-radius: 12px; padding: 14px 18px; margin: 16px 0;
    display: flex; gap: 12px; align-items: flex-start;
  }
  .callout .ico { font-size: 22px; }
  .callout .b { font-size: 14px; line-height: 1.6; }
  .callout .b strong { color: var(--dark); display: block; margin-bottom: 4px; }

  .exercise-card {
    background: var(--g50); border: 2px dashed var(--g300);
    border-radius: 14px; padding: 22px; margin: 20px 0;
  }
  .exercise-card h4 {
    font-size: 15px; font-weight: 700; color: var(--dark); margin: 0 0 14px;
  }
  .exercise-card ol { padding-left: 22px; margin: 0; }
  .exercise-card li { margin-bottom: 10px; font-size: 14px; }
  .exercise-card .blank {
    display: inline-block; min-width: 90px;
    border-bottom: 2px solid var(--g400); margin: 0 4px;
  }

  .article-tags {
    margin-top: 28px; padding-top: 20px;
    border-top: 1px solid var(--g100);
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .article-tags span {
    background: var(--g100); padding: 5px 12px; border-radius: 8px;
    font-size: 12px; color: var(--g600);
  }

  /* ---------- Author bio ---------- */
  .author-bio {
    margin-top: 24px; padding: 18px;
    background: var(--g50); border: 1px solid var(--g200);
    border-radius: 14px;
    display: flex; gap: 16px; align-items: flex-start;
  }
  .author-bio .ava {
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--red); color: #fff;
    font-weight: 800; font-size: 18px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .author-bio .n { font-size: 15px; font-weight: 800; color: var(--dark); margin-bottom: 2px; }
  .author-bio .r { font-size: 12.5px; color: var(--g500); margin-bottom: 8px; }
  .author-bio .d { font-size: 13.5px; color: var(--g700); line-height: 1.55; margin: 0; }

  /* ---------- Print-specific (A4 portrait) ---------- */
  @media print {
    @page { size: A4 portrait; margin: 10mm; }
    html, body { background: #fff !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

    /* Hide chrome that doesn't make sense in print */
    .header, .footer,
    .mega-wrap,
    .ev-pop, .ev-pop-launcher,
    .article-banner,
    .sidebar-left, .sidebar-right,
    .comments-card,
    .inline-cta,
    .cta-card,
    .signup-card,
    .side-card,
    .like-btn,
    .share-block { display: none !important; }

    /* Neutralize hover / animation / transforms / shadows */
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      box-shadow: none !important;
    }

    .meta-wrap { margin-top: 0 !important; padding: 0 !important; max-width: 100% !important; }
    .article-layout { margin-top: 0 !important; padding: 0 !important; max-width: 100% !important; }
    .panel {
      box-shadow: none !important;
      border: 1px solid #e5e7eb !important;
      padding: 12px 16px !important;
      margin-bottom: 8px !important;
      break-inside: avoid;
    }
    .meta-card h1 { font-size: 20pt !important; }
    .meta-card .lede { font-size: 11pt !important; }

    .inner-banner { height: auto !important; padding: 12px !important; break-inside: avoid; }
    .inner-banner .blob { display: none !important; }
    .inner-banner .card-inside { padding: 12px 24px !important; }
    .inner-banner .card-inside h2 { font-size: 18pt !important; }

    .takeaways { break-inside: avoid; }
    .article-body h2 { break-after: avoid; }
    .article-body p, .article-body ul, .article-body ol,
    .formula-box, .example-table, .callout, .exercise-card { break-inside: avoid; }

    a { color: inherit !important; text-decoration: none !important; }

    .post-article {
      max-width: 100% !important;
      padding: 0 !important;
      display: block !important;
    }
  }
`;
