import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enkel lösenordsinloggning för /admin.
 *
 * ADMIN_PASSWORD är både lösenordet och nyckeln som signerar sessionskakan,
 * så ett byte av lösenord loggar ut alla direkt. Inga användarkonton.
 */
const COOKIE = "pl_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14;
const MIN_PASSWORD_LENGTH = 10;

function key(): string | null {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return password.length >= MIN_PASSWORD_LENGTH ? password : null;
}

export function adminConfigured() {
  return key() !== null;
}

function sign(payload: string, secret: string) {
  return createHmac("sha256", `parklyckan-admin:${secret}`).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(input: string) {
  const secret = key();
  return secret !== null && safeEqual(input, secret);
}

function verify(value: string) {
  const secret = key();
  if (!secret) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  return safeEqual(signature, sign(expires, secret));
}

export async function isAdmin() {
  const value = (await cookies()).get(COOKIE)?.value;
  return value ? verify(value) : false;
}

/** Anropas först i varje admin-sida, server action och route. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function startSession() {
  const secret = key();
  if (!secret) throw new Error("ADMIN_PASSWORD saknas");
  const expires = String(Date.now() + MAX_AGE_SECONDS * 1000);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires, secret)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}
