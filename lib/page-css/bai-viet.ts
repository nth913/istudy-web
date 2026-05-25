export const BAI_VIET_CSS = String.raw`
  .page-wrap { background: var(--g50); min-height: 100vh; }
  .layout { max-width: 1280px; margin: 0 auto; padding: 24px 40px; }
  .blog-head { margin-bottom: 24px; }
  .blog-head h1 { font-size: 28px; font-weight: 800; color: var(--dark); margin: 0 0 6px; }
  .blog-head p { font-size: 14px; color: var(--g500); margin: 0; }

  .featured-row { display: grid; grid-template-columns: 1.4fr 1fr; gap: 20px; margin-bottom: 32px; }
  .feat-main, .feat-side-item {
    background: #fff; border: 1px solid var(--g200); border-radius: 16px;
    overflow: hidden; text-decoration: none; color: inherit;
    transition: transform .2s, box-shadow .2s, border-color .2s;
    display: flex; flex-direction: column;
  }
  .feat-main:hover, .feat-side-item:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.06); }
  .feat-main .img {
    aspect-ratio: 16/9;
    display: flex; align-items: center; justify-content: center;
    font-size: 64px; position: relative;
  }
  .feat-main .body { padding: 22px 24px; }
  .feat-main h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin: 8px 0 8px; line-height: 1.3; }
  .feat-main p { font-size: 14px; color: var(--g500); line-height: 1.6; margin: 0 0 14px; }
  .feat-main .meta { font-size: 12px; color: var(--g400); display: flex; gap: 12px; }

  .feat-side { display: flex; flex-direction: column; gap: 16px; }
  .feat-side-item { flex: 1; flex-direction: row; align-items: stretch; }
  .feat-side-item .img { width: 160px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 36px; }
  .feat-side-item .body { padding: 14px 18px; flex: 1; min-width: 0; }
  .feat-side-item .tag-pill { padding: 2px 8px; }
  .feat-side-item h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 6px 0 6px; line-height: 1.4; }
  .feat-side-item .meta { font-size: 11px; color: var(--g400); }

  .cat-strip { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; padding-bottom: 16px; border-bottom: 1px solid var(--g200); }
  .cat-chip { padding: 8px 16px; border-radius: 999px; background: #fff; border: 1px solid var(--g200); font-size: 13px; font-weight: 600; color: var(--g600); cursor: pointer; }
  .cat-chip.active { background: var(--red); color: #fff; border-color: var(--red); }

  .post-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .post-card {
    background: #fff; border: 1px solid var(--g200); border-radius: 14px;
    overflow: hidden; text-decoration: none; color: inherit;
    transition: transform .2s, box-shadow .2s, border-color .2s;
    display: flex; flex-direction: column;
  }
  .post-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.06); border-color: rgba(232,25,44,0.2); }
  .post-card .img { aspect-ratio: 16/10; display: flex; align-items: center; justify-content: center; font-size: 48px; }
  .post-card .body { padding: 18px 20px; flex: 1; display: flex; flex-direction: column; }
  .post-card h3 { font-size: 15px; font-weight: 700; color: var(--dark); margin: 0 0 8px; line-height: 1.5; }
  .post-card .excerpt { font-size: 13px; color: var(--g500); line-height: 1.6; margin: 0 0 14px; flex: 1; }
  .post-card .meta { font-size: 11px; color: var(--g400); display: flex; gap: 10px; padding-top: 10px; border-top: 1px solid var(--g100); }

  .tag-pill { display: inline-block; align-self: flex-start; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; }
  .post-card .tag-pill { margin-bottom: 10px; }
  .tag-pill--grammar   { color: var(--red);   background: var(--red-light); }
  .tag-pill--vocab     { color: #9333EA;      background: #F3E8FF; }
  .tag-pill--strategy  { color: var(--blue);  background: #EFF6FF; }
  .tag-pill--pronounce { color: var(--green); background: var(--green-bg); }
  .tag-pill--writing   { color: #D97706;      background: #FEF3C7; }
  .tag-pill--reading   { color: #0891B2;      background: #CFFAFE; }

  .img--0 { background: linear-gradient(135deg,#FFE4E6,#FECACA); }
  .img--1 { background: linear-gradient(135deg,#DBEAFE,#BFDBFE); }
  .img--2 { background: linear-gradient(135deg,#D1FAE5,#A7F3D0); }
  .img--3 { background: linear-gradient(135deg,#FEF3C7,#FDE68A); }
  .img--4 { background: linear-gradient(135deg,#F3E8FF,#E9D5FF); }
  .img--5 { background: linear-gradient(135deg,#FCE7F3,#FBCFE8); }
  .img--6 { background: linear-gradient(135deg,#E0E7FF,#C7D2FE); }
  .img--7 { background: linear-gradient(135deg,#FED7AA,#FDBA74); }
  .img--8 { background: linear-gradient(135deg,#CFFAFE,#A5F3FC); }

  .load-more { text-align: center; margin: 32px 0; }

  @media (max-width: 900px) {
    .layout { padding: 16px; }
    .featured-row { grid-template-columns: 1fr; }
    .post-grid { grid-template-columns: 1fr; }
    .feat-side-item { flex-direction: column; }
    .feat-side-item .img { width: 100%; aspect-ratio: 16/9; }
  }
`;
