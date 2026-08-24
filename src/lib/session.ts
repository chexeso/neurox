import { cookies } from "next/headers";
import { prisma } from "./db";
import { randomBytes } from "crypto";

const COOKIE = "nx_session";
const GUEST = "nx_guest";

function sessionDays() {
  return 14;
}

function cookieBase() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

export async function createSession(userId: string, meta?: { userAgent?: string; ip?: string }) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + sessionDays() * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
      userAgent: meta?.userAgent,
      ip: meta?.ip,
    },
  });
  const jar = await cookies();
  jar.set(COOKIE, token, {
    ...cookieBase(),
    expires: expiresAt,
  });
  return token;
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  jar.set(COOKIE, "", { ...cookieBase(), expires: new Date(0) });
}

export async function destroyAllSessions(userId: string) {
  await prisma.session.deleteMany({ where: { userId } });
  const jar = await cookies();
  jar.set(COOKIE, "", { ...cookieBase(), expires: new Date(0) });
}

export async function getCurrentUser() {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return null;
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: { include: { role: true } } },
    });
    if (!session || session.expiresAt < new Date() || !session.user.isActive) {
      return null;
    }
    return session.user;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");
  if (user.role.name !== "ADMIN" && user.role.name !== "SUPERADMIN") {
    throw new Error("FORBIDDEN");
  }
  return user;
}

export async function getGuestId() {
  const jar = await cookies();
  let id = jar.get(GUEST)?.value;
  if (!id) {
    id = randomBytes(16).toString("hex");
    try {
      jar.set(GUEST, id, {
        ...cookieBase(),
        maxAge: 60 * 60 * 24 * 180,
      });
    } catch {
      // Setting cookies from some Server Component renders can fail —
      // API routes will set the cookie on the next cart request.
    }
  }
  return id;
}

/** Ensure guest cookie is written in a Route Handler response-safe way */
export async function ensureGuestCookie() {
  return getGuestId();
}
