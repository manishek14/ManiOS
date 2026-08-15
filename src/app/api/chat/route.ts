import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_REPLY = "I'm currently experiencing some issues. Please try again in a moment or reach out directly via email at manishekofteh@gmail.com.";

const BACKEND_CHAT_URL = process.env.BACKEND_URL || 'https://api.manishek.ir';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Forward to backend
    const res = await fetch(`${BACKEND_CHAT_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ reply: data.reply });
    }

    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  } catch (error) {
    console.error('Chat proxy error:', error);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}
