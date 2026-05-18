/**
 * Cho-de (waiting page) styles — ported from the inline `<style>` block of
 * /tmp/design-bundle/istudy-v2/project/cho-de.html plus the few shell pieces
 * we need from /tmp/design-bundle/istudy-v2/project/styles.css and
 * de-dap-an-waiting.css (page-wrap, container-md, breadcrumb are already in
 * app/globals.css so we only add `.page-wrap` background + container width here).
 *
 * Visual identity per docs/superpowers/progress/2026-05-18-design-v2-chat-intent.md
 * § cho-de: distinct paper-clinical event hero + big countdown + 4-step timeline
 * + facts + notify form + related events. Uses CSS variables defined in
 * app/globals.css (--red, --dark, --g100…--g700, --green, --red-light).
 */
export const CHO_DE_CSS = String.raw`
  /* Page shell */
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .container-md { max-width: 1100px; margin: 0 auto; padding: 24px 40px; }

  /* Event-specific shell on top of waiting card */
  .ev-hero {
    background:
      radial-gradient(120% 80% at 0% 0%, rgba(232,25,44,0.10) 0%, transparent 55%),
      linear-gradient(160deg, #FFFAF6 0%, #FFF5F6 100%);
    border-radius: 22px; border: 1.5px solid #1A1A1A;
    box-shadow: 6px 6px 0 #1A1A1A;
    padding: 32px 36px 28px;
    margin: 24px 0;
    position: relative; overflow: hidden;
  }
  .ev-hero::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0; height: 6px;
    background: repeating-linear-gradient(45deg, var(--red) 0 10px, #1A1A1A 10px 20px, var(--red) 20px 30px);
  }
  .ev-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 11px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;
    color: var(--red); margin-bottom: 14px;
  }
  .ev-eyebrow .pulse {
    width: 8px; height: 8px; border-radius: 50%; background: var(--red);
    box-shadow: 0 0 0 0 rgba(232,25,44,.55); animation: chodePulse 1.5s infinite;
  }
  @keyframes chodePulse {
    0%   { box-shadow: 0 0 0 0 rgba(232,25,44,.55); }
    70%  { box-shadow: 0 0 0 12px rgba(232,25,44,0); }
    100% { box-shadow: 0 0 0 0 rgba(232,25,44,0); }
  }
  .ev-hero h1 {
    font-size: 30px; font-weight: 800; color: var(--dark); margin: 0 0 8px;
    line-height: 1.2; letter-spacing: -0.5px; text-wrap: pretty;
    max-width: 780px;
  }
  .ev-hero .ev-sub {
    font-size: 15px; color: var(--g600); line-height: 1.6; max-width: 720px;
    margin: 0;
  }
  .ev-meta-row {
    display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px;
  }
  .ev-meta-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 7px 14px; background: #fff;
    border: 1px solid var(--g300); border-radius: 999px;
    font-size: 13px; font-weight: 600; color: var(--dark);
    font-variant-numeric: tabular-nums;
  }
  .ev-meta-chip .icon { width: 14px; height: 14px; color: var(--red); }
  .ev-meta-chip.is-soft { background: var(--g50); color: var(--g600); font-weight: 500; }

  /* Big countdown */
  .ev-clock {
    margin-top: 22px;
    display: inline-flex; align-items: stretch; gap: 4px;
    background: #fff; border: 1.5px solid #1A1A1A;
    border-radius: 16px; padding: 14px 16px; box-shadow: 3px 3px 0 #1A1A1A;
  }
  .ev-clock-unit {
    min-width: 64px; padding: 0 8px;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .ev-clock-num {
    font-family: 'Lexend','Be Vietnam Pro',monospace;
    font-size: 36px; font-weight: 800; color: var(--red);
    line-height: 1; letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
  }
  .ev-clock-lbl {
    font-size: 10px; font-weight: 700; color: var(--g500);
    letter-spacing: 1.2px; text-transform: uppercase; margin-top: 6px;
  }
  .ev-clock-sep {
    font-size: 28px; font-weight: 800; color: rgba(232,25,44,.25);
    display: flex; align-items: center;
  }

  .ev-state-line {
    margin-top: 18px; padding: 12px 16px;
    border-radius: 12px; background: #fff; border: 1px dashed var(--g300);
    font-size: 13.5px; color: var(--g700);
    display: flex; gap: 10px; align-items: center;
  }
  .ev-state-line .dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--red); flex-shrink: 0;
  }
  .ev-state-line.is-after .dot { background: var(--green); }

  /* Schedule strip */
  .ev-schedule {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
    margin: 24px 0;
  }
  .ev-step {
    background: #fff; border: 1px solid var(--g200); border-radius: 14px;
    padding: 16px; position: relative;
  }
  .ev-step .step-num {
    position: absolute; top: -12px; left: 16px;
    background: var(--red); color: #fff; width: 26px; height: 26px;
    border-radius: 50%; font-size: 12px; font-weight: 800;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 2px 2px 0 #1A1A1A;
  }
  .ev-step.done .step-num { background: var(--green); }
  .ev-step.now .step-num { background: var(--red); animation: chodePulse 1.5s infinite; }
  .ev-step.todo .step-num { background: var(--g300); color: var(--g500); }
  .ev-step h4 { font-size: 13px; font-weight: 700; color: var(--dark); margin: 8px 0 4px; }
  .ev-step .when { font-size: 12px; color: var(--g500); font-weight: 600; }
  .ev-step p { font-size: 12.5px; color: var(--g600); line-height: 1.55; margin: 6px 0 0; }
  .ev-step.now { border-color: var(--red); box-shadow: 0 6px 24px -10px rgba(232,25,44,0.2); }
  .ev-step.done { background: var(--g50); }
  .ev-step.done h4 { color: var(--g500); text-decoration: line-through; }

  /* Info + Notify */
  .ev-info-grid {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px;
    margin-top: 20px;
  }
  .ev-info-card {
    background: #fff; border: 1px solid var(--g200); border-radius: 16px;
    padding: 22px 24px;
  }
  .ev-info-card h3 {
    font-size: 14px; font-weight: 800; color: var(--dark); margin: 0 0 14px;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .ev-fact-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .ev-fact-list li {
    display: grid; grid-template-columns: 110px 1fr; gap: 14px; align-items: baseline;
    font-size: 13.5px; padding-bottom: 10px; border-bottom: 1px dashed var(--g200);
  }
  .ev-fact-list li:last-child { border-bottom: none; padding-bottom: 0; }
  .ev-fact-list .k { color: var(--g500); font-weight: 600; }
  .ev-fact-list .v { color: var(--dark); font-weight: 600; }

  .ev-notify-box {
    background: linear-gradient(160deg, #FFF5F6 0%, var(--red-light) 100%);
    border: 1px solid rgba(232,25,44,0.18);
  }
  .ev-notify-box h3 { color: var(--red); }
  .ev-notify-box p { font-size: 13px; color: var(--g700); line-height: 1.6; margin: 0 0 14px; }

  .ev-notify-form { display: flex; gap: 6px; flex-wrap: wrap; }
  .ev-notify-form input {
    flex: 1; min-width: 220px;
    padding: 12px 16px; border-radius: 12px;
    border: 1px solid var(--g300); font-size: 14px; outline: none;
    background: #fff; font-family: inherit;
  }
  .ev-notify-form input:focus { border-color: var(--red); }
  .ev-notify-form .btn { padding: 12px 22px; font-size: 14px; }

  .ev-notify-channels { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
  .ev-notify-channels .chan {
    flex: 1; min-width: 0; padding: 10px 12px;
    background: #fff; border: 1px solid var(--g200); border-radius: 10px;
    font-size: 12.5px; color: var(--g700);
    display: flex; align-items: center; gap: 8px;
    cursor: pointer; transition: all .15s;
  }
  .ev-notify-channels .chan:hover { border-color: var(--red); color: var(--red); }
  .ev-notify-channels .chan.is-on { border-color: var(--red); background: #fff; color: var(--red); font-weight: 600; }
  .ev-notify-channels .chan input { display: none; }

  /* Empty state (no matching event / not 'pre') */
  .ev-empty {
    background: #fff; border: 1px dashed var(--g300); border-radius: 16px;
    padding: 48px 32px; text-align: center; margin: 24px 0;
  }
  .ev-empty h2 {
    font-size: 22px; font-weight: 800; color: var(--dark);
    margin: 0 0 8px; line-height: 1.3;
  }
  .ev-empty p {
    font-size: 14px; color: var(--g600); margin: 0 0 18px;
    line-height: 1.6; max-width: 520px; margin-left: auto; margin-right: auto;
  }
  .ev-empty .btn { padding: 12px 22px; font-size: 14px; }

  /* Related events */
  .ev-related { margin-top: 28px; }
  .ev-related h3 {
    font-size: 14px; font-weight: 800; color: var(--dark); margin: 0 0 12px;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .ev-related-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
  }
  .ev-related-card {
    background: #fff; border: 1px solid var(--g200); border-radius: 14px;
    padding: 16px; text-decoration: none; transition: all .15s;
    display: flex; flex-direction: column; gap: 6px;
    color: inherit;
  }
  .ev-related-card:hover {
    border-color: var(--red); transform: translateY(-2px);
    box-shadow: 0 10px 30px -16px rgba(232,25,44,0.2);
  }
  .ev-related-card .rc-date {
    font-size: 11.5px; font-weight: 600; color: var(--red); letter-spacing: 0.5px;
  }
  .ev-related-card .rc-rel {
    font-size: 11px; font-weight: 500; color: var(--g500); margin-top: -2px;
  }
  .ev-related-card .rc-title {
    font-size: 13.5px; font-weight: 700; color: var(--dark); line-height: 1.4;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .container-md { padding: 16px; }
    .ev-hero { padding: 24px 18px 20px; }
    .ev-hero h1 { font-size: 22px; }
    .ev-schedule { grid-template-columns: 1fr 1fr; }
    .ev-info-grid { grid-template-columns: 1fr; }
    .ev-related-grid { grid-template-columns: 1fr; }
    .ev-clock-unit { min-width: 52px; padding: 0 4px; }
    .ev-clock-num { font-size: 28px; }
  }
`;
