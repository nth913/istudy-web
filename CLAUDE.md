# istudy-web — Frontend Instructions

Next 15 App Router frontend cho iStudy931. Repo `istudy-web/` thuộc monorepo `/Users/Apple/pj/istudy931/`.

## Stack

- Next.js ^15.5.0 (App Router, TypeScript)
- React ^19.0.0
- Static HTML mockup tham khảo: `../design/` + `../design2/`
- Data source: istudy-cms API qua REST/GraphQL (sau khi P0 Task 1+ scaffold)
- Types: `@istudy/types` npm package (sau khi `type-sdk-syncer` run lần đầu)

## Commands

```bash
pnpm dev      # port 3000 (next dev -p 3000)
pnpm build    # next build
pnpm start    # production server
pnpm lint     # next lint
```

LƯU Ý: istudy-cms dev đã chuyển sang port 3131. istudy-web giữ port 3000. Chạy đồng thời 2 repo không conflict.

## Deployment

- **Host:** Vercel (auto-deploy từ branch push)
- **Production domain:** `aistudy.com.vn`
- **Branding:** thương hiệu hiển thị là `istudy`, domain thật là `aistudy.com.vn` (giữ nguyên khi sửa copy/footer/watermark)

## Folder Layout (current)

```
app/
  page.tsx                  # landing
  layout.tsx                # root layout
  globals.css               # global styles
  kho-de-thi/               # kho đề list/filter
  de-thi-chi-tiet/          # exam detail (preview pre-attempt)
  lam-bai/                  # attempt UI (timer, question render)
  ket-qua/                  # result page (score, review answers)
  dap-an/                   # answer key view
  bai-viet/                 # blog list
  bai-viet-chi-tiet/        # blog post detail
components/
  Header.tsx
  MegaMenu.tsx              # hybrid hardcode + CMS fetch
  Countdown.tsx
  Footer.tsx
  Icons.tsx
lib/
  (utilities)
```

Pages spec: `../docs/design/01-pages-inventory.md`.

## Page Map (per `01-pages-inventory.md`)

| Route | Status | Purpose |
|---|---|---|
| `/` | mockup done | Landing + featured |
| `/kho-de-thi` | mockup | Filter + list đề |
| `/de-thi-chi-tiet/[slug]` | mockup | Preview + start attempt CTA |
| `/lam-bai/[attemptId]` | mockup | Timer + question render typed Block |
| `/ket-qua/[attemptId]` | mockup | Score + answer review |
| `/dap-an/[slug]` | mockup | Answer key public |
| `/bai-viet` | mockup | Blog list |
| `/bai-viet-chi-tiet/[slug]` | mockup | Post detail |

## Critical Rules

- **Mega menu hybrid:** structure hardcode trong `components/MegaMenu.tsx` (không gọi `mega_menus` collection — collection bị drop). CMS chỉ fetch dynamic blocks: `featured exams`, `live exams`, `popular tags`, `CTA banner`. Spec: `../docs/design/04-header-mega-menu.md` + memory `project_mega_menu_hybrid_2026_05_13`
- **Draft preview middleware:** role-based check. User có `role=admin|editor` được xem `_status=draft` exam/post (qua query param `?preview=1` hoặc cookie session). User thường chỉ thấy `published`. Implement middleware tại `middleware.ts` (sẽ tạo M-A). Memory `project_review_workflow_2026_05_13`
- **Question render:** typed Block polymorphic. 13 dạng câu hỏi (single-choice, multi-choice, true-false, short-answer, essay, ordering, matching, fill-blank, audio, image-hotspot, formula, drag-drop, table). Render component theo `block.type`. Spec: `../docs/design/02-question-types.md`
- **PDF watermark FE:** PDF render qua PDF.js. Overlay watermark canvas-side với text từ `user.email` + `'aistudy.com.vn'` + `Date.now()`. KHÔNG dùng PDF backend đã burn (PDF backend bao giờ cũng nguyên). Memory `project_backend_decisions_2026_05_12` — Update lần 3
- **Data contract:** mọi API response từ istudy-cms theo `../docs/design/03-fe-data-contract.md`. Type imports từ `@istudy/types`. KHÔNG inline type interfaces — sửa CMS schema rồi `type-sdk-syncer` regen
- **i18n:** copy tiếng Việt thuần (không hỗ trợ EN switch P0-P4). UI string trực tiếp trong JSX, defer i18n framework đến khi có nhu cầu thực

