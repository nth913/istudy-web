# istudy-web Claude Code Subagents

2 specialist subagents for istudy-web project. Dispatch via `Agent` tool with `subagent_type=<name>`.

## Catalog

| Agent | Status | When to use |
|---|---|---|
| [`design-porter`](design-porter.md) | ready | Port HTML mockup (design/, design2/, /tmp/design-pkg/) → Next App Router page + lib/page-css module |
| [`nextjs-component`](nextjs-component.md) | ready | Shared components (Header/Footer/MegaMenu/Countdown/Icons), mega menu data, routing, layout, middleware |

## Decision tree

| Request pattern | Agent |
|---|---|
| "port trang X từ design", "sync page với design v2", "tạo TSX từ file HTML" | `design-porter` |
| "sửa Header", "update Footer", "restructure mega menu", "thêm nav item", "wire link → coming-soon" | `nextjs-component` |
| New page from scratch (no design) | direct edit, no agent |
| API / server action / CMS fetch | not yet — defer until istudy-cms wired |

## Notes

- Both agents inherit model from parent invocation
- Both follow Next 15 + React 19 + App Router conventions
- Per-page CSS belongs in `lib/page-css/<page>.ts`; tokens in `app/globals.css`
- Mega menu structure is single-source in `lib/mega-menu-data.ts` (memory `project_mega_menu_hybrid_2026_05_13`)
