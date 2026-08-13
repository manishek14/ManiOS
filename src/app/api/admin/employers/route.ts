import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://api.manishek.ir';

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/employers`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch employers' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Backend connection failed' },
      { status: 502 }
    );
  }
}
