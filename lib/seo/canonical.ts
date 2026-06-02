export function resolveCanonical(
  record: { seo?: { canonicalUrl?: string | null } | null } | null | undefined,
  defaultUrl: string,
): string {
  const o = record?.seo?.canonicalUrl
  return o && o.trim() ? o.trim() : defaultUrl
}
