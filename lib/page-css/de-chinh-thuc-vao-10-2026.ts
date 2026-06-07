/* ============================================================
   de-chinh-thuc-vao-10-2026.ts — CSS trang "Đề chính thức vào 10 — 2026".
   PORT NGUYÊN VĂN từ bundle design istudy-v4-1 (Claude Design):
   exam-thumbs.css + vao10-2026.css, ghép theo thứ tự đó.
   Base .thumb/.pthumb scope dưới .v10p để không leak ra UI khác
   (search-popup skeleton cũng dùng class .thumb). Cuối file: 2 rule
   FE bổ sung cho ảnh thumbnail override từ CMS (.v10-thumb-img).
   ============================================================ */
export const DE_CHINH_THUC_VAO_10_2026_CSS = String.raw`
/* ============================================================
   exam-thumbs.css — thumbnail nghệ thuật cho đề thi (istudy)
   20 mẫu: genZ · mèo · cute · đỗ đạt · mùa thi · mùa xa nhau ·
           ảnh hoa phượng thật · hoa phượng + giấy + mộng mơ
   Dùng: <div class="thumb thumb--<slug>">…</div> bên trong .exam-thumb
   Ảnh hoa phượng: Delonix regia — Wikimedia Commons (CC BY-SA)
   ============================================================ */

.v10p .thumb {
  width: 100%; height: 100%; border-radius: inherit;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; position: relative;
  font-family: var(--font-display);
  user-select: none;
}
.v10p .thumb .catface { display: inline-block; line-height: 0; }
.v10p .thumb .catface svg { display: block; width: 100%; height: 100%; }

/* ---- meo-pastel · Mèo sticker pastel ---- */
.thumb--meo-pastel { background: linear-gradient(135deg,#EDE7FF,#E3F0FF); }
.thumb--meo-pastel::before { content:""; position:absolute; inset:0;
  background-image: radial-gradient(circle, rgba(124,58,237,.12) 1.4px, transparent 1.6px);
  background-size: 13px 13px; }
.thumb--meo-pastel .face { filter: drop-shadow(0 3px 5px rgba(124,58,237,.25)); position: relative; }

/* ---- thi-la-do · Thi là Đỗ ---- */
.thumb--thi-la-do { background: linear-gradient(135deg,#FEF3C7,#FFE08A); }
.thumb--thi-la-do .conf { position:absolute; font-size:11px; }
.thumb--thi-la-do .c1{ top:8px; left:14px; } .thumb--thi-la-do .c2{ top:12px; right:18px; }
.thumb--thi-la-do .c3{ bottom:10px; left:24px; } .thumb--thi-la-do .c4{ bottom:14px; right:30px; }
.thumb--thi-la-do .core { position:relative; display:flex; align-items:center; gap:7px; }
.thumb--thi-la-do .core .cap2 { font-size:30px; filter: drop-shadow(0 2px 3px rgba(180,120,0,.3)); }
.thumb--thi-la-do .core b { font-family:var(--font-display); font-weight:700; font-size:17px; color:#A16207; letter-spacing:.01em; white-space:nowrap; }

/* ---- mua-thi · Mùa thi 2026 (giấy kẻ ô ly) ---- */
.thumb--mua-thi { background:#FFFDF7;
  background-image: linear-gradient(#E3ECF7 1px, transparent 1px);
  background-size: 100% 16px; }
.thumb--mua-thi::before{ content:""; position:absolute; top:0; bottom:0; left:30px; width:1.5px; background:rgba(232,25,44,.4); }
.thumb--mua-thi .pen { position:relative; font-size:30px; transform: rotate(-12deg); margin-left:14px; }
.thumb--mua-thi .scrib { position:relative; font-family:var(--font-display); font-weight:600; font-size:15px; color:var(--g700); margin-left:10px; }

/* ---- phuong-he · Mùa xa nhau (phượng hè) ---- */
.thumb--phuong-he { background: linear-gradient(160deg,#FFB347,#FF6B6B 60%,#E8192C); }
.thumb--phuong-he .pet { position:absolute; font-size:13px; opacity:.9; }
.thumb--phuong-he .p1{ top:10px; left:18px; } .thumb--phuong-he .p2{ bottom:12px; left:36px; } .thumb--phuong-he .p3{ top:14px; right:22px; }
.thumb--phuong-he .word { position:relative; color:#fff; font-family:var(--font-display); font-weight:700; font-size:18px; letter-spacing:.04em; text-shadow:0 2px 6px rgba(150,20,20,.35); }

/* ---- sticker-co-vn · Sticker scatter + cờ Việt Nam ---- */
.thumb--sticker-co-vn { background:#FFF6E9; }
.thumb--sticker-co-vn span { position:absolute; font-size:22px; }
.thumb--sticker-co-vn .s1{ top:12px; left:20px; transform:rotate(-12deg); font-size:26px; }
.thumb--sticker-co-vn .s2{ top:16px; right:26px; transform:rotate(10deg); }
.thumb--sticker-co-vn .s3{ bottom:10px; left:46px; transform:rotate(8deg); }
.thumb--sticker-co-vn .s4{ bottom:14px; right:22px; transform:rotate(-8deg); font-size:18px; }
.thumb--sticker-co-vn .s5{ top:30px; left:50%; transform:translateX(-50%); font-size:20px; }

/* ---- meo-doc-sach · Mèo đọc sách ---- */
.thumb--meo-doc-sach { background: linear-gradient(135deg,#DBEAFE,#EDF6FF); }
.thumb--meo-doc-sach .duo { position:relative; display:flex; align-items:center; gap:4px; font-size:32px; }
.thumb--meo-doc-sach .lbl { position:absolute; bottom:8px; left:0; right:0; text-align:center; font-family:var(--font-display); font-weight:600; font-size:10px; letter-spacing:.18em; color:var(--blue); }

/* ---- may-mo-mang · Mây mơ màng ---- */
.thumb--may-mo-mang { background: linear-gradient(180deg,#BFE3FF,#E9F6FF); }
.thumb--may-mo-mang .star { position:absolute; font-size:13px; top:12px; right:24px; }
.thumb--may-mo-mang .star2 { position:absolute; font-size:10px; bottom:14px; left:30px; }
.thumb--may-mo-mang .cloud { position:relative; font-size:36px; filter: drop-shadow(0 4px 6px rgba(80,140,200,.25)); }

/* ---- mascot-cheer · Mascot + thoại ---- */
.thumb--mascot-cheer { background: linear-gradient(135deg,#FFE3E6,#FFF0F1); }
.thumb--mascot-cheer .cat { position:relative; }
.thumb--mascot-cheer .bubble { position:absolute; top:12px; right:14px; background:#fff; border-radius:12px 12px 12px 3px;
  padding:5px 9px; font-size:10px; font-weight:700; color:var(--red); box-shadow:0 3px 8px rgba(232,25,44,.15); }

/* ============================================================
   PHOTO-BASED · ảnh hoa phượng thật
   ============================================================ */
.thumb--photo { background-color:#5a0d0d; background-size:cover; background-position:center; }
.thumb--photo .ov-left   { position:absolute; inset:0; background:linear-gradient(90deg, rgba(255,253,248,.94), rgba(255,253,248,0) 64%); }
.thumb--photo .cap-bl    { position:absolute; left:12px; bottom:9px; z-index:1; color:#fff; font-family:var(--font-display); font-weight:700; font-size:15px; letter-spacing:.03em; text-shadow:0 1px 5px rgba(0,0,0,.6); white-space:nowrap; }
.thumb--photo .cap-c     { position:absolute; inset:0; z-index:1; display:flex; align-items:center; justify-content:center; color:#fff; font-family:var(--font-display); font-weight:700; font-size:20px; letter-spacing:.06em; text-shadow:0 2px 7px rgba(0,0,0,.55); }
.thumb--photo .pill-tr   { position:absolute; right:10px; top:9px; z-index:1; background:rgba(255,255,255,.92); color:var(--red); font-family:var(--font-display); font-weight:700; font-size:10px; padding:3px 8px; border-radius:20px; }

/* ============================================================
   DREAMY · hoa phượng + giấy + mộng mơ
   ============================================================ */

/* 1 · phuong-polaroid */
.thumb--phuong-polaroid { background:#EFE5D3;
  background-image:radial-gradient(rgba(90,60,30,.06) 1px,transparent 1.5px); background-size:11px 11px; }
.thumb--phuong-polaroid .pol { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) rotate(-4deg);
  width:116px; background:#fff; padding:5px 5px 0; border-radius:2px; box-shadow:0 6px 15px rgba(60,30,10,.28); }
.thumb--phuong-polaroid .ph  { width:106px; height:44px; background-size:cover; background-position:center; }
.thumb--phuong-polaroid .cap { height:18px; display:flex; align-items:center; justify-content:center;
  font-family:var(--font-display); font-weight:600; font-size:10px; color:#B23A48; letter-spacing:.05em; }
.thumb--phuong-polaroid .tape { position:absolute; left:50%; top:9px; transform:translateX(-50%) rotate(-3deg);
  width:46px; height:14px; background:rgba(255,205,150,.6); box-shadow:0 1px 2px rgba(0,0,0,.08); z-index:2; }

/* 2 · phuong-ep */
.thumb--phuong-ep { background:#FCF8EE; background-image:repeating-linear-gradient(#FCF8EE 0 15px,#DCE8F4 15px 16px); }
.thumb--phuong-ep::before { content:""; position:absolute; top:0; bottom:0; left:22px; width:1.5px; background:rgba(232,25,44,.32); }
.thumb--phuong-ep .ph { position:absolute; right:18px; top:50%; transform:translateY(-50%) rotate(2deg);
  width:128px; height:60px; background-size:cover; background-position:center; box-shadow:0 4px 11px rgba(40,20,10,.24); }
.thumb--phuong-ep .ph .m { position:absolute; width:15px; height:15px; }
.thumb--phuong-ep .ph .tl { top:0; left:0; background:linear-gradient(135deg,rgba(55,35,15,.6) 0 50%,transparent 50%); }
.thumb--phuong-ep .ph .br { right:0; bottom:0; background:linear-gradient(315deg,rgba(55,35,15,.6) 0 50%,transparent 50%); }
.thumb--phuong-ep .date { position:absolute; left:7px; top:50%; transform:translateY(-50%) rotate(-90deg); transform-origin:center;
  font-family:var(--font-display); font-weight:600; font-size:8.5px; color:var(--g500); letter-spacing:.1em; white-space:nowrap; }

/* 3 · phuong-mong */
.thumb--phuong-mong { background-size:cover; background-position:center; background-color:#5a0d0d; }
.thumb--phuong-mong .wash { position:absolute; inset:0; background:linear-gradient(140deg,rgba(170,140,255,.45),rgba(255,170,205,.32) 50%,rgba(255,220,175,.34)); mix-blend-mode:screen; }
.thumb--phuong-mong .leak { position:absolute; inset:0; background:radial-gradient(130px 95px at 84% 16%,rgba(255,255,255,.9),transparent 70%); }
.thumb--phuong-mong .vig  { position:absolute; inset:0; box-shadow:inset 0 0 28px 11px rgba(255,246,250,.5); }

/* 4 · phuong-postcard */
.thumb--phuong-postcard { background:linear-gradient(135deg,#F1E7FF,#FFE3EC 55%,#FFEAD4); display:flex; align-items:center; justify-content:center; }
.thumb--phuong-postcard .card2 { width:194px; height:62px; background:#FFFDF7; border-radius:3px;
  box-shadow:0 6px 16px rgba(90,40,60,.2); display:grid; grid-template-columns:80px 1fr; overflow:hidden; transform:rotate(-1.5deg); }
.thumb--phuong-postcard .ph { background-size:cover; background-position:center; }
.thumb--phuong-postcard .right { position:relative; padding:9px 9px 0 10px; }
.thumb--phuong-postcard .stamp { position:absolute; right:8px; top:7px; width:19px; height:23px;
  background-size:cover; background-position:center; border:2px solid #fff; box-shadow:0 0 0 1px #e7dbc4; }
.thumb--phuong-postcard .lines span { display:block; height:2.6px; border-radius:2px; background:#E4D5C2; margin-top:6px; }
.thumb--phuong-postcard .lines .l1 { width:46%; } .thumb--phuong-postcard .lines .l2 { width:64%; } .thumb--phuong-postcard .lines .l3 { width:38%; }

/* 5 · phuong-washi */
.thumb--phuong-washi { background:#F6EFE0; background-image:radial-gradient(rgba(150,110,60,.1) 1px,transparent 1.5px); background-size:12px 12px; }
.thumb--phuong-washi .ph { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) rotate(-2.5deg);
  width:148px; height:58px; background-size:cover; background-position:center; background-color:#fff;
  border:4px solid #fff; box-shadow:0 5px 13px rgba(50,25,10,.26); }
.thumb--phuong-washi .tape { position:absolute; width:48px; height:15px; opacity:.82; }
.thumb--phuong-washi .t1 { left:22px; top:8px; transform:rotate(-26deg); background:repeating-linear-gradient(45deg,#FF9FB2 0 5px,#FFC2CE 5px 10px); }
.thumb--phuong-washi .t2 { right:20px; bottom:8px; transform:rotate(-26deg); background:repeating-linear-gradient(45deg,#9FC8FF 0 5px,#C2DCFF 5px 10px); }

/* 6 · phuong-tem */
.thumb--phuong-tem { background:#E9DFC9; background-image:radial-gradient(rgba(120,90,50,.1) 1px,transparent 1.5px); background-size:10px 10px; display:flex; align-items:center; justify-content:center; }
.thumb--phuong-tem .stamp { --r:4.5px; position:relative; padding:6px; background:#fff; transform:rotate(-3deg); filter:drop-shadow(0 4px 9px rgba(50,25,10,.28));
  -webkit-mask:
    radial-gradient(var(--r) at 50% 0,#0000 96%,#000) 0 calc(var(--r)*-1)/calc(var(--r)*2.4) 100%,
    radial-gradient(var(--r) at 50% 100%,#0000 96%,#000) 0 var(--r)/calc(var(--r)*2.4) 100%,
    radial-gradient(var(--r) at 0 50%,#0000 96%,#000) calc(var(--r)*-1) 0/100% calc(var(--r)*2.4),
    radial-gradient(var(--r) at 100% 50%,#0000 96%,#000) var(--r) 0/100% calc(var(--r)*2.4);
  -webkit-mask-composite:source-in,source-in,source-in;
  mask:
    radial-gradient(var(--r) at 50% 0,#0000 96%,#000) 0 calc(var(--r)*-1)/calc(var(--r)*2.4) 100%,
    radial-gradient(var(--r) at 50% 100%,#0000 96%,#000) 0 var(--r)/calc(var(--r)*2.4) 100%,
    radial-gradient(var(--r) at 0 50%,#0000 96%,#000) calc(var(--r)*-1) 0/100% calc(var(--r)*2.4),
    radial-gradient(var(--r) at 100% 50%,#0000 96%,#000) var(--r) 0/100% calc(var(--r)*2.4);
  mask-composite:intersect; }
.thumb--phuong-tem .ph { width:120px; height:52px; background-size:cover; background-position:center; outline:1px solid rgba(0,0,0,.06); }

/* 7 · phuong-window */
.thumb--phuong-window { background-size:cover; background-position:center; background-color:#5a0d0d; }
.thumb--phuong-window .paper { position:absolute; inset:0; background:#F7F0E2;
  background-image:radial-gradient(rgba(90,60,30,.05) 1px,transparent 1.5px); background-size:11px 11px;
  -webkit-mask:radial-gradient(circle 32px at 50% 50%,#0000 98%,#000); mask:radial-gradient(circle 32px at 50% 50%,#0000 98%,#000); }
.thumb--phuong-window .ring { position:absolute; left:50%; top:50%; width:64px; height:64px; transform:translate(-50%,-50%); border-radius:50%;
  box-shadow:0 2px 9px rgba(60,30,10,.3),inset 0 1px 4px rgba(0,0,0,.18); }
.thumb--phuong-window .petal { position:absolute; width:7px; height:9px; background:#E8413B; border-radius:60% 60% 60% 0; opacity:.85; }
.thumb--phuong-window .p1 { top:13px; left:30px; transform:rotate(20deg); } .thumb--phuong-window .p2 { bottom:14px; right:34px; transform:rotate(-30deg); }

/* 8 · phuong-may */
.thumb--phuong-may { background:linear-gradient(180deg,#CDE5FF 0%,#E7D8FF 46%,#FFE2EC 100%); overflow:hidden; }
.thumb--phuong-may .hill { position:absolute; left:0; right:0; bottom:0; height:40px; background-size:cover; background-position:center 30%;
  -webkit-mask:linear-gradient(0deg,#000 55%,transparent); mask:linear-gradient(0deg,#000 55%,transparent); opacity:.9; }
.thumb--phuong-may .cloud { position:absolute; background:rgba(255,255,255,.75); border-radius:50%; filter:blur(4px); }
.thumb--phuong-may .c1 { width:42px; height:16px; top:12px; left:24px; } .thumb--phuong-may .c2 { width:30px; height:12px; top:22px; right:30px; }
.thumb--phuong-may .sp { position:absolute; color:#fff; font-size:9px; opacity:.9; } .thumb--phuong-may .sp1 { top:10px; right:54px; } .thumb--phuong-may .sp2 { top:30px; left:40px; font-size:7px; }
.thumb--phuong-may .petal { position:absolute; width:6px; height:8px; background:#F0584E; border-radius:60% 60% 60% 0; opacity:.85; filter:blur(.3px); }
.thumb--phuong-may .mp1 { top:18px; left:60px; transform:rotate(25deg); } .thumb--phuong-may .mp2 { top:34px; right:46px; transform:rotate(-20deg); } .thumb--phuong-may .mp3 { top:46px; left:96px; transform:rotate(40deg); }

/* ============================================================
   PROVINCE THUMBS · ảnh địa danh tỉnh thành (3 khung tái dùng)
   Dùng: <div class="thumb pthumb pthumb--<frame>" style="background-image:url(...)">…</div>
   Ảnh: Wikimedia Commons (Special:FilePath) — CC BY-SA / PD
   ============================================================ */
.v10p .pthumb { width:100%; height:100%; border-radius:inherit; position:relative; overflow:hidden;
  background-size:cover; background-position:center; background-color:#1d2b3a;
  font-family:var(--font-display); user-select:none; display:block; }

/* tag pill (góc trên phải) + nhãn tên tỉnh — dùng chung scrim/tint */
.v10p .pthumb .pv-tag { position:absolute; right:9px; top:9px; z-index:3;
  background:rgba(255,255,255,.94); color:var(--red); font-family:var(--font-display);
  font-weight:700; font-size:9px; letter-spacing:.04em; padding:3px 8px; border-radius:20px;
  box-shadow:0 1px 4px rgba(0,0,0,.18); white-space:nowrap; }

/* ---- Frame 1 · scrim (mặc định) ---- */
.pthumb--scrim .pv-name { position:absolute; left:11px; bottom:9px; z-index:2; color:#fff;
  font-family:var(--font-display); font-weight:700; font-size:16px; letter-spacing:.01em;
  text-shadow:0 1px 6px rgba(0,0,0,.65); display:flex; align-items:center; gap:6px; max-width:92%;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.pthumb--scrim .pv-name::before { content:""; flex:0 0 auto; width:7px; height:7px; border-radius:50%;
  background:var(--red); box-shadow:0 0 0 2px rgba(255,255,255,.55); }

/* ---- Frame 2 · tint (wash đỏ thương hiệu) ---- */
.pthumb--tint .pv-center { position:absolute; inset:0; z-index:2; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:4px; color:#fff; text-align:center; padding:0 10px; }
.pthumb--tint .pv-center .pv-eyebrow { font-family:var(--font-display); font-size:8px; font-weight:700;
  letter-spacing:.22em; opacity:.95; text-shadow:0 1px 3px rgba(0,0,0,.35); }
.pthumb--tint .pv-center b { font-family:var(--font-display); font-weight:700; font-size:20px;
  letter-spacing:.01em; line-height:1; text-shadow:0 2px 8px rgba(0,0,0,.4); }
.pthumb--tint .pv-center .pv-rule { width:26px; height:2px; border-radius:2px; background:rgba(255,255,255,.85); margin-top:2px; }

/* ---- Frame 3 · bar (thanh caption trắng) ---- */
.pthumb--bar { background:#fff; display:flex; flex-direction:column; }
.pthumb--bar .pv-photo { flex:1; min-height:0; background-size:cover; background-position:center; }
.pthumb--bar .pv-strip { flex:0 0 auto; height:26px; display:flex; align-items:center; gap:7px;
  padding:0 10px; background:#fff; border-top:2px solid var(--red); }
.pthumb--bar .pv-strip .pv-dot { flex:0 0 auto; width:7px; height:7px; border-radius:50%; background:var(--red); }
.pthumb--bar .pv-strip b { font-family:var(--font-display); font-weight:700; font-size:13px; color:var(--g800);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.pthumb--bar .pv-strip small { margin-left:auto; flex:0 0 auto; font-family:var(--font-display);
  font-weight:700; font-size:8.5px; color:var(--red); letter-spacing:.08em; }

/* ============================================================
   vao10-2026.css — Trang "Đề chính thức vào lớp 10 năm 2026"
   Áp dụng mẫu D · sổ tay scrapbook + thanh A–Z dọc + thẻ to/nhỏ.
   Dùng chung biến màu/font của styles.css. CHỈ môn Tiếng Anh.
   ============================================================ */

/* nền scrapbook chấm bi cho cả trang */
.v10p { font-family: var(--font);
  background:
    radial-gradient(circle at 1px 1px, rgba(120,80,40,.10) 1px, transparent 1.6px) 0 0/18px 18px,
    linear-gradient(160deg, #FFF7EE 0%, #FFF0F2 55%, #F3ECFF 100%);
  min-height: 100vh; }

/* breadcrumb */
.v10p-crumb { max-width: 1120px; margin: 0 auto; padding: 20px 32px 0;
  display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--g500); flex-wrap: wrap; }
.v10p-crumb a { color: var(--g600); text-decoration: none; }
.v10p-crumb a:hover { color: var(--red); }
.v10p-crumb .sep { color: var(--g300); }
.v10p-crumb .cur { color: var(--red); font-weight: 600; }

/* hero (scrapbook) */
.D-hero { max-width: 1120px; margin: 0 auto; padding: 26px 32px 14px; text-align: center; position: relative; }
.D-hero .tag { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-display);
  font-weight: 600; font-size: 13px; color: var(--red); background: #fff; padding: 7px 16px;
  border-radius: 999px; border: 1.5px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A; }
.D-hero h1 { font-family: var(--font-display); font-weight: 700; font-size: 42px; letter-spacing: -1px;
  color: #1A1A1A; margin: 18px 0 8px; line-height: 1.05; }
.D-hero h1 em { font-style: normal; color: var(--red); }
.D-hero p { font-size: 15.5px; color: var(--g600); max-width: 520px; margin: 0 auto; line-height: 1.6; }
.D-controls { display: flex; gap: 12px; align-items: center; justify-content: center;
  margin-top: 22px; flex-wrap: wrap; }

/* ô tìm kiếm (lọc client-side) */
.v10-search { display: flex; align-items: center; gap: 10px; background: #fff;
  border: 1.5px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A; border-radius: 999px;
  padding: 11px 18px; max-width: 380px; width: 100%; transition: box-shadow .15s; }
.v10-search .icon { color: var(--g400); width: 18px; height: 18px; flex-shrink: 0; }
.v10-search input { flex: 1; min-width: 0; border: none; outline: none; background: transparent;
  font-size: 15px; color: var(--dark); }
.v10-search input::placeholder { color: var(--g400); }
.v10-search:focus-within { box-shadow: 4px 4px 0 #1A1A1A; }
.v10-search-x { display: none; width: 22px; height: 22px; border-radius: 50%; background: var(--g100);
  color: var(--g500); font-size: 10px; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.v10-search-x:hover { background: var(--g200); color: var(--dark); }

/* body: thanh A–Z dọc + lưới mosaic */
.D-body { max-width: 1120px; margin: 0 auto; padding: 6px 32px 48px;
  display: grid; grid-template-columns: auto 1fr; gap: 20px; align-items: start; }
.D-rail { position: sticky; top: 76px; align-self: start; display: flex; flex-direction: column; gap: 5px;
  background: #fff; border: 1.5px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A; border-radius: 14px;
  padding: 8px 7px; max-height: calc(100vh - 92px); overflow: auto; scrollbar-width: none; }
.D-rail::-webkit-scrollbar { display: none; }
.D-rail a { width: 30px; height: 27px; display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-weight: 700; font-size: 13px; color: #1A1A1A;
  border-radius: 8px; text-decoration: none; transition: background .14s, color .14s; }
.D-rail a.on:hover { background: var(--red); color: #fff; }
.D-rail a.off { opacity: .28; pointer-events: none; }

/* lưới mosaic: thẻ to/nhỏ xen kẽ, dense lấp khoảng trống */
.D-grid { margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 150px; grid-auto-flow: dense; gap: 16px; }
.D-tile { background: #fff; border: 1.5px solid #1A1A1A; border-radius: 18px; overflow: hidden;
  box-shadow: 4px 4px 0 #1A1A1A; position: relative; transition: transform .16s, box-shadow .16s;
  display: flex; flex-direction: column; text-decoration: none; color: inherit; scroll-margin-top: 88px; cursor: pointer; }
.D-tile:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #1A1A1A; }
.D-tile.big { grid-column: span 2; grid-row: span 2; }
.D-tile.wide { grid-column: span 2; }
.D-tile-thumb { flex: 1; min-height: 0; position: relative; }
.D-tile-thumb .thumb, .D-tile-thumb .pthumb { border-radius: 0; }
.D-tape { position: absolute; top: -9px; left: 50%; transform: translateX(-50%) rotate(-3deg);
  width: 64px; height: 20px; background: repeating-linear-gradient(45deg,#FFD27A 0 6px,#FFE6B0 6px 12px);
  opacity: .92; z-index: 4; box-shadow: 0 1px 3px rgba(0,0,0,.12); }
.D-tile-cap { padding: 10px 14px; display: flex; align-items: center; justify-content: space-between;
  gap: 8px; background: #fff; border-top: 1.5px dashed var(--g200); }
.D-tile-cap .nm { font-family: var(--font-display); font-weight: 600; font-size: 15px; color: #1A1A1A;
  line-height: 1.1; }
.D-tile.big .D-tile-cap .nm { font-size: 22px; }
.D-tile-cap .ct { font-size: 11.5px; color: var(--g500); margin-top: 2px; }
.D-tile-cap .go { color: var(--red); font-weight: 700; font-size: 12px; flex-shrink: 0; }
.D-sticker { position: absolute; z-index: 5; font-size: 22px; }
.D-tile.big .D-sticker { font-size: 30px; }
.D-badge-do { position: absolute; top: 10px; right: 10px; z-index: 5; transform: rotate(7deg);
  font-family: var(--font-display); font-weight: 700; font-size: 11px; color: #fff; background: var(--red);
  padding: 4px 11px; border-radius: 999px; box-shadow: 2px 2px 0 #1A1A1A; }

/* trạng thái "Sắp thi" (đề 2026 chưa diễn ra) */
.D-tile.is-upcoming { border-style: dashed; }
.D-badge-soon { position: absolute; top: 10px; right: 10px; z-index: 5; transform: rotate(6deg);
  font-family: var(--font-display); font-weight: 700; font-size: 11px; color: #fff; background: var(--orange);
  padding: 4px 11px; border-radius: 999px; box-shadow: 2px 2px 0 #1A1A1A; }

/* empty state */
.v10-empty { grid-column: 1 / -1; text-align: center; padding: 56px 20px; }
.v10-empty-ico { font-size: 38px; }
.v10-empty-t { font-family: var(--font-display); font-weight: 600; font-size: 18px; color: var(--dark); margin-top: 8px; }
.v10-empty-s { font-size: 14px; color: var(--g500); margin-top: 6px; }

/* responsive */
@media (max-width: 860px) {
  .D-hero h1 { font-size: 32px; }
  .D-body { grid-template-columns: 1fr; }
  .D-rail { position: static; flex-direction: row; flex-wrap: wrap; justify-content: center; }
  .D-grid { grid-template-columns: repeat(2, 1fr); }
  .D-tile.big { grid-column: span 2; grid-row: span 2; }
  .D-tile.wide { grid-column: span 2; }
}
@media (max-width: 520px) {
  .D-grid { grid-template-columns: 1fr 1fr; grid-auto-rows: 132px; }
  .D-tile.big, .D-tile.wide { grid-column: span 2; }
  .D-tile.big { grid-row: span 2; }
}

/* ============================================================
   DARK MODE — giữ vibe "giấy" nhưng tông tối, chữ sáng
   ============================================================ */
html[data-theme="dark"] .v10p {
  background:
    radial-gradient(circle at 1px 1px, rgba(255,255,255,.05) 1px, transparent 1.6px) 0 0/18px 18px,
    linear-gradient(160deg, #14151D 0%, #181019 55%, #121420 100%); }
html[data-theme="dark"] .D-hero h1 { color: var(--g800); }
html[data-theme="dark"] .D-hero .tag { background: var(--g100); border-color: #000; box-shadow: 3px 3px 0 #000; }
html[data-theme="dark"] .v10-search { background: var(--g100); border-color: #000; box-shadow: 3px 3px 0 #000; }
html[data-theme="dark"] .v10-search input { color: var(--g800); }
html[data-theme="dark"] .D-rail { background: var(--g100); border-color: #000; box-shadow: 3px 3px 0 #000; }
html[data-theme="dark"] .D-rail a { color: var(--g700); }
html[data-theme="dark"] .D-tile { background: var(--g100); border-color: #000; box-shadow: 4px 4px 0 #000; }
html[data-theme="dark"] .D-tile:hover { box-shadow: 6px 6px 0 #000; }
html[data-theme="dark"] .D-tile-cap { background: var(--g100); border-top-color: var(--g300); }
html[data-theme="dark"] .D-tile-cap .nm { color: var(--g800); }


/* ---- FE additions: ảnh thumbnail override từ CMS (lấp đầy .D-tile-thumb) ---- */
.v10p .v10-thumb-img { width:100%; height:100%; object-fit:cover; display:block; border-radius:inherit; }

/* ============================================================
   FAQ — câu hỏi thường gặp (scrapbook accordion). Đẩy SEO.
   Port từ design vao10-2026.css · CHỈ môn Tiếng Anh.
   ============================================================ */
.D-faq { max-width: 880px; margin: 8px auto 0; padding: 8px 32px 64px; }
.D-faq-head { text-align: center; margin-bottom: 26px; }
.D-faq-kicker { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-display);
  font-weight: 600; font-size: 12.5px; color: var(--purple); background: #fff;
  padding: 6px 14px; border-radius: 999px; border: 1.5px solid #1A1A1A; box-shadow: 3px 3px 0 #1A1A1A; }
.D-faq-head h2 { font-family: var(--font-display); font-weight: 700; font-size: 30px; letter-spacing: -.5px;
  color: #1A1A1A; margin: 16px 0 8px; line-height: 1.12; }
.D-faq-head h2 em { font-style: normal; color: var(--red); }
.D-faq-head p { font-size: 14.5px; color: var(--g600); max-width: 520px; margin: 0 auto; line-height: 1.6; }

.D-faq-list { display: flex; flex-direction: column; gap: 14px; }
.D-faq-item { background: #fff; border: 1.5px solid #1A1A1A; border-radius: 16px; overflow: hidden;
  box-shadow: 4px 4px 0 #1A1A1A; transition: box-shadow .16s, transform .16s; }
.D-faq-item:hover { transform: translate(-1px,-1px); box-shadow: 5px 5px 0 #1A1A1A; }
.D-faq-q { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 18px 20px; background: none; border: none; cursor: pointer; text-align: left;
  font-family: var(--font-display); font-weight: 600; font-size: 16px; color: #1A1A1A; line-height: 1.35; }
.D-faq-mark { position: relative; flex-shrink: 0; width: 24px; height: 24px; border-radius: 7px;
  background: var(--red-light); border: 1.5px solid var(--red); transition: transform .2s; }
.D-faq-mark::before, .D-faq-mark::after { content: ""; position: absolute; top: 50%; left: 50%;
  width: 11px; height: 2px; background: var(--red); border-radius: 2px;
  transform: translate(-50%,-50%); transition: opacity .2s; }
.D-faq-mark::after { transform: translate(-50%,-50%) rotate(90deg); }
.D-faq-item.is-open .D-faq-mark { transform: rotate(180deg); background: var(--red); }
.D-faq-item.is-open .D-faq-mark::before { background: #fff; }
.D-faq-item.is-open .D-faq-mark::after { opacity: 0; }
.D-faq-a { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .26s ease; }
.D-faq-item.is-open .D-faq-a { grid-template-rows: 1fr; }
.D-faq-a-inner { overflow: hidden; }
.D-faq-a p { margin: 0; padding: 14px 20px 20px; font-size: 14.5px; line-height: 1.65; color: var(--g600);
  border-top: 1.5px dashed var(--g200); }

/* FAQ dark mode */
html[data-theme="dark"] .D-faq-kicker { background: var(--g100); border-color: #000; box-shadow: 3px 3px 0 #000; }
html[data-theme="dark"] .D-faq-head h2 { color: var(--g800); }
html[data-theme="dark"] .D-faq-item { background: var(--g100); border-color: #000; box-shadow: 4px 4px 0 #000; }
html[data-theme="dark"] .D-faq-item:hover { box-shadow: 5px 5px 0 #000; }
html[data-theme="dark"] .D-faq-q { color: var(--g800); }
html[data-theme="dark"] .D-faq-a p { border-top-color: var(--g300); color: var(--g600); }
`;
