import { revalidatePath, revalidateTag } from "next/cache";

const ALLOWED_TAGS = new Set([
  "mega-menu-kho-de",
  "exams-list",
  "exams-sidebar-facets",
]);
const EXAM_TAG_PATTERN = /^exam:[a-z0-9-]+$/;
const ALLOWED_PATH_PREFIXES = [
  "/bai-viet",
  "/kho-de-thi",
  "/de-thi-chi-tiet",
];

function checkSecret(req: Request): boolean {
  const secret =
    req.headers.get("x-secret") ?? req.headers.get("x-revalidate-secret");
  return Boolean(secret && secret === process.env.REVALIDATE_SECRET);
}

function isAllowedTag(t: string): boolean {
  return ALLOWED_TAGS.has(t) || EXAM_TAG_PATTERN.test(t);
}

function isAllowedPath(p: string): boolean {
  return ALLOWED_PATH_PREFIXES.some(
    (pre) => p === pre || p.startsWith(`${pre}/`) || p.startsWith(`${pre}-`),
  );
}

export async function POST(req: Request) {
  if (!checkSecret(req)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const queryTag = url.searchParams.get("tag");

  let body: { tags?: unknown; paths?: unknown } | null = null;
  try {
    body = (await req.json()) as { tags?: unknown; paths?: unknown } | null;
  } catch {
    body = null;
  }

  const tags: string[] = [];
  if (queryTag) tags.push(queryTag);
  if (body && Array.isArray(body.tags)) {
    tags.push(
      ...body.tags.filter((t): t is string => typeof t === "string"),
    );
  }

  const paths: string[] =
    body && Array.isArray(body.paths)
      ? body.paths.filter((p): p is string => typeof p === "string")
      : [];

  if (tags.length === 0 && paths.length === 0) {
    return Response.json(
      { error: "tag or paths required" },
      { status: 400 },
    );
  }

  const acceptedTags: string[] = [];
  const rejectedTags: string[] = [];
  for (const t of tags) {
    if (isAllowedTag(t)) {
      revalidateTag(t);
      acceptedTags.push(t);
    } else {
      rejectedTags.push(t);
    }
  }

  const acceptedPaths: string[] = [];
  const rejectedPaths: string[] = [];
  for (const p of paths) {
    if (isAllowedPath(p)) {
      revalidatePath(p);
      acceptedPaths.push(p);
    } else {
      rejectedPaths.push(p);
    }
  }

  if (acceptedTags.length === 0 && acceptedPaths.length === 0) {
    return Response.json(
      {
        error: tags.length > 0 && paths.length === 0 ? "tag not allowed" : "no allowed paths",
        rejected: rejectedPaths,
        rejectedTags,
      },
      { status: 400 },
    );
  }

  const result: {
    revalidated: true;
    tags?: string[];
    paths?: string[];
    rejected: string[];
    rejectedTags?: string[];
  } = { revalidated: true, rejected: rejectedPaths };
  if (acceptedTags.length > 0) result.tags = acceptedTags;
  if (acceptedPaths.length > 0) result.paths = acceptedPaths;
  if (rejectedTags.length > 0) result.rejectedTags = rejectedTags;
  return Response.json(result);
}
