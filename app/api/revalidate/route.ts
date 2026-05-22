import { revalidateTag } from "next/cache";

const ALLOWED_TAGS = new Set(["mega-menu-kho-de"]);

export async function POST(req: Request) {
  const secret = req.headers.get("x-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");
  if (!tag) {
    return Response.json({ error: "tag required" }, { status: 400 });
  }
  if (!ALLOWED_TAGS.has(tag)) {
    return Response.json({ error: "tag not allowed" }, { status: 400 });
  }
  revalidateTag(tag);
  return Response.json({ revalidated: true, tag });
}
