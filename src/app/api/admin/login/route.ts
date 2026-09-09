import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side admin login.
 * Credentials live ONLY in server env vars (Cloudflare Worker secrets):
 *   ADMIN_USER, ADMIN_PASSWORD, ADMIN_SESSION_SECRET (optional)
 * On success, sets an HttpOnly signed session cookie (HMAC-SHA256, 8h).
 * The plain password never reaches the client bundle.
 */

const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_SECONDS = 8 * 60 * 60; // 8 hours

function b64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function strToB64url(s: string): string {
  return b64url(new TextEncoder().encode(s));
}

async function hmacSign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return b64url(new Uint8Array(sig));
}

export async function POST(request: NextRequest) {
  const user = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASSWORD;

  if (!user || !password) {
    return NextResponse.json(
      { message: 'Admin credentials are not configured on the server' },
      { status: 503 },
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  const { username, password: pass } = body;
  if (username !== user || pass !== password) {
    return NextResponse.json(
      { message: 'نام کاربری یا رمز عبور اشتباه است' },
      { status: 401 },
    );
  }

  // Build signed session token: <payload-b64url>.<hmac-b64url>
  const secret = process.env.ADMIN_SESSION_SECRET || `manios-session::${password}`;
  const payload = strToB64url(
    JSON.stringify({ u: username, exp: Date.now() + SESSION_TTL_SECONDS * 1000 }),
  );
  const sig = await hmacSign(payload, secret);
  const token = `${payload}.${sig}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
