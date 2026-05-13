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

LƯU Ý: dev server cùng port 3000 với istudy-cms admin. Khi chạy đồng thời phải đổi 1 trong 2 (vd: cms port 3001).

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
- **PDF watermark FE:** PDF render qua PDF.js. Overlay watermark canvas-side với text từ `user.email` + `'istudy.vn'` + `Date.now()`. KHÔNG dùng PDF backend đã burn (PDF backend bao giờ cũng nguyên). Memory `project_backend_decisions_2026_05_12` — Update lần 3
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

## Don't

- KHÔNG fetch `_status=draft` ngầm cho user thường — leak content
- KHÔNG hardcode mega menu structure ngoài `components/MegaMenu.tsx` (đảm bảo single source)
- KHÔNG render PDF backend chưa overlay watermark FE (privacy)
- KHÔNG inline `@istudy/types` interfaces — luôn import
- KHÔNG dùng port 3000 nếu istudy-cms dev cùng lúc — đổi `next dev -p 3001`
- KHÔNG amend commits đã push (giữ convention dù chưa có remote)
- KHÔNG dispatch subagent `payload-builder` / `devops` từ repo này — agents định nghĩa tại `../istudy-cms/.claude/agents/`, dispatch từ istudy-cms cwd
