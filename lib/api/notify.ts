/**
 * Client-side helpers for the iStudy CMS notify + newsletter endpoints.
 *
 * All requests use `credentials: 'include'` so the CMS Set-Cookie (`anon_id`)
 * persists across submissions — keeping the anonymous identity stable for
 * subsequent like / bookmark interactions.
 */

const CMS = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3131";

export type NotifyType = "exam" | "dap-an" | "feature" | "event";

export async function postNotify(
  type: NotifyType,
  email: string,
  refSlug: string,
  turnstileToken?: string,
): Promise<{ ok: boolean; alreadyExists?: boolean }> {
  const res = await fetch(`${CMS}/api/v1/notify/${type}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, refSlug, turnstileToken }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `notify-${type}-failed`);
  }
  return data as { ok: boolean; alreadyExists?: boolean };
}

export async function postNewsletter(
  email: string,
  source?: string,
  turnstileToken?: string,
): Promise<{ ok: boolean; sent?: boolean; alreadyVerified?: boolean }> {
  const res = await fetch(`${CMS}/api/v1/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, source, turnstileToken }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "newsletter-failed");
  }
  return data as { ok: boolean; sent?: boolean; alreadyVerified?: boolean };
}
