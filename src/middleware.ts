import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_RL_URL = 'https://api.manishek.ir/rl';

// In-memory fallback per-isolate (survives backend timeout)
const localCounter = new Map<string, { count: number; resetTime: number }>();
const LOCAL_LIMIT = 30;
const LOCAL_WINDOW_MS = 10_000;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /api root
  if (pathname === '/api' || pathname === '/api/') {
    return new NextResponse(null, { status: 404 });
  }

  // Get client IP
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';

  // ── Layer 1: Fast local check (per-isolate, ~0ms) ──
  const now = Date.now();
  let local = localCounter.get(ip);
  if (!local || now > local.resetTime) {
    localCounter.set(ip, { count: 1, resetTime: now + LOCAL_WINDOW_MS });
  } else {
    local.count++;
    if (local.count > LOCAL_LIMIT) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '10', 'Content-Type': 'text/plain' },
      });
    }
  }

  // ── Layer 2: Backend DB check (shared across all instances, ~200ms) ──
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const rlRes = await fetch(BACKEND_RL_URL, {
      method: 'GET',
      headers: {
        'X-Forwarded-For': ip,
        'CF-Connecting-IP': ip,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (rlRes.status === 429) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '120',
          'Content-Type': 'text/plain',
        },
      });
    }
  } catch {
    // Backend unreachable / timeout → fail open (don't block legit users)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
};
