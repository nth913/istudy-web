export const ON_THI_DAI_HOC_CSS = `
  body { background: #F7F7F8; }

  /* === BANNER === */
  .article-banner {
    position: relative;
    width: 100%;
    height: 380px;
    background: linear-gradient(135deg, #FFE3E6 0%, #FFF5F1 40%, #FFEFD5 100%);
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

  /* Luyện đề CTA */
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

  /* ============================================
     VISUAL DIAGRAMS — article infographics
     ============================================ */

  .fig-caption {
    font-size: 12.5px; color: var(--g500); text-align: center;
    margin: 8px 0 2px; font-style: italic;
  }

  /* --- Purpose: reason cards --- */
  .why-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 14px; margin: 18px 0 8px;
  }
  .why-card {
    background: var(--g50); border: 1px solid var(--g200);
    border-radius: 14px; padding: 18px 16px;
    position: relative; overflow: hidden;
  }
  .why-card .wc-ico {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; margin-bottom: 12px;
  }
  .why-card h4 { font-size: 14.5px; font-weight: 800; color: var(--dark); margin: 0 0 6px; }
  .why-card p { font-size: 13px; color: var(--g600); line-height: 1.55; margin: 0; }
  .why-card.c1 .wc-ico { background: var(--red-light); }
  .why-card.c2 .wc-ico { background: var(--blue-bg); }
  .why-card.c3 .wc-ico { background: var(--orange-bg); }
  @media (max-width: 600px) { .why-grid { grid-template-columns: 1fr; } }

  /* --- Skills (CEPT) cards --- */
  .skills-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 14px; margin: 18px 0 6px;
  }
  .skill-card {
    border-radius: 16px; padding: 20px; color: #fff;
    position: relative; overflow: hidden; min-height: 132px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .skill-card .sk-top { display: flex; align-items: center; justify-content: space-between; }
  .skill-card .sk-ico { font-size: 30px; line-height: 1; }
  .skill-card .sk-time {
    background: rgba(255,255,255,0.22); backdrop-filter: blur(4px);
    padding: 5px 11px; border-radius: 999px;
    font-size: 12px; font-weight: 700;
  }
  .skill-card h4 { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin: 14px 0 2px; }
  .skill-card .sk-vi { font-size: 12px; opacity: 0.9; font-weight: 500; }
  .skill-card .sk-desc { font-size: 12.5px; line-height: 1.5; opacity: 0.95; margin-top: 6px; }
  .skill-card.listen { background: linear-gradient(135deg, #2563EB, #3B82F6); }
  .skill-card.read   { background: linear-gradient(135deg, #16A34A, #22C55E); }
  .skill-card.write  { background: linear-gradient(135deg, #D97706, #F59E0B); }
  .skill-card.speak  { background: linear-gradient(135deg, #7C3AED, #A855F7); }
  .skill-card .sk-blob {
    position: absolute; width: 120px; height: 120px; border-radius: 50%;
    background: rgba(255,255,255,0.12); bottom: -50px; right: -40px;
  }
  @media (max-width: 600px) { .skills-grid { grid-template-columns: 1fr; } }

  /* --- Speaking 3-part timeline --- */
  .step-flow { display: flex; align-items: stretch; gap: 0; margin: 16px 0 6px; flex-wrap: wrap; }
  .step-flow .sf-item {
    flex: 1; min-width: 150px;
    background: var(--purple-bg); border: 1px solid #E9D5FF;
    border-radius: 14px; padding: 16px; position: relative;
  }
  .step-flow .sf-arrow {
    display: flex; align-items: center; justify-content: center;
    color: var(--purple); font-size: 20px; font-weight: 800;
    padding: 0 6px; flex: 0 0 auto;
  }
  .step-flow .sf-num {
    font-size: 11px; font-weight: 800; color: var(--purple);
    letter-spacing: 1px; margin-bottom: 6px;
  }
  .step-flow .sf-item h5 { font-size: 14px; font-weight: 800; color: var(--dark); margin: 0 0 5px; }
  .step-flow .sf-item p { font-size: 12.5px; color: var(--g600); line-height: 1.5; margin: 0; }
  .step-flow .sf-time { font-size: 11.5px; font-weight: 700; color: var(--purple); margin-top: 8px; display: inline-block; }
  @media (max-width: 640px) {
    .step-flow { flex-direction: column; }
    .step-flow .sf-arrow { transform: rotate(90deg); padding: 4px 0; }
  }

  /* --- TOEIC big stats --- */
  .stat-row { display: flex; gap: 14px; margin: 18px 0 16px; }
  .stat-box {
    flex: 1; background: var(--dark); color: #fff;
    border-radius: 16px; padding: 20px 22px; text-align: center;
    position: relative; overflow: hidden;
  }
  .stat-box.alt { background: var(--red); }
  .stat-box .sb-num { font-family: var(--font-display); font-size: 40px; font-weight: 800; line-height: 1; }
  .stat-box .sb-lbl { font-size: 12.5px; opacity: 0.85; margin-top: 6px; }

  /* proportion bar */
  .prop-bar {
    display: flex; height: 46px; border-radius: 12px; overflow: hidden;
    margin: 6px 0 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .prop-bar .seg {
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 13px; font-weight: 700;
    position: relative;
  }
  .prop-bar .seg.listen { background: var(--blue); }
  .prop-bar .seg.read { background: var(--green); }
  .prop-legend { display: flex; gap: 18px; font-size: 12.5px; color: var(--g600); margin-bottom: 8px; }
  .prop-legend span { display: inline-flex; align-items: center; gap: 6px; }
  .prop-legend .dot { width: 11px; height: 11px; border-radius: 3px; }

  /* TOEIC parts list */
  .parts-block { margin: 14px 0; }
  .parts-block .pb-head {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 800; letter-spacing: 0.5px;
    padding: 8px 14px; border-radius: 10px 10px 0 0; color: #fff;
  }
  .parts-block.l .pb-head { background: var(--blue); }
  .parts-block.r .pb-head { background: var(--green); }
  .part-row {
    display: flex; align-items: center; gap: 14px;
    padding: 12px 16px; border: 1px solid var(--g200); border-top: none;
    background: var(--white);
  }
  .part-row:last-child { border-radius: 0 0 12px 12px; }
  .part-row .pr-tag {
    flex: 0 0 auto; width: 54px; height: 40px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; color: #fff;
  }
  .parts-block.l .pr-tag { background: var(--blue); }
  .parts-block.r .pr-tag { background: var(--green); }
  .part-row .pr-body { flex: 1; }
  .part-row .pr-body .t { font-size: 14px; font-weight: 700; color: var(--dark); }
  .part-row .pr-body .d { font-size: 12.5px; color: var(--g500); line-height: 1.45; margin-top: 2px; }
  .part-row .pr-count {
    flex: 0 0 auto; text-align: center;
  }
  .part-row .pr-count b { font-size: 20px; font-weight: 800; color: var(--dark); display: block; line-height: 1; }
  .part-row .pr-count span { font-size: 10.5px; color: var(--g400); text-transform: uppercase; letter-spacing: 0.5px; }

  /* --- Roadmap 3 steps --- */
  .roadmap { display: flex; flex-direction: column; gap: 0; margin: 18px 0 6px; }
  .rm-step { display: flex; gap: 18px; position: relative; padding-bottom: 22px; }
  .rm-step:last-child { padding-bottom: 0; }
  .rm-step .rm-rail { display: flex; flex-direction: column; align-items: center; flex: 0 0 auto; }
  .rm-step .rm-dot {
    width: 46px; height: 46px; border-radius: 50%;
    background: var(--red); color: #fff;
    font-family: var(--font-display); font-size: 22px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; box-shadow: 0 4px 12px rgba(232,25,44,0.25);
  }
  .rm-step .rm-line { width: 3px; flex: 1; background: var(--red-light); margin-top: 4px; border-radius: 2px; }
  .rm-step:last-child .rm-line { display: none; }
  .rm-step .rm-body { padding-top: 4px; flex: 1; }
  .rm-step .rm-body h4 { font-size: 17px; font-weight: 800; color: var(--dark); margin: 0 0 5px; }
  .rm-step .rm-body p { font-size: 13.5px; color: var(--g600); line-height: 1.6; margin: 0; }

  /* --- Book cards --- */
  .book-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 16px 0 6px; }
  .book-card {
    border: 1px solid var(--g200); border-radius: 14px; overflow: hidden;
    background: var(--white); display: flex; flex-direction: column;
  }
  .book-card .bc-cover {
    height: 92px; display: flex; align-items: center; justify-content: center;
    font-size: 30px; color: #fff;
  }
  .book-card.b1 .bc-cover { background: linear-gradient(135deg,#E8192C,#ff6e7a); }
  .book-card.b2 .bc-cover { background: linear-gradient(135deg,#2563EB,#60A5FA); }
  .book-card.b3 .bc-cover { background: linear-gradient(135deg,#16A34A,#4ADE80); }
  .book-card .bc-body { padding: 12px 14px; }
  .book-card .bc-body .t { font-size: 13.5px; font-weight: 800; color: var(--dark); line-height: 1.35; }
  .book-card .bc-body .a { font-size: 12px; color: var(--g500); margin-top: 3px; }
  @media (max-width: 600px) { .book-grid { grid-template-columns: 1fr; } }

  /* --- Strategy tip cards (skill specific) --- */
  .tip-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin: 16px 0 6px; }
  .tip-card {
    border-radius: 14px; padding: 16px 18px;
    background: var(--white);
    border: 1px solid var(--g200);
    border-left: 4px solid;
  }
  .tip-card .tc-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .tip-card .tc-head .ic { font-size: 18px; }
  .tip-card .tc-head .nm { font-size: 14px; font-weight: 800; color: var(--dark); }
  .tip-card p { font-size: 13px; color: var(--g600); line-height: 1.6; margin: 0; }
  .tip-card.listen { border-left-color: var(--blue); }
  .tip-card.read { border-left-color: var(--green); }
  .tip-card.write { border-left-color: var(--orange); }
  .tip-card.speak { border-left-color: var(--purple); }
  @media (max-width: 600px) { .tip-grid { grid-template-columns: 1fr; } }

  /* --- Before/during phase split --- */
  .phase-split { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 16px 0; }
  .phase-card { border-radius: 16px; padding: 20px; }
  .phase-card.before { background: linear-gradient(180deg,#EFF6FF,#F8FBFF); border: 1px solid #BFDBFE; }
  .phase-card.during { background: linear-gradient(180deg,#FFFBEB,#FFFDF5); border: 1px solid #FDE68A; }
  .phase-card .ph-tag {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 11px; font-weight: 800; letter-spacing: 1px;
    padding: 5px 12px; border-radius: 999px; margin-bottom: 12px; color: #fff;
  }
  .phase-card.before .ph-tag { background: var(--blue); }
  .phase-card.during .ph-tag { background: var(--orange); }
  .phase-card ul { margin: 0; padding-left: 0; list-style: none; }
  .phase-card li {
    font-size: 13px; color: var(--g700); line-height: 1.55;
    padding: 7px 0 7px 26px; position: relative;
  }
  .phase-card li::before {
    content: '✓'; position: absolute; left: 0; top: 7px;
    font-weight: 800; color: var(--green);
  }
  @media (max-width: 600px) { .phase-split { grid-template-columns: 1fr; } }
` as string;
