export const BAI_VIET_CHI_TIET_CSS = String.raw`
  body { background: #F7F7F8; }

  /* === BANNER === */
  .article-banner {
    position: relative;
    width: 100%;
    height: 380px;
    background: url('/banner.webp') center/cover no-repeat;
  }
  .meta-wrap {
    max-width: 820px;
    margin: -300px auto 0;
    padding: 0 32px;
    position: relative;
    z-index: 3;
  }

  /* === MAIN LAYOUT (sidebars fixed via position:sticky) === */
  .article-layout {
    max-width: 1320px;
    margin: 24px auto 0;
    padding: 0 32px 0;
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    gap: 24px;
    align-items: start;
    position: relative;
    z-index: 2;
  }

  /* === LEFT TOC === */
  .sidebar-left {
    position: sticky;
    top: 84px;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
    padding: 4px;
  }
  .sidebar-left::-webkit-scrollbar { width: 6px; }
  .sidebar-left::-webkit-scrollbar-thumb { background: var(--g200); }
  .toc-card {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 4px 16px rgba(15,15,15,0.05);
    padding: 18px 16px;
  }
  .toc-card h4 {
    font-size: 12px; font-weight: 800; color: var(--g500);
    text-transform: uppercase; letter-spacing: 1px;
    margin: 0 0 12px; padding: 0 8px;
  }
  .toc-list { display: flex; flex-direction: column; gap: 2px; }
  .toc-list a {
    display: block; padding: 8px 12px;
    font-size: 13.5px; color: var(--g600);
    text-decoration: none; border-radius: 8px;
    border-left: 3px solid transparent;
    line-height: 1.4; transition: all .15s;
  }
  .toc-list a:hover { color: var(--red); background: var(--red-light); }
  .toc-list a.active {
    color: var(--red); background: var(--red-light);
    border-left-color: var(--red); font-weight: 700;
  }
  .toc-list .lvl-2 { padding-left: 26px; font-size: 12.5px; color: var(--g500); }
  .toc-list .lvl-3 { padding-left: 40px; font-size: 12px; color: var(--g400); }

  /* === MAIN COLUMN CARDS === */
  .panel {
    background: var(--white);
    border-radius: 16px;
    box-shadow: 0 6px 24px rgba(15, 15, 15, 0.06), 0 1px 2px rgba(15,15,15,0.04);
    padding: 28px 32px;
    margin-bottom: 12px;
  }

  /* Header / meta popup that overlaps banner */
  .meta-card { padding: 28px 36px 24px; margin-bottom: 0; }
  .meta-card .crumbs {
    display: flex; gap: 6px; flex-wrap: wrap;
    font-size: 13px; color: var(--g500); margin-bottom: 14px;
  }
  .meta-card .crumbs a { color: var(--g500); }
  .meta-card .crumbs a:hover { color: var(--red); }
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
  .read-stats span { display: inline-flex; align-items: center; gap: 4px; }
  .meta-row-2 {
    display: flex; justify-content: space-between; align-items: center;
    gap: 16px; flex-wrap: wrap; margin-top: 4px;
  }

  /* Like button */
  .like-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; border-radius: 999px;
    background: var(--red-light); color: var(--red);
    border: 1px solid #FECACA;
    font-size: 13px; font-weight: 700; cursor: pointer;
    transition: all .15s; margin-right: 8px;
  }
  .like-btn:hover { background: #FECACA; }
  .like-btn.liked { background: var(--red); color: #fff; border-color: var(--red); }
  .like-btn .heart { font-size: 14px; transition: transform .2s; }
  .like-btn.liked .heart { animation: pop .35s; }
  @keyframes pop { 0% { transform: scale(1);} 40% { transform: scale(1.4);} 100% { transform: scale(1);} }

  .share-block { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .share-block .lbl { font-size: 12px; color: var(--g500); margin-right: 4px; }
  .share-btn {
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--g100); color: var(--g600);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 14px; cursor: pointer; transition: all .15s;
  }
  .share-btn:hover { background: var(--red-light); color: var(--red); }

  /* === INNER ARTICLE BANNER === */
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
  .inner-banner .blob.b3 { width: 110px; height: 110px; background: var(--white); opacity: 0.4; top: 30%; right: 18%; }
  .inner-banner .card-inside {
    position: relative; z-index: 1;
    background: var(--red); color: #fff;
    padding: 24px 42px; border-radius: 16px;
    text-align: center; box-shadow: 0 12px 32px rgba(232,25,44,0.25);
  }
  .inner-banner .card-inside .eyebrow { font-size: 11px; letter-spacing: 2px; font-weight: 600; opacity: 0.85; margin-bottom: 8px; }
  .inner-banner .card-inside h2 {
    font-family: var(--font-display);
    font-size: 30px; font-weight: 700; margin: 0;
    letter-spacing: -0.3px;
  }
  .inner-banner .card-inside .tag {
    font-size: 12px; opacity: 0.9; margin-top: 6px;
  }

  /* === KEY TAKEAWAYS === */
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

  /* === ARTICLE BODY === */
  .article-body { font-size: 16px; line-height: 1.8; color: var(--g700); }
  .article-body h2 {
    font-size: 24px; font-weight: 800; color: var(--dark);
    margin: 28px 0 14px; padding-left: 14px;
    border-left: 4px solid var(--red);
    scroll-margin-top: 90px;
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
  .formula-box .lbl { font-size: 11px; font-weight: 800; color: var(--red); margin-bottom: 4px; letter-spacing: 1px; }
  .formula-box code { color: var(--dark); font-size: 16px; font-weight: 700; font-family: 'Courier New', monospace; }

  .example-table { width: 100%; border-collapse: collapse; margin: 16px 0; background: var(--white); border: 1px solid var(--g200); border-radius: 12px; overflow: hidden; }
  .example-table th { background: var(--g100); padding: 11px 14px; text-align: left; font-size: 13px; font-weight: 700; color: var(--dark); }
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

  .exercise-card { background: var(--g50); border: 2px dashed var(--g300); border-radius: 14px; padding: 22px; margin: 20px 0; }
  .exercise-card h4 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 0 0 14px; }
  .exercise-card ol { padding-left: 22px; margin: 0; }
  .exercise-card li { margin-bottom: 10px; font-size: 14px; }
  .exercise-card .blank { display: inline-block; min-width: 90px; border-bottom: 2px solid var(--g400); margin: 0 4px; }

  .article-tags {
    margin-top: 28px; padding-top: 20px;
    border-top: 1px solid var(--g100);
    display: flex; gap: 8px; flex-wrap: wrap;
  }
  .article-tags span { background: var(--g100); padding: 5px 12px; border-radius: 8px; font-size: 12px; color: var(--g600); }

  /* === POST-ARTICLE (released from sticky grid) === */
  .post-article {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 32px 60px;
    display: grid;
    grid-template-columns: 280px 1fr 280px;
    gap: 28px;
  }
  .post-article > * { grid-column: 2 / 3; margin-bottom: 12px; }
  @media (max-width: 1180px) {
    .post-article { grid-template-columns: 1fr 280px; }
    .post-article > * { grid-column: 1 / 2; }
  }
  @media (max-width: 1000px) {
    .post-article { grid-template-columns: 1fr; padding: 0 16px 40px; }
    .post-article > * { grid-column: 1 / -1; }
  }

  /* === SIDEBAR (sticky) === */
  .sidebar-right {
    position: sticky;
    top: 84px;
    display: flex; flex-direction: column; gap: 18px;
    padding-right: 4px;
  }
  .sidebar-right::-webkit-scrollbar { width: 6px; }
  .sidebar-right::-webkit-scrollbar-thumb { background: var(--g200); }

  .side-card {
    background: var(--white); border-radius: 14px;
    box-shadow: 0 4px 16px rgba(15,15,15,0.05);
    padding: 20px;
  }
  .side-card .head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 14px;
  }
  .side-card .head h4 {
    font-size: 13px; font-weight: 800; color: var(--dark);
    text-transform: uppercase; letter-spacing: 0.8px; margin: 0;
  }
  .side-card .head a { font-size: 12px; color: var(--red); font-weight: 600; }

  .related-list { display: flex; flex-direction: column; gap: 14px; }
  .related-item {
    display: flex; gap: 12px; align-items: flex-start;
    cursor: pointer;
  }
  .related-item .thumb {
    width: 72px; height: 56px; border-radius: 8px; flex-shrink: 0;
    background: linear-gradient(135deg, var(--red-light), #FFE8B5);
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    overflow: hidden;
  }
  .related-item .thumb.t2 { background: linear-gradient(135deg, #DBEAFE, #E0F2FE); }
  .related-item .thumb.t3 { background: linear-gradient(135deg, #FEF3C7, #FFE4E6); }
  .related-item .thumb.t4 { background: linear-gradient(135deg, #DCFCE7, #E0F2FE); }
  .related-item .thumb.t5 { background: linear-gradient(135deg, #F3E8FF, #FCE7F3); }
  .related-item .title {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--dark);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .related-item:hover .title { color: var(--red); }

  /* Luyện đề CTA — matches reference image */
  .cta-card {
    background: linear-gradient(135deg, #E8192C 0%, #D01425 55%, #B81020 100%);
    color: #fff;
    border-radius: 18px;
    padding: 28px 24px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(232,25,44,0.20);
  }
  .cta-card::before, .cta-card::after {
    content: ''; position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.10);
  }
  .cta-card::before { width: 140px; height: 140px; top: -50px; right: -50px; }
  .cta-card::after { width: 110px; height: 110px; bottom: -50px; left: -40px; }
  .cta-card .icon-rocket {
    font-size: 36px; margin-bottom: 12px;
    position: relative; z-index: 1;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.18));
  }
  .cta-card h4 {
    position: relative; z-index: 1;
    font-family: var(--font-display);
    font-size: 24px; font-weight: 700; margin: 0 0 10px;
  }
  .cta-card p {
    position: relative; z-index: 1;
    font-size: 13.5px; line-height: 1.55; margin: 0 0 20px;
    opacity: 0.95;
  }
  .cta-card .btn-go {
    position: relative; z-index: 1;
    display: block;
    background: var(--white); color: var(--red);
    padding: 14px; border-radius: 999px;
    font-weight: 700; font-size: 15px;
    text-decoration: none;
    transition: transform .15s, box-shadow .15s;
    box-shadow: 0 4px 14px rgba(0,0,0,0.12);
  }
  .cta-card .btn-go:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.18); }

  /* In-line CTA after exercises */
  .inline-cta {
    margin: 28px 0 8px;
    background: linear-gradient(120deg, #FFF0F1 0%, #FFFFFF 70%);
    border: 1px solid #FECACA;
    border-radius: 16px;
    padding: 22px 24px;
    display: flex; align-items: center; gap: 20px;
    flex-wrap: wrap;
  }
  .inline-cta .ico {
    font-size: 38px; line-height: 1;
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--white); box-shadow: 0 4px 14px rgba(232,25,44,0.18);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .inline-cta .copy { flex: 1; min-width: 200px; }
  .inline-cta .copy h4 { margin: 0 0 4px; font-size: 17px; font-weight: 800; color: var(--dark); }
  .inline-cta .copy p { margin: 0; font-size: 13.5px; color: var(--g600); }
  .inline-cta .go-btn {
    background: var(--red); color: #fff;
    padding: 12px 22px; border-radius: 999px;
    font-size: 14px; font-weight: 700;
    text-decoration: none; white-space: nowrap;
    transition: background .15s, transform .15s;
  }
  .inline-cta .go-btn:hover { background: var(--red-hover); transform: translateY(-1px); }

  /* Author bio card */
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

  /* Comments block */
  .comments-card { margin-top: 12px; }
  .comments-card .head {
    display: flex; align-items: center; gap: 8px;
    font-size: 18px; font-weight: 800; color: var(--dark);
    margin-bottom: 18px;
  }
  .comments-card .head .ico { font-size: 22px; }
  .comment-form {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px 10px 16px;
    background: var(--g50); border: 1px solid var(--g200);
    border-radius: 14px; margin-bottom: 20px;
  }
  .comment-form .ava {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--g200); flex-shrink: 0;
  }
  .comment-form input {
    flex: 1; border: none; background: transparent;
    font-size: 14px; outline: none; padding: 8px 0;
  }
  .comment-form button {
    background: var(--red); color: #fff;
    padding: 10px 22px; border-radius: 10px;
    font-size: 14px; font-weight: 700; cursor: pointer;
  }
  .comment-form button:hover { background: var(--red-hover); }
  .comment-list { display: flex; flex-direction: column; gap: 18px; }
  .comment {
    display: flex; gap: 12px; align-items: flex-start;
  }
  .comment .ava {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    color: #fff; font-weight: 700; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
  }
  .c-body { flex: 1; }
  .c-meta {
    display: flex; gap: 10px; align-items: baseline;
    font-size: 13px; margin-bottom: 4px;
  }
  .c-meta .name { font-weight: 700; color: var(--dark); }
  .c-meta .time { color: var(--g400); font-size: 12px; }
  .c-text { font-size: 14px; color: var(--g700); line-height: 1.6; margin: 0 0 6px; }
  .c-actions { display: flex; gap: 14px; font-size: 12px; color: var(--g500); }
  .c-actions span { cursor: pointer; }
  .c-actions span:hover { color: var(--red); }

  /* Email signup */
  .signup-card { padding: 22px 20px; }
  .signup-card h4 {
    font-size: 15px; font-weight: 800; color: var(--dark);
    margin: 0 0 6px;
    display: flex; align-items: center; gap: 6px;
  }
  .signup-card .desc {
    font-size: 12.5px; color: var(--g500);
    margin: 0 0 14px; line-height: 1.5;
  }
  .signup-card input {
    width: 100%; padding: 11px 14px;
    border: 1px solid var(--g200); border-radius: 10px;
    font-size: 14px; outline: none;
    transition: border-color .15s;
    margin-bottom: 10px;
  }
  .signup-card input:focus { border-color: var(--red); }
  .signup-card button {
    width: 100%; padding: 11px;
    background: var(--dark); color: #fff;
    border-radius: 10px; font-size: 14px; font-weight: 700;
    cursor: pointer; transition: background .15s;
  }
  .signup-card button:hover { background: #000; }

  @media (max-width: 1180px) {
    .article-layout { grid-template-columns: 1fr 280px; }
    .sidebar-left { display: none; }
  }
  @media (max-width: 1000px) {
    .article-layout { grid-template-columns: 1fr; margin-top: -120px; }
    .sidebar-right { position: static; max-height: none; overflow: visible; }
    .article-banner { height: 240px; }
    .meta-card h1 { font-size: 24px; }
  }
  @media (max-width: 700px) {
    .article-layout { padding: 0 16px 40px; margin-top: -80px; }
    .panel { padding: 20px; border-radius: 14px; }
    .article-banner { height: 180px; }
    .inner-banner { height: 200px; }
    .inner-banner .card-inside { padding: 18px 28px; }
    .inner-banner .card-inside h2 { font-size: 22px; }
  }

  /* ---------- Print (Cmd/Ctrl+P from regular article page) ---------- */
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
    .share-block,
    .toc-card { display: none !important; }

    /* Neutralize hover / animation / transforms / shadows */
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Force single-column layout (sticky sidebars hidden) */
    .meta-wrap { margin-top: 0 !important; padding: 0 !important; max-width: 100% !important; }
    .article-layout {
      grid-template-columns: 1fr !important;
      margin-top: 0 !important;
      padding: 0 !important;
      max-width: 100% !important;
      display: block !important;
    }
    .post-article {
      grid-template-columns: 1fr !important;
      max-width: 100% !important;
      padding: 0 !important;
      display: block !important;
    }
    .post-article > * { grid-column: 1 / -1 !important; }

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
  }
`;
