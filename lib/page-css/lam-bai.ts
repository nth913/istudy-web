export const LAM_BAI_CSS = String.raw`
  body { background: var(--g50); }

  /* ===== EXAM TOP BAR ===== */
  .exam-bar {
    position: sticky; top: 0; z-index: 50;
    background: #fff; border-bottom: 1px solid var(--g200);
    padding: 10px 24px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
  }
  .exam-bar .left { display: flex; align-items: center; gap: 12px; min-width: 0; }
  .logo-mini { width: 32px; height: 32px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; text-decoration: none; }
  .logo-mini img { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; display: block; }
  .exam-bar h1 { font-size: 14px; font-weight: 700; color: var(--dark); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .exam-bar .right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
  .chip-timer {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--orange-bg); color: var(--orange); border: 1px solid #FDE68A;
    padding: 6px 12px; border-radius: 999px;
    font-size: 13px; font-weight: 700; font-variant-numeric: tabular-nums;
  }
  .chip-count {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--g100); color: var(--g700);
    padding: 6px 12px; border-radius: 999px;
    font-size: 13px; font-weight: 600;
  }
  .chip-count strong { color: var(--red); font-weight: 800; }
  .btn--red { background: var(--red); color: var(--white); border: 1px solid var(--red); }
  .btn--red:hover { background: var(--red-hover); border-color: var(--red-hover); }

  /* ===== LAYOUT ===== */
  .exam-layout {
    display: grid; grid-template-columns: minmax(0,1fr) 280px;
    gap: 20px;
    max-width: 1240px; margin: 0 auto; padding: 20px;
  }
  .exam-layout > aside { position: sticky; top: 68px; align-self: start; }
  .questions-col { display: flex; flex-direction: column; gap: 16px; min-width: 0; }

  /* ===== SECTION HEADER ===== */
  .sec-head {
    display: flex; align-items: center; justify-content: space-between;
    background: #fff; border: 1px solid var(--g200); border-radius: 12px;
    padding: 14px 20px; gap: 12px;
    margin-top: 4px;
  }
  .sec-head:first-child { margin-top: 0; }
  .sec-head .ttl { font-size: 15px; font-weight: 700; color: var(--dark); line-height: 1.4; }
  .sec-head .meta { font-size: 12px; color: var(--g500); margin-top: 2px; }
  .sec-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--red); color: #fff;
    padding: 6px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 700; white-space: nowrap;
  }

  /* ===== QUESTION CARD ===== */
  .qcard {
    background: #fff; border: 1px solid var(--g200); border-radius: 12px;
    padding: 18px 20px 18px 20px;
    position: relative;
    scroll-margin-top: 80px;
    transition: border-color .15s, box-shadow .15s;
  }
  .qcard.is-current { border-color: var(--red); box-shadow: 0 0 0 3px rgba(232,25,44,0.08); }
  .qnum {
    width: 24px; height: 24px; border-radius: 6px;
    background: var(--red); color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800;
    margin-bottom: 12px;
  }
  .qcard.is-answered .qnum { background: var(--green); }
  .qcard.is-flagged .qnum { background: var(--orange); }

  .qtext { font-size: 14.5px; line-height: 1.7; color: var(--dark); margin-bottom: 14px; }
  .qtext u { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; color: var(--red); }
  .qtext .speaker { font-weight: 600; color: var(--g700); }

  /* shared passage / sign */
  .shared {
    background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 10px;
    padding: 14px 18px; margin-bottom: 12px;
    font-size: 14px; line-height: 1.8; color: var(--g700);
  }
  .shared strong.title { color: var(--dark); font-weight: 700; display: block; margin-bottom: 4px; }
  .shared .blank { color: var(--red); font-weight: 700; }

  .sign-tag {
    display: inline-flex; align-items: center; gap: 10px;
    background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px;
    padding: 8px 14px; margin: 8px 0 12px;
    font-size: 12px; font-weight: 700; color: #92400E;
    letter-spacing: 0.4px;
  }

  /* options grid */
  .opts {
    display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
  }
  .opt {
    display: flex; align-items: center; gap: 10px;
    padding: 11px 14px; border-radius: 10px; border: 1.5px solid var(--g200);
    background: #fff; cursor: pointer; transition: all .12s;
    font-size: 14px; color: var(--g700);
    text-align: left; width: 100%;
    font-family: inherit;
  }
  .opt:hover { border-color: var(--red); background: var(--red-light); }
  .opt.selected { border-color: var(--red); background: var(--red-light); color: var(--dark); font-weight: 600; }
  .opt .ltr {
    font-weight: 700; color: var(--g500); flex-shrink: 0;
    font-size: 13px;
  }
  .opt.selected .ltr { color: var(--red); }

  /* True / False */
  .tf {
    display: inline-flex; gap: 8px; margin-top: 4px;
  }
  .tf .opt { width: 80px; justify-content: center; padding: 8px 14px; font-weight: 600; }

  /* Word form input */
  .wf-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 4px; }
  .wf-tag {
    display: inline-flex; align-items: center;
    padding: 3px 10px; border-radius: 6px;
    background: var(--purple-bg); color: var(--purple);
    font-size: 12px; font-weight: 700; border: 1px solid #DDD6FE;
    text-transform: lowercase;
  }
  .qinput {
    border: 1.5px solid var(--g200); border-radius: 8px;
    padding: 9px 12px; font-size: 14px; color: var(--dark);
    background: #fff; min-width: 200px; flex: 1; max-width: 360px;
    font-family: var(--font);
  }
  .qinput:focus { outline: none; border-color: var(--red); box-shadow: 0 0 0 3px rgba(232,25,44,0.08); }

  /* Rewrite sentence prompt */
  .rw-prompt {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 14px; font-weight: 600; color: var(--g700);
    margin-bottom: 8px;
  }
  .rw-prompt .arrow { color: var(--red); font-weight: 700; }
  .rw-row { display: flex; align-items: center; gap: 10px; }
  .rw-row .qinput { max-width: none; width: 100%; }

  /* ===== RIGHT PANEL ===== */
  .panel {
    background: #fff; border: 1px solid var(--g200); border-radius: 12px;
    padding: 18px;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
  }
  .panel::-webkit-scrollbar { width: 6px; }
  .panel h3 {
    font-size: 12px; font-weight: 800; color: var(--g700);
    text-transform: uppercase; letter-spacing: 0.8px;
    margin: 0 0 12px;
  }
  .qmap {
    display: grid; grid-template-columns: repeat(6, 1fr); gap: 5px;
    margin-bottom: 14px;
  }
  .qmap a {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border-radius: 6px; background: #fff; border: 1.5px solid var(--g200);
    font-size: 11px; font-weight: 700; color: var(--g500); cursor: pointer;
    text-decoration: none;
    transition: transform .1s;
  }
  .qmap a:hover { transform: translateY(-1px); }
  .qmap a.done { background: var(--green-bg); color: var(--green); border-color: #BBF7D0; }
  .qmap a.current { background: var(--red); color: #fff; border-color: var(--red); }
  .qmap a.flag { background: var(--orange-bg); color: var(--orange); border-color: #FDE68A; }

  .legend {
    border-top: 1px solid var(--g100);
    padding-top: 12px; margin-bottom: 14px;
    display: flex; flex-direction: column; gap: 8px;
    font-size: 12px; color: var(--g600);
  }
  .legend > div { display: flex; align-items: center; gap: 8px; }
  .legend .swatch { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }

  .stat-line { font-size: 13px; color: var(--g600); display: flex; justify-content: space-between; padding: 4px 0; }
  .stat-line strong { color: var(--dark); font-weight: 700; }

  .panel-divider { height: 1px; background: var(--g100); margin: 10px 0; }

  .struct-title { font-size: 11px; font-weight: 800; color: var(--g500); letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 8px; }

  .submit-big {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; margin-top: 14px;
    background: var(--red); color: #fff;
    padding: 12px; border-radius: 10px;
    font-size: 14px; font-weight: 700; cursor: pointer;
    border: none; transition: background .15s;
    font-family: inherit;
    text-decoration: none;
  }
  .submit-big:hover { background: var(--red-hover); }

  @media (max-width: 1000px) {
    .exam-layout { grid-template-columns: 1fr; padding: 12px; }
    .exam-layout > aside { position: static; }
    .exam-bar { padding: 8px 14px; }
    .exam-bar h1 { font-size: 12px; }
    .opts { grid-template-columns: 1fr; }
  }
`;
