import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_RL = 'https://api.manishek.ir/rl';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Force HTTPS in production (Cloudflare "Always Use HTTPS" does the same
  // at the edge; this is a code-level fallback so it works everywhere).
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') || '';
  const isLocal = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  if (proto === 'http' && !isLocal) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = 'https:';
    return NextResponse.redirect(httpsUrl, 308);
  }

  // Block /api root
  if (pathname === '/api' || pathname === '/api/') {
    return new NextResponse(null, { status: 404 });
  }

  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';

  // Check rate limit via backend (database-backed, works across all isolates)
  try {
    const ac = new AbortController();
    const tid = setTimeout(() => ac.abort(), 800);

    const res = await fetch(BACKEND_RL, {
      headers: { 'CF-Connecting-IP': ip },
      signal: ac.signal,
    });

    clearTimeout(tid);

    if (res.status === 429) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '60', 'Content-Type': 'text/plain' },
      });
    }
  } catch {
    // Backend unreachable → fail open
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
};
