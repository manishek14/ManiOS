import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block /api root
  if (pathname === '/api' || pathname === '/api/') {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  // Remove identifying headers
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');

  return response;
}

export const config = {
  matcher: ['/:path*', '/api/:path*'],
};
