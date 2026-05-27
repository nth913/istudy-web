export const KET_QUA_CSS = String.raw`
  .page-wrap { background: var(--g50); min-height: calc(100vh - 64px); padding: 32px 0 64px; }
  .container-sm { max-width: 1080px; margin: 0 auto; padding: 0 32px; }

  .result-card {
    background: var(--white);
    border: 1px solid var(--g200);
    border-radius: 24px;
    padding: 56px 48px 48px;
    text-align: center;
  }

  .ring-wrap {
    position: relative;
    width: 200px; height: 200px;
    margin: 0 auto 28px;
  }
  .ring-wrap svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: var(--g200); stroke-width: 14; }
  .ring-fg {
    fill: none; stroke: var(--green); stroke-width: 14;
    stroke-linecap: round;
    animation: ring-fill .9s cubic-bezier(.22,1,.36,1) forwards;
  }
  @keyframes ring-fill {
    from { stroke-dashoffset: var(--ring-from); }
    to { stroke-dashoffset: var(--ring-to); }
  }
  .ring-text {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 2px;
  }
  .ring-text .num {
    font-size: 44px; font-weight: 800; color: var(--dark);
    line-height: 1; font-variant-numeric: tabular-nums;
    letter-spacing: -1px;
  }
  .ring-text .denom { font-size: 13px; color: var(--g500); font-weight: 500; }

  .result-title {
    font-size: 26px; font-weight: 800; color: var(--dark);
    margin: 0 0 8px;
    line-height: 1.3;
  }
  .result-sub {
    font-size: 14px; color: var(--g500);
    margin: 0 0 36px;
  }

  .stat-tiles {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 32px;
  }
  .stat-tile {
    border-radius: 16px;
    padding: 24px 16px;
    text-align: center;
  }
  .stat-tile .v {
    font-size: 36px; font-weight: 800; line-height: 1;
    font-variant-numeric: tabular-nums;
    margin-bottom: 8px;
  }
  .stat-tile .l {
    font-size: 14px; font-weight: 600;
  }
  .stat-tile.s-correct { background: #DCFCE7; }
  .stat-tile.s-correct .v, .stat-tile.s-correct .l { color: #16A34A; }
  .stat-tile.s-wrong { background: #FFF0F1; }
  .stat-tile.s-wrong .v, .stat-tile.s-wrong .l { color: var(--red); }
  .stat-tile.s-skip { background: #FEF3C7; }
  .stat-tile.s-skip .v, .stat-tile.s-skip .l { color: #D97706; }
  .stat-tile.s-score { background: #DBEAFE; }
  .stat-tile.s-score .v, .stat-tile.s-score .l { color: #2563EB; }

  .actions-row {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }
  .act-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 15px; font-weight: 600;
    border: 1.5px solid var(--g200);
    background: var(--white); color: var(--dark);
    cursor: pointer; transition: all .15s;
    text-decoration: none;
  }
  .act-btn:hover { border-color: var(--g400); }
  .act-btn--primary {
    background: var(--red); color: #fff;
    border-color: var(--red);
  }
  .act-btn--primary:hover { background: var(--red-hover); border-color: var(--red-hover); }

  .breadcrumb {
    margin-bottom: 24px;
    font-size: 14px;
  }

  @media (max-width: 720px) {
    .container-sm { padding: 0 16px; }
    .result-card { padding: 36px 20px 28px; border-radius: 18px; }
    .ring-wrap { width: 160px; height: 160px; }
    .ring-text .num { font-size: 36px; }
    .result-title { font-size: 20px; }
    .stat-tiles { grid-template-columns: repeat(2, 1fr); }
    .stat-tile .v { font-size: 28px; }
    .actions-row { flex-direction: column; }
    .act-btn { width: 100%; justify-content: center; }
  }
`;
