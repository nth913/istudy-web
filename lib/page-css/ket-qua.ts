export const KET_QUA_CSS = String.raw`
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .container-sm { max-width: 1080px; margin: 0 auto; padding: 24px 32px; }

  .result-hero {
    background: linear-gradient(135deg, var(--green) 0%, #15803D 100%);
    color: #fff; border-radius: 24px; padding: 40px 48px;
    margin-bottom: 24px; position: relative; overflow: hidden;
  }
  .result-hero::after {
    content: '🎉'; position: absolute; right: 40px; top: 50%;
    transform: translateY(-50%); font-size: 120px; opacity: 0.2;
  }
  .result-hero .lbl { font-size: 13px; font-weight: 700; opacity: 0.85; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
  .result-hero h1 { font-size: 28px; font-weight: 800; margin: 0 0 8px; line-height: 1.3; }
  .result-hero .sub { font-size: 15px; opacity: 0.9; margin: 0 0 28px; }
  .score-row { display: flex; align-items: flex-end; gap: 24px; }
  .big-score { font-size: 80px; font-weight: 900; line-height: 1; font-variant-numeric: tabular-nums; }
  .big-score .frac { font-size: 36px; opacity: 0.7; font-weight: 700; }
  .score-meta { padding-bottom: 12px; }
  .score-meta .grade { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
  .score-meta .pct { font-size: 14px; opacity: 0.85; }

  .stats-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;
  }
  .stat-card {
    background: #fff; border-radius: 16px; padding: 22px; border: 1px solid var(--g200);
    display: flex; align-items: center; gap: 16px;
  }
  .stat-card .ico {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px; flex-shrink: 0;
  }
  .stat-card .v { font-size: 22px; font-weight: 800; color: var(--dark); line-height: 1; margin-bottom: 4px; }
  .stat-card .l { font-size: 12px; color: var(--g500); }

  .grid-2 { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 24px; }
  .card { background: #fff; border-radius: 16px; padding: 24px 28px; border: 1px solid var(--g200); }
  .card h2 { font-size: 16px; font-weight: 700; color: var(--dark); margin: 0 0 18px; display: flex; align-items: center; gap: 8px; }

  .section-row {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 0; border-bottom: 1px solid var(--g100);
  }
  .section-row:last-child { border-bottom: none; }
  .section-row .name { font-size: 13px; font-weight: 600; color: var(--dark); flex: 1; min-width: 0; }
  .section-row .name .desc { font-size: 11px; color: var(--g500); font-weight: 400; margin-top: 2px; }
  .section-row .bar-wrap { width: 130px; height: 8px; background: var(--g100); border-radius: 999px; overflow: hidden; }
  .section-row .bar { height: 100%; background: var(--green); }
  .section-row .ratio { font-size: 13px; font-weight: 700; color: var(--dark); width: 50px; text-align: right; }

  .qmap-result { display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; }
  .qmap-result div {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer;
  }
  .qmap-result .ok { background: var(--green-50); color: var(--green); border: 1px solid #BBF7D0; }
  .qmap-result .x { background: var(--red-light); color: var(--red); border: 1px solid #FECACA; }
  .qmap-result .empty { background: var(--g100); color: var(--g400); border: 1px solid var(--g200); }
  .qmap-legend { display: flex; gap: 14px; font-size: 12px; color: var(--g500); margin-top: 14px; flex-wrap: wrap; }
  .qmap-legend > div { display: flex; align-items: center; gap: 6px; }
  .qmap-legend .dot { width: 12px; height: 12px; border-radius: 3px; }

  .compare-card { padding: 22px 28px; }
  .compare-card .you-line { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--g100); font-size: 13px; }
  .compare-card .you-line:last-child { border: none; }
  .compare-card .you-line .v { font-weight: 800; color: var(--dark); }
  .compare-card .you-line .v.good { color: var(--green); }
  .compare-card .you-line .v.warn { color: #D97706; }

  .recs { margin-bottom: 24px; }
  .recs h2 { font-size: 18px; font-weight: 700; color: var(--dark); margin: 0 0 16px; }
  .rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .rec-card { background: #fff; border-radius: 14px; padding: 22px; border: 1px solid var(--g200); text-decoration: none; color: inherit; transition: all .2s; }
  .rec-card:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.05); border-color: rgba(232,25,44,0.2); }
  .rec-card .ico { font-size: 32px; margin-bottom: 12px; }
  .rec-card h3 { font-size: 14px; font-weight: 700; color: var(--dark); margin: 0 0 6px; line-height: 1.5; }
  .rec-card p { font-size: 12px; color: var(--g500); margin: 0; line-height: 1.6; }

  .cta-row { display: flex; gap: 12px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }

  @media (max-width: 900px) {
    .container-sm { padding: 16px; }
    .result-hero { padding: 28px 24px; }
    .result-hero::after { font-size: 80px; right: 16px; opacity: 0.15; }
    .big-score { font-size: 60px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .grid-2 { grid-template-columns: 1fr; }
    .rec-grid { grid-template-columns: 1fr; }
  }
`;
