import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in-memory Map per worker isolate)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// API route-specific limits
const RATE_LIMITS: Record<string, { maxRequests: number; windowMs: number }> = {
  '/api/chat': { maxRequests: 20, windowMs: 60_000 },
  '/api/contact': { maxRequests: 5, windowMs: 60_000 },
};

function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

function checkRateLimit(
  ip: string,
  path: string,
): { allowed: boolean; limit: number; remaining: number } {
  const config = RATE_LIMITS[path];
  if (!config) {
    return { allowed: true, limit: 0, remaining: 0 };
  }

  const key = `${ip}:${path}`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - 1 };
  }

  if (entry.count >= config.maxRequests) {
    return { allowed: false, limit: config.maxRequests, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, limit: config.maxRequests, remaining: config.maxRequests - entry.count };
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /api root
  if (pathname === '/api' || pathname === '/api/') {
    return new NextResponse(null, { status: 404 });
  }

  // Only apply rate limiting to API routes (pages are cached by Cloudflare)
  const rateLimitPath = Object.keys(RATE_LIMITS).find((p) => pathname.startsWith(p));
  if (rateLimitPath) {
    cleanupRateLimits();

    const ip =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
      'unknown';

    const { allowed, limit, remaining } = checkRateLimit(ip, rateLimitPath);

    if (!allowed) {
      return new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'Retry-After': '60',
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', String(limit));
    response.headers.set('X-RateLimit-Remaining', String(remaining));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
