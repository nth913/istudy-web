/**
 * Lightweight Lexical → JSX renderer for Payload's default richText editor.
 *
 * Supports: root, paragraph, heading (h2/h3 only — h4+ rendered as h4),
 * list (number/bullet), listitem, quote (rendered as styled .callout),
 * text with bold/italic/underline/strike/code formats, linebreak.
 *
 * Heading nodes also extract a kebab-case id so the TOC can deep-link.
 */
import type { ReactElement, ReactNode } from "react";
import type { LexNode } from "@/lib/api/posts";

const FMT = {
  BOLD: 1,
  ITALIC: 2,
  STRIKE: 4,
  UNDERLINE: 8,
  CODE: 16,
} as const;

export interface TocHeading {
  id: string;
  label: string;
  level: 2 | 3 | 4;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function textContent(node: LexNode): string {
  if (node.type === "text") return node.text || "";
  if (!node.children) return "";
  return node.children.map(textContent).join("");
}

export function extractToc(root: LexNode | null | undefined): TocHeading[] {
  if (!root || !root.children) return [];
  const seen = new Map<string, number>();
  const out: TocHeading[] = [];
  for (const node of root.children) {
    if (node.type !== "heading") continue;
    const lvl = node.tag === "h2" ? 2 : node.tag === "h3" ? 3 : 4;
    const label = textContent(node).trim();
    if (!label) continue;
    const baseId = slugify(label) || "muc";
    const count = (seen.get(baseId) ?? 0) + 1;
    seen.set(baseId, count);
    const id = count === 1 ? baseId : `${baseId}-${count}`;
    out.push({ id, label, level: lvl as 2 | 3 | 4 });
  }
  return out;
}

function renderText(node: LexNode, key: string | number): ReactNode {
  let el: ReactNode = node.text || "";
  const f = typeof node.format === "number" ? node.format : 0;
  if (f & FMT.CODE) el = <code key={`c-${key}`}>{el}</code>;
  if (f & FMT.STRIKE) el = <s key={`s-${key}`}>{el}</s>;
  if (f & FMT.UNDERLINE) el = <u key={`u-${key}`}>{el}</u>;
  if (f & FMT.ITALIC) el = <em key={`i-${key}`}>{el}</em>;
  if (f & FMT.BOLD) el = <strong key={`b-${key}`}>{el}</strong>;
  return <span key={key}>{el}</span>;
}

function renderInline(children: LexNode[] | undefined): ReactNode[] {
  if (!children) return [];
  return children.map((c, i) => {
    if (c.type === "text") return renderText(c, i);
    if (c.type === "linebreak") return <br key={i} />;
    if (c.type === "link") {
      return (
        <a key={i} href={(c as { url?: string }).url || "#"}>
          {renderInline(c.children)}
        </a>
      );
    }
    return null;
  });
}

interface RenderOpts {
  // Tracks heading id assignments mirroring extractToc so ids match.
  seen: Map<string, number>;
}

function nextHeadingId(label: string, opts: RenderOpts): string {
  const baseId = slugify(label) || "muc";
  const count = (opts.seen.get(baseId) ?? 0) + 1;
  opts.seen.set(baseId, count);
  return count === 1 ? baseId : `${baseId}-${count}`;
}

function renderNode(
  node: LexNode,
  key: string | number,
  opts: RenderOpts,
): ReactElement | null {
  switch (node.type) {
    case "paragraph": {
      const kids = renderInline(node.children);
      if (kids.length === 0) return null;
      return <p key={key}>{kids}</p>;
    }

    case "heading": {
      const lvl = node.tag === "h2" ? 2 : node.tag === "h3" ? 3 : 4;
      const label = textContent(node).trim();
      const id = nextHeadingId(label, opts);
      const Comp = (`h${lvl}` as unknown) as "h2" | "h3" | "h4";
      return (
        <Comp key={key} id={id}>
          {renderInline(node.children)}
        </Comp>
      );
    }

    case "list": {
      const items = (node.children || []).map((li, i) => (
        <li key={i}>{renderListItemChildren(li.children, opts)}</li>
      ));
      if (node.listType === "number" || node.tag === "ol") {
        return <ol key={key}>{items}</ol>;
      }
      return <ul key={key}>{items}</ul>;
    }

    case "quote": {
      // Styled callout — uses .callout from bai-viet-chi-tiet CSS.
      return (
        <div key={key} className="callout callout--quote">
          <span className="ico" aria-hidden="true">
            💬
          </span>
          <div className="b">
            {(node.children || []).map((c, i) => renderNode(c, i, opts))}
          </div>
        </div>
      );
    }

    default:
      // Unknown block — try to render children inline as a fallback.
      if (node.children && node.children.length > 0) {
        return <p key={key}>{renderInline(node.children)}</p>;
      }
      return null;
  }
}

function renderListItemChildren(
  children: LexNode[] | undefined,
  opts: RenderOpts,
): ReactNode {
  if (!children) return null;
  // A list item may contain bare text nodes (inline) and/or block nodes
  // (nested lists, paragraphs). Group runs of inline children into a span so
  // block children can still flow underneath.
  const out: ReactNode[] = [];
  let inlineBuf: LexNode[] = [];
  const flush = (i: number) => {
    if (inlineBuf.length > 0) {
      out.push(<span key={`inl-${i}`}>{renderInline(inlineBuf)}</span>);
      inlineBuf = [];
    }
  };
  children.forEach((c, i) => {
    if (c.type === "text" || c.type === "linebreak" || c.type === "link") {
      inlineBuf.push(c);
    } else {
      flush(i);
      const node = renderNode(c, i, opts);
      if (node) out.push(node);
    }
  });
  flush(children.length);
  return out;
}

export function RichText({ root }: { root: LexNode | null | undefined }) {
  if (!root || !root.children) return null;
  const opts: RenderOpts = { seen: new Map() };
  return (
    <>
      {root.children.map((node, i) => renderNode(node, i, opts))}
    </>
  );
}
