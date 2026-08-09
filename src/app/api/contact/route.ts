import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'https://api.manishek.ir/employers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullname, phone, description } = body;

    if (!fullname || typeof fullname !== 'string' || fullname.trim().length < 3) {
      return NextResponse.json({ message: 'نام کامل باید حداقل ۳ کاراکتر باشد' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ message: 'شماره موبایل الزامی است' }, { status: 400 });
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!/^09[0-9]{9}$/.test(cleanPhone)) {
      return NextResponse.json({ message: 'شماره موبایل معتبر نیست (مثال: 09123456789)' }, { status: 400 });
    }

    if (description && typeof description === 'string' && description.trim().length > 0 && description.trim().length < 10) {
      return NextResponse.json({ message: 'توضیحات باید حداقل ۱۰ کاراکتر باشد' }, { status: 400 });
    }

    // Forward to the real backend (NestJS)
    const backendBody: Record<string, string> = {
      fullName: fullname.trim(),
      phone: cleanPhone,
    };

    if (description && typeof description === 'string' && description.trim().length >= 10) {
      backendBody.description = description.trim();
    }

    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(backendBody),
    });

    const data = await res.json();

    if (!res.ok) {
      // Pass through backend validation errors
      return NextResponse.json(
        { message: data.message || 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ message: 'خطایی رخ داد. لطفاً دوباره تلاش کنید.' }, { status: 500 });
  }
}