## API Calls

- Base URL từ env: `process.env.NEXT_PUBLIC_CMS_URL` (default `http://localhost:3000` dev, `https://cms.istudy.vn` prod)
- Fetch pattern: Server Components dùng `fetch()` với `next: { revalidate: N }`. Client Components dùng SWR hoặc fetch wrapper
- Auth: cookie session từ CMS (cùng domain hoặc CORS-allowed subdomain)
- Error: render fallback UI, log Sentry; KHÔNG expose stack trace ra UI

## Docs References

- `../docs/design/01-pages-inventory.md` — pages list + state
- `../docs/design/02-question-types.md` — 13 dạng câu hỏi
- `../docs/design/03-fe-data-contract.md` — API response shape
- `../docs/design/04-header-mega-menu.md` — header + mega menu spec
- `../docs/architecture/04-api-contract.md` — CMS API contract (source of truth)
- `../design/` + `../design2/` — static HTML mockup (tham khảo design system + spacing)

## Subagent Catalog

Dispatch qua `Agent` tool, `subagent_type=<name>`. Definitions tại `.claude/agents/`:

| Agent | Status | Role |
|---|---|---|
| `design-porter` | ready | Port HTML mockup (design/, design2/, /tmp/design-pkg/) → Next App Router page + `lib/page-css/<page>.ts` |
| `nextjs-component` | ready | Shared components (Header/Footer/MegaMenu/Countdown/Icons), `lib/mega-menu-data.ts`, routing, layout, middleware |
| `nextjs-developer` | ready | Page architecture: RSC/Client boundary, streaming, data fetching, rendering strategy |
| `architect-reviewer` | ready | Macro-level review (read-only): folder layout, separation of concerns, tech debt audit |
| `refactoring-specialist` | ready | Safe refactor TSX/CSS: dead code, prop chain simplify, extract component, no behavior change |

Decision tree:
- "port trang X từ design", "sync page với design v2" → `design-porter`
- "sửa Header/Footer/MegaMenu", "restructure mega menu", "thêm nav item" → `nextjs-component`
- "architect new page với RSC/Client split", "design data fetching", "render strategy", "wire middleware" → `nextjs-developer`
- "review kiến trúc", "đánh giá folder layout", "tech debt audit" → `architect-reviewer`
- "refactor", "extract component", "xoá code chết", "simplify prop drilling" → `refactoring-specialist`
- Backend subagents (`payload-builder`, `devops`, …) → định nghĩa tại `../istudy-cms/.claude/agents/`, dispatch từ istudy-cms cwd

### Skills + Subagent dispatch (hybrid pattern)

5 agent FE đều có `Skill` tool. Agent file có section `## Recommended skills` liệt kê skill phù hợp default.

Dispatch convention:
- **Layer 2 (default)**: prompt kết bằng dòng `Use skills: <name1>, <name2>.` để force subagent invoke (chống skip).
- **Layer 3 (high-stakes)**: parent invoke skill trước, paste curated chunk + project override vào prompt khi task chạm kiến trúc / SEO / data contract.

Skill cài project-level tại `.agents/skills/` + symlink `.claude/skills/`. Skill `seo-audit` thuộc istudy-web. Skill `content-creation` thuộc root `/Users/Apple/pj/istudy931/`.

## Don't

- KHÔNG fetch `_status=draft` ngầm cho user thường — leak content
- KHÔNG hardcode mega menu structure ngoài `lib/mega-menu-data.ts` (single source per memory `project_mega_menu_hybrid_2026_05_13`)
- KHÔNG render PDF backend chưa overlay watermark FE (privacy)
- KHÔNG inline `@istudy/types` interfaces — luôn import
- KHÔNG dùng port 3000 nếu istudy-cms dev cùng lúc — đổi `next dev -p 3001`
- KHÔNG amend commits đã push (giữ convention dù chưa có remote)
- KHÔNG dispatch subagent `payload-builder` / `devops` từ repo này — agents định nghĩa tại `../istudy-cms/.claude/agents/`, dispatch từ istudy-cms cwd
