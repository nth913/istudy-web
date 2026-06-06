"use client";

/* ============================================================
   Vao10Client.tsx — render trang "Đề chính thức vào lớp 10 — 2026".
   Mẫu D: sổ tay scrapbook, thanh A–Z dọc, thẻ to/nhỏ mosaic.
   Port hành vi từ design vao10-2026.js (render + tile + wire):
   - tìm kiếm offline client-side (lọc theo tên tỉnh đã bỏ dấu)
   - thanh A–Z cuộn mượt tới mốc chữ cái
   - trạng thái: ready → /de-thi-chi-tiet/<slug>; updating → "Đang cập nhật ^^"
   - FAQ accordion: toggle mở/đóng, nhiều mục mở cùng lúc
   ============================================================ */
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { DEFAULT_THUMB_CONFIG, type ThumbConfig } from "@/lib/vao10/thumbConfig";
import { Vao10ThumbConfigPanel } from "./Vao10ThumbConfigPanel";
import { VAO10_FAQ } from "@/lib/vao10/faq";
import {
  VAO10_YEAR,
  VAO10_ALPHABET,
  VAO10_STICKERS,
  norm,
  sortByName,
  presentLetters,
  sizeFor,
} from "@/lib/vao10/provinces";
import { defaultProvinceThumbHtml } from "@/lib/vao10/exam-thumbs";
import { hrefForMerged, type Vao10MergedProvince } from "@/lib/api/vao10";

