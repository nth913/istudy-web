export const KHO_DE_THI_CSS = String.raw`
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .layout { max-width: 1280px; margin: 0 auto; padding: 24px 40px; display: flex; gap: 32px; }
  .main { flex: 1; min-width: 0; }
  .list-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
  .list-head h1 { font-size: 26px; font-weight: 800; color: var(--dark); margin: 0; }
  .list-head .sub { font-size: 14px; color: var(--g500); margin: 4px 0 0; }
  .toolbar { display: flex; gap: 8px; align-items: center; }
  .toolbar select { padding: 8px 14px; border-radius: 8px; border: 1px solid var(--g200); font-size: 13px; color: var(--g600); background: var(--white); }

  .view-toggle { display: flex; gap: 4px; }
  .view-toggle > button {
    width: 36px; height: 36px; border-radius: 8px;
    background: var(--white); border: 1px solid var(--g200);
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--g500); padding: 0;
  }
  .view-toggle > button:hover { color: var(--red); border-color: rgba(232,25,44,0.3); }
  .view-toggle > button.active { background: var(--red); color: #fff; border-color: var(--red); }
  .view-toggle > button:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }

  /* Year divider */
  .year-divider { font-size: 13px; font-weight: 700; color: var(--red); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .year-divider .label { background: var(--red-light); padding: 4px 12px; border-radius: 6px; }
  .year-divider .line { flex: 1; height: 1px; background: var(--g200); }

  /* ===== LIST VIEW ===== */
  .exam-row {
    display: grid; grid-template-columns: 52px 1fr auto;
    gap: 4px 20px; padding: 20px 24px;
    background: var(--white); border-radius: 14px; border: 1px solid var(--g200);
    transition: all .2s; color: inherit; align-items: center;
  }
  .exam-row:hover { border-color: rgba(232,25,44,0.3); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.05); }
  .exam-thumb { width: 52px; height: 52px; border-radius: 12px; background: linear-gradient(135deg,var(--red-light),#FFF5F5); display: flex; align-items: center; justify-content: center; font-size: 24px; }
  .exam-body { min-width: 0; }
  .exam-meta-top { display: flex; gap: 8px; margin-bottom: 8px; flex-wrap: wrap; }
  .exam-row h3 { font-size: 15px; font-weight: 600; color: var(--dark); margin: 0 0 8px; line-height: 1.4; }
  .exam-row h3 a { color: inherit; text-decoration: none; }
  .exam-row h3 a:hover { color: var(--red); }
  .exam-meta-bot { display: flex; gap: 16px; font-size: 12px; color: var(--g500); flex-wrap: wrap; }
  .exam-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }

  .year-block { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }

  /* Visually-hidden helper */
  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }

  /* ===== GRID VIEW =====
     Per chat1 intent: action buttons stay INSIDE each card.
     Grid layout = stretched full-width with separator above. */
  .year-block.is-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  .is-grid .exam-row {
    display: flex; flex-direction: column; align-items: stretch;
    padding: 18px; gap: 12px;
  }
  .is-grid .exam-thumb { width: 100%; height: 80px; border-radius: 10px; font-size: 32px; }
  .is-grid .exam-body { flex: 1; display: flex; flex-direction: column; }
  .is-grid .exam-row h3 {
    font-size: 14px; line-height: 1.45; margin: 0 0 10px;
    display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .is-grid .exam-meta-bot { gap: 10px 12px; font-size: 11px; margin-top: auto; padding-top: 10px; border-top: 1px dashed var(--g100); }
  .is-grid .exam-actions {
    justify-content: stretch; gap: 6px;
    padding-top: 10px; border-top: 1px solid var(--g100);
  }
  .is-grid .exam-actions .btn { flex: 1; justify-content: center; padding: 8px 10px; font-size: 12px; }

  @media (max-width: 900px) {
    .layout { flex-direction: column; padding: 16px; }
    .exam-row { grid-template-columns: 52px 1fr; }
    .exam-actions { grid-column: 1 / -1; justify-content: flex-start; margin-top: 8px; padding-top: 12px; border-top: 1px solid var(--g100); }
    .exam-actions .btn { flex: 1; justify-content: center; }
  }

  /* ===== deReady badge (T13) ===== */
  .exam-badge { display: inline-block; padding: 2px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; white-space: nowrap; }
  .exam-badge--waiting { background: rgb(254,243,199); color: rgb(120,53,15); }
  .exam-badge--ready { background: rgb(220,252,231); color: rgb(22,101,52); }

  /* ===== Sidebar toggle (mobile + tablet) ===== */
  .filter-bar { display: none; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
  .filter-toggle {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 16px; border-radius: 10px;
    background: var(--white); border: 1px solid var(--g200);
    font-size: 14px; font-weight: 600; color: var(--dark);
    cursor: pointer; transition: all .2s;
  }
  .filter-toggle:hover { border-color: var(--red); color: var(--red); }
  .filter-toggle:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }

  .sidebar-head { display: none; align-items: center; justify-content: space-between; padding: 4px 4px 16px; border-bottom: 1px solid var(--g100); margin-bottom: 16px; }
  .sidebar-head h3 { margin: 0; font-size: 16px; font-weight: 700; color: var(--dark); }
  .sidebar-close {
    width: 36px; height: 36px; border-radius: 8px; border: none; background: var(--g100);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    color: var(--g600);
  }
  .sidebar-close:hover { background: var(--red-light); color: var(--red); }
  .sidebar-close:focus-visible { outline: 2px solid var(--red); outline-offset: 2px; }

  .sidebar-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,.45);
    cursor: pointer;
    z-index: 998; opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity .25s ease, visibility .25s ease;
  }
  .sidebar-backdrop.is-open {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  @media (max-width: 1024px) {
    .filter-bar { display: flex; }
    .layout { padding: 20px 24px; gap: 0; }
    .sidebar {
      position: fixed; top: 0; left: 0; bottom: 0; width: 320px; max-width: 85vw;
      background: var(--white); z-index: 999;
      padding: 20px; overflow-y: auto;
      transform: translateX(-100%);
      transition: transform .28s cubic-bezier(.4,0,.2,1);
      box-shadow: 0 20px 50px rgba(0,0,0,.15);
    }
    .sidebar.is-open { transform: translateX(0); }
    .sidebar-head { display: flex; }
  }
`;
