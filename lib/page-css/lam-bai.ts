export const LAM_BAI_CSS = String.raw`
  body { background: var(--g50); }
  .exam-header {
    position: sticky; top: 0; z-index: 50;
    background: #fff; border-bottom: 1px solid var(--g200);
    padding: 14px 32px; display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  }
  .exam-header .left { display: flex; align-items: center; gap: 16px; min-width: 0; }
  .exam-header .logo-mini { width: 36px; height: 36px; border-radius: 8px; background: var(--red); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; }
  .exam-header h1 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 480px; }
  .exam-header .sub { font-size: 12px; color: var(--g500); margin-top: 2px; }

  .timer-box { display: flex; align-items: center; gap: 12px; }
  .timer { background: var(--red-light); border: 1px solid #FECACA; padding: 8px 18px; border-radius: 10px; }
  .timer .l { font-size: 10px; color: var(--g500); font-weight: 700; text-transform: uppercase; }
  .timer .v { font-size: 22px; font-weight: 800; color: var(--red); font-variant-numeric: tabular-nums; line-height: 1; }

  .exam-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; max-width: 1400px; margin: 0 auto; padding: 24px 32px; align-items: start; }

  .question-area { background: #fff; border: 1px solid var(--g200); border-radius: 16px; padding: 32px 40px; }
  .q-progress { font-size: 13px; color: var(--g500); margin-bottom: 6px; }
  .q-progress strong { color: var(--red); font-size: 16px; }
  .q-section { font-size: 11px; font-weight: 700; color: var(--red); text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 16px; }

  .q-text { font-size: 18px; line-height: 1.6; color: var(--dark); margin-bottom: 24px; font-weight: 500; }
  .q-text u { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 4px; color: var(--red); }

  .options { display: flex; flex-direction: column; gap: 10px; }
  .option {
    display: flex; align-items: center; gap: 14px;
    padding: 16px 20px; border-radius: 12px; border: 2px solid var(--g200);
    background: #fff; cursor: pointer; transition: all .15s;
    font-size: 15px; color: var(--g700);
  }
  .option:hover { border-color: var(--red); background: var(--red-light); }
  .option.selected { border-color: var(--red); background: var(--red-light); color: var(--dark); font-weight: 600; }
  .option .letter {
    width: 36px; height: 36px; border-radius: 10px; background: var(--g100);
    color: var(--g500); display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 15px; flex-shrink: 0;
  }
  .option.selected .letter { background: var(--red); color: #fff; }

  .q-nav { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--g100); }
  .q-nav .left-btns { display: flex; gap: 8px; }

  .panel { background: #fff; border: 1px solid var(--g200); border-radius: 16px; padding: 22px; position: sticky; top: 92px; }
  .panel h3 { font-size: 13px; font-weight: 700; color: var(--g500); margin: 0 0 14px; text-transform: uppercase; letter-spacing: 0.5px; }

  .qmap { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 16px; }
  .qmap div {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; background: var(--g50); border: 1px solid var(--g200);
    font-size: 12px; font-weight: 700; color: var(--g500); cursor: pointer;
  }
  .qmap div.done { background: var(--green-50); color: var(--green); border-color: #BBF7D0; }
  .qmap div.current { background: var(--red); color: #fff; border-color: var(--red); }
  .qmap div.flag { background: #FEF3C7; color: #D97706; border-color: #FDE68A; }

  .legend { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; font-size: 11px; color: var(--g500); }
  .legend > div { display: flex; align-items: center; gap: 8px; }
  .legend .dot { width: 10px; height: 10px; border-radius: 3px; }

  .panel-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 12px; background: var(--g50); border-radius: 10px; margin-bottom: 14px; }
  .panel-stats div { text-align: center; }
  .panel-stats .v { font-size: 18px; font-weight: 800; color: var(--dark); }
  .panel-stats .l { font-size: 11px; color: var(--g500); }

  @media (max-width: 1000px) {
    .exam-layout { grid-template-columns: 1fr; padding: 16px; }
    .panel { position: static; }
    .exam-header { padding: 10px 16px; }
    .exam-header h1 { max-width: 200px; font-size: 13px; }
    .question-area { padding: 20px; }
  }
`;
