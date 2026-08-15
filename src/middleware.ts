import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in-memory Map per worker)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// API route-specific limits
const RATE_LIMITS: Record<string, { maxRequests: number; windowMs: number }> = {
  '/api/chat': { maxRequests: 20, windowMs: 60_000 },
  '/api/contact': { maxRequests: 5, windowMs: 60_000 },
};

// Global rate limit for all routes (anti-abuse / DDoS basic protection)
const GLOBAL_LIMIT = { maxRequests: 120, windowMs: 60_000 };

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

function checkGlobalRateLimit(ip: string): boolean {
  const key = `${ip}:global`;
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + GLOBAL_LIMIT.windowMs,
    });
    return true;
  }

  if (entry.count >= GLOBAL_LIMIT.maxRequests) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /api route (health endpoint)
  if (pathname === '/api' || pathname === '/api/') {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  response.headers.set('X-DNS-Prefetch-Control', 'on');

  // Get client IP (Cloudflare Workers uses CF-Connecting-IP)
  const ip =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    'unknown';

  // Global rate limiting for ALL routes
  cleanupRateLimits();
  if (!checkGlobalRateLimit(ip)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Content-Type': 'text/plain',
      },
    });
  }

  // Stricter rate limiting for specific API routes
  const rateLimitPath = Object.keys(RATE_LIMITS).find((p) => pathname.startsWith(p));
  if (rateLimitPath) {
    const { allowed, limit, remaining } = checkRateLimit(ip, rateLimitPath);

    response.headers.set('X-RateLimit-Limit', String(limit));
    response.headers.set('X-RateLimit-Remaining', String(remaining));

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
  }

  return response;
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
};
