import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://api.manishek.ir/employers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, phone, description } = body;

    if (!fullname || typeof fullname !== 'string' || fullname.trim().length < 2) {
      return NextResponse.json({ error: 'Fullname is required (min 2 chars)' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    if (!/^[+]?[\d\s\-()]{7,15}$/.test(phone.trim())) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    // Forward to the real backend (NestJS)
    const backendBody: Record<string, string> = {
      fullName: fullname.trim(),
      phone: phone.trim(),
    };

    if (description && typeof description === 'string' && description.trim().length >= 10) {
      backendBody.description = description.trim();
    }

    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendBody),
    });

    if (!res.ok) {
      console.error('Backend API error:', res.status, await res.text());
      return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
  }
}
