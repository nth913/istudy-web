import { revalidatePath, revalidateTag } from "next/cache";

const ALLOWED_TAGS = new Set(["mega-menu-kho-de"]);
const ALLOWED_PATH_PREFIXES = ["/bai-viet"];

function checkSecret(req: Request): boolean {
  const secret = req.headers.get("x-secret") ?? req.headers.get("x-revalidate-secret");
  return Boolean(secret && secret === process.env.REVALIDATE_SECRET);
}

function isAllowedPath(p: string): boolean {
  return ALLOWED_PATH_PREFIXES.some((pre) => p === pre || p.startsWith(`${pre}/`) || p.startsWith(`${pre}-`));
}

export async function POST(req: Request) {
  if (!checkSecret(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");

  // Mode 1: tag-based invalidation (?tag=...)
  if (tag) {
    if (!ALLOWED_TAGS.has(tag)) {
      return Response.json({ error: "tag not allowed" }, { status: 400 });
    }
    revalidateTag(tag);
    return Response.json({ revalidated: true, tag });
  }

  // Mode 2: path-based invalidation (body { paths: [...] })
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const paths = Array.isArray((body as { paths?: unknown })?.paths)
    ? ((body as { paths: unknown[] }).paths.filter((p): p is string => typeof p === "string"))
    : [];

  if (paths.length === 0) {
    return Response.json({ error: "tag or paths required" }, { status: 400 });
  }

  const rejected: string[] = [];
  const accepted: string[] = [];
  for (const p of paths) {
    if (isAllowedPath(p)) {
      revalidatePath(p);
      accepted.push(p);
    } else {
      rejected.push(p);
    }
  }
  if (accepted.length === 0) {
    return Response.json({ error: "no allowed paths", rejected }, { status: 400 });
  }
  return Response.json({ revalidated: true, paths: accepted, rejected });
}
