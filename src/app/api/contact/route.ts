import { NextRequest, NextResponse } from 'next/server';

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

    // Log the submission (in production, send email, save to DB, etc.)
    console.log('📋 New contact submission:', {
      fullname: fullname.trim(),
      phone: phone.trim(),
      description: description?.trim() || '(none)',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
