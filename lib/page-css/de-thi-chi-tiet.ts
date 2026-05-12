export const DE_THI_CHI_TIET_CSS = String.raw`
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .container-sm { max-width: 980px; margin: 0 auto; padding: 24px 40px; }
  .head-card { background: #fff; border-radius: 20px; padding: 32px; border: 1px solid var(--g200); margin-bottom: 20px; }
  .head-meta { display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap; }
  .head-card h1 { font-size: 24px; font-weight: 800; color: var(--dark); margin: 0 0 10px; line-height: 1.4; }
  .head-card .desc { font-size: 15px; color: var(--g500); margin: 0 0 20px; line-height: 1.6; }
  .info-row { display: flex; gap: 20px; padding: 14px 0; border-top: 1px solid var(--g100); border-bottom: 1px solid var(--g100); margin-bottom: 18px; font-size: 14px; color: var(--g600); flex-wrap: wrap; }
  .info-row span { display: flex; align-items: center; gap: 6px; }
  .head-actions { display: flex; gap: 10px; flex-wrap: wrap; }

  .pdf-card { background: #fff; border-radius: 16px; border: 1px solid var(--g200); overflow: hidden; }
  .pdf-toolbar { background: var(--g100); padding: 10px 20px; border-bottom: 1px solid var(--g200); display: flex; align-items: center; }
  .pdf-toolbar span { font-size: 13px; font-weight: 600; color: var(--g600); }
  .pdf-content { padding: 32px 40px; display: flex; justify-content: center; }
  .pdf-page {
    width: 100%; max-width: 700px; background: #fff;
    box-shadow: 0 1px 16px rgba(0,0,0,0.06); border-radius: 4px;
    padding: 48px 56px; border: 1px solid #eee;
    font-size: 13px; color: var(--g700); line-height: 2;
  }
  .pdf-page .title-block { text-align: center; margin-bottom: 28px; }
  .pdf-page .title-1 { font-size: 14px; font-weight: 800; color: var(--dark); letter-spacing: 0.5px; }
  .pdf-page .title-2 { font-size: 15px; font-weight: 800; color: var(--red); margin-top: 4px; }
  .pdf-page .time { font-size: 13px; color: var(--g600); margin-top: 4px; }
  .pdf-page h4 { font-weight: 700; color: var(--dark); margin: 24px 0 10px; font-size: 13px; font-style: italic; }
  .pdf-page .q { margin-top: 10px; margin-bottom: 6px; }
  .pdf-page .o { padding-left: 20px; color: var(--g600); }
  .pdf-page .passage { background: var(--g50); border-radius: 8px; padding: 14px 18px; margin: 8px 0 12px; border: 1px solid var(--g200); font-size: 13px; line-height: 1.9; }
  .sign-box { display: inline-flex; align-items: center; gap: 12px; background: var(--orange-bg); border-radius: 8px; padding: 14px; margin: 8px 0 8px 20px; border: 1px solid #FDE68A; }
  .sign-box .ico { font-size: 28px; }
  .sign-box .lbl1 { font-size: 11px; font-weight: 800; color: var(--dark); }
  .sign-box .lbl2 { font-size: 10px; color: var(--g600); }
  .pdf-end { text-align: center; font-size: 13px; font-weight: 700; color: var(--g400); margin-top: 32px; padding-top: 16px; border-top: 2px solid var(--g200); }

  @media (max-width: 900px) {
    .container-sm { padding: 16px; }
    .pdf-content { padding: 16px; }
    .pdf-page { padding: 24px 20px; }
    .head-card { padding: 20px; }
  }
`;
