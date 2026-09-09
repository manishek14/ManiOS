import { NextRequest, NextResponse } from 'next/server';

/**
 * Admin-only proxy to the backend employers list.
 * Requires a valid signed `admin_session` cookie (see ../login/route.ts),
 * then forwards the request with the shared `x-admin-key` secret.
 * Nothing here is reachable without the server-side session.
 */

const BACKEND_URL = process.env.BACKEND_URL || 'https://api.manishek.ir';
const SESSION_COOKIE = 'admin_session';

async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const secret = process.env.ADMIN_SESSION_SECRET || `manios-session::${password}`;

  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const expected = await crypto.subtle.sign('HMAC', key, enc.encode(payload));

  let bin = '';
  for (const b of new Uint8Array(expected)) bin += String.fromCharCode(b);
  const expectedSig = btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

  if (sig.length !== expectedSig.length) return false;

  // Constant-time-ish comparison
  let diff = 0;
  for (let i = 0; i < expectedSig.length; i++) {
    diff |= sig.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  if (diff !== 0) return false;

  try {
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    return typeof json.exp === 'number' && Date.now() < json.exp;
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!(await verifySession(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return NextResponse.json(
      { error: 'ADMIN_API_KEY is not configured on the server' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/employers`, {
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch employers' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Backend connection failed' },
      { status: 502 },
    );
  }
}