const IconArrow = () => (
  <svg className="icon icon-sm" viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const IconSearch = () => (
  <svg className="icon" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

interface TileInfo {
  p: Vao10MergedProvince;
  size: "big" | "wide" | "";
  tape: boolean;
  doBadge: boolean;
  sticker: string | null;
  anchorId: string | null;
  href: string | null;
  updating: boolean;
  provKey: string; // norm(name) cho lọc tìm kiếm
}

export function Vao10Client({ provinces }: { provinces: Vao10MergedProvince[] }) {
  const [query, setQuery] = useState("");
  const [thumbConfig, setThumbConfig] = useState<ThumbConfig>(DEFAULT_THUMB_CONFIG);
  const [showConfig, setShowConfig] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sắp xếp A–Z + tính descriptor mosaic (deterministic, y hệt design).
  const { tiles, present, total, ready } = useMemo(() => {
    const list = sortByName(provinces);
    const present = presentLetters(list);
    const stickers = VAO10_STICKERS;
    let si = 0;
    let lastL = "";
    const tiles: TileInfo[] = list.map((p, idx) => {
      const L = norm(p.name)[0]?.toUpperCase() ?? "";
      const first = L !== lastL;
      lastL = L;
      const size = sizeFor(idx);
      const updating = p.status === "updating";
      let tape = false;
      let doBadge = false;
      let sticker: string | null = null;
      if (size === "big") {
        tape = true;
        if (p.hot) doBadge = true;
      }
      if (idx % 4 === 2 && !size) {
        sticker = stickers[si++ % stickers.length];
      }
      return {
        p,
        size,
        tape,
        doBadge,
        sticker,
        anchorId: first ? `dz-${L}` : null,
        href: hrefForMerged(p),
        updating,
        provKey: norm(p.name),
      };
    });
    const total = list.length;
    const ready = list.filter((p) => p.status === "ready").length;
    return { tiles, present, total, ready };
  }, [provinces]);

  const q = norm(query);
  const visibleCount = q ? tiles.filter((t) => t.provKey.includes(q)).length : tiles.length;

  function scrollToLetter(e: React.MouseEvent, letter: string) {
    e.preventDefault();
    const target = document.getElementById(`dz-${letter}`);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function clearSearch() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div
      className="v10p"
      style={{
        "--thumb-saturate": thumbConfig.saturate,
        "--thumb-contrast": thumbConfig.contrast,
        "--thumb-brightness": thumbConfig.brightness,
        "--thumb-scrim-strength": thumbConfig.scrimStrength,
        "--thumb-tint-strength": thumbConfig.tintStrength,
        "--thumb-photo-veil": thumbConfig.photoVeil,
      } as React.CSSProperties}
    >
      <nav className="v10p-crumb" aria-label="breadcrumb">
        <Link href="/">Trang chủ</Link>
        <span className="sep">›</span>
        <Link href="/kho-de-thi">Kho đề thi</Link>
        <span className="sep">›</span>
        <Link href="/kho-de-thi?cat=vao-10">Đề thi vào lớp 10</Link>
        <span className="sep">›</span>
        <span className="cur">Đề chính thức {VAO10_YEAR}</span>
      </nav>

      <header className="D-hero">
        <span className="tag">📒 Đề chính thức · Tuyển sinh vào lớp 10</span>
        <h1>
          Tổng hợp đề vào 10 <em>Tiếng Anh chính thức {VAO10_YEAR}</em>
          <br />
          của 34 tỉnh thành
        </h1>
        <p>
          Đề tuyển sinh môn Tiếng Anh do Sở GD&amp;ĐT công bố — {ready}/{total} tỉnh đã có đề, kèm đáp
          án &amp; làm bài online. Kéo thanh A–Z bên cạnh để nhảy tới tỉnh của bạn.
        </p>
        <div className="D-controls">
          <div className="v10-search">
            <IconSearch />
            <input
              ref={inputRef}
              type="search"
              placeholder="Tìm tỉnh/thành của bạn…"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="v10-search-x"
              aria-label="Xoá"
              style={{ display: query ? "flex" : "none" }}
              onClick={clearSearch}
            >
              ✕
            </button>
          </div>
        </div>
      </header>

      <div className="D-body">
        <nav
          className="D-rail"
          aria-label="Nhảy theo bảng chữ cái"
          style={{ display: query ? "none" : undefined }}
        >
          {VAO10_ALPHABET.map((c) =>
            present.includes(c) ? (
              <a key={c} className="on" href={`#dz-${c}`} onClick={(e) => scrollToLetter(e, c)}>
                {c}
              </a>
            ) : (
              <a key={c} className="off" aria-hidden="true">
                {c}
              </a>
            ),
          )}
        </nav>

        <div className="D-grid">
          {tiles.map((t) => (
            <Tile key={t.p.name} t={t} hidden={!!q && !t.provKey.includes(q)} />
          ))}
          <div className="v10-empty" hidden={visibleCount !== 0}>
            <div className="v10-empty-ico">🔍</div>
            <div className="v10-empty-t">Không tìm thấy tỉnh/thành phù hợp</div>
            <div className="v10-empty-s">Thử nhập tên khác — vd: Hà Nội, Nghệ An, Cần Thơ</div>
          </div>
        </div>
      </div>
      <FaqSection />
      {/* ---- Thumbnail color config panel (dev tool) ---- */}
      <button
        aria-label="Mở bảng chỉnh màu ảnh"
        onClick={() => setShowConfig((s) => !s)}
        style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 9998,
          width: 40, height: 40, borderRadius: "50%",
          background: "#fff", border: "1.5px solid #1A1A1A",
          boxShadow: "3px 3px 0 #1A1A1A", cursor: "pointer",
          fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        🎨
      </button>
      {showConfig && (
        <Vao10ThumbConfigPanel
          config={thumbConfig}
          onChange={setThumbConfig}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
}

function Tile({ t, hidden }: { t: TileInfo; hidden: boolean }) {
  const { p } = t;
  const cls = `D-tile ${t.size}${t.updating ? " is-upcoming" : ""}`.trim();
  const badge = t.updating ? (
    <span className="D-badge-soon">Đang cập nhật ^^</span>
  ) : t.doBadge ? (
    <span className="D-badge-do">Thi là Đỗ</span>
  ) : null;
  const caption = t.updating ? "Đang cập nhật ^^" : `Đề ${VAO10_YEAR} · ${p.q} câu · ${p.time}`;

  const inner = (
    <>
      {t.tape && <span className="D-tape" />}
      {badge}
      {t.sticker && (
        <span className="D-sticker" style={{ top: 8, right: 12 }}>
          {t.sticker}
        </span>
      )}
      {p.thumbnailUrl ? (
        <div className="D-tile-thumb">
          <img src={p.thumbnailUrl} alt="" loading="lazy" decoding="async" className="v10-thumb-img" />
        </div>
      ) : (
        /* thumb design phải là CON TRỰC TIẾP của .D-tile-thumb (height:100% mới đúng) */
        <div className="D-tile-thumb" dangerouslySetInnerHTML={{ __html: defaultProvinceThumbHtml(p) }} />
      )}
      <div className="D-tile-cap">
        <div>
          <div className="nm">{p.name}</div>
          <div className="ct">{caption}</div>
        </div>
        {!t.updating && (
          <span className="go">
            <IconArrow />
          </span>
        )}
      </div>
    </>
  );

  const style = hidden ? { display: "none" } : undefined;

  // ready → link sang trang đề; updating → không click được
  if (t.href) {
    return (
      <Link href={t.href} id={t.anchorId ?? undefined} className={cls} data-prov={t.provKey} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <div id={t.anchorId ?? undefined} className={cls} data-prov={t.provKey} style={style} aria-disabled="true">
      {inner}
    </div>
  );
}

function FaqSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

  function toggleItem(i: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section className="D-faq" aria-labelledby="faq-title">
      <div className="D-faq-head">
        <span className="D-faq-kicker">❓ Hỏi &amp; Đáp</span>
        <h2 id="faq-title">
          Câu hỏi thường gặp về <em>đề vào 10 môn Tiếng Anh</em>
        </h2>
        <p>
          Những thắc mắc phổ biến của học sinh &amp; phụ huynh về kỳ thi tuyển sinh vào lớp 10 môn
          Tiếng Anh năm 2026.
        </p>
      </div>
      <div className="D-faq-list">
        {VAO10_FAQ.map((f, i) => {
          const isOpen = openItems.has(i);
          return (
            <div key={i} className={`D-faq-item${isOpen ? " is-open" : ""}`}>
              <button
                className="D-faq-q"
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggleItem(i)}
              >
                <span>{f.q}</span>
                <span className="D-faq-mark" aria-hidden="true" />
              </button>
              <div className="D-faq-a">
                <div className="D-faq-a-inner">
                  {/* dangerouslySetInnerHTML vì f.a chứa HTML entities (&amp;, cursive quotes) từ design */}
                  <p dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
