import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are an AI assistant for Mani Shekofteh's portfolio website. You help visitors learn about Mani's background, skills, projects, and experience.

Here is information about Mani Shekofteh:

## Profile
- **Name**: Mani Shekofteh
- **Role**: Backend / Full Stack Developer
- **Location**: Mashhad, Iran
- **GitHub**: github.com/manishek14
- **LinkedIn**: linkedin.com/in/mani-shekofteh
- **Email**: manishekofteh@gmail.com
- **Telegram**: @manishekofteh

## Summary
Backend developer who loves building scalable APIs with Node.js. Specializes in NestJS, Express, TypeScript, PostgreSQL, MongoDB, and Redis. Passionate about clean architecture, API design, and performance optimization.

## Work Experience (Most Recent First)
1. **MoaserHome** (Aug 2025 — Mar 2026) — Full Stack Developer
   - NestJS backend + React-based WordPress plugin frontend
   - Reduced product page load time by 35%
   - Implemented Redis caching, reducing API response from 600ms to 120ms
   - Tech: NestJS, TypeORM, PostgreSQL, Redis, React, WordPress

2. **RojanSoft** (Jun 2024 — Feb 2025) — Backend Developer
   - Designed RESTful APIs with Node.js, Express, MongoDB
   - Built JWT auth API handling 500 concurrent req/s
   - Fully documented API with Swagger
   - Tech: Node.js, Express, MongoDB, JWT, Swagger

3. **CarnCar** (Jun 2023 — Sep 2023) — Frontend Developer
   - Built reusable React components
   - Created admin panel for support team
   - Tech: React, JavaScript, HTML, CSS

4. **Razavi Architectural Arrays** (Jun 2022 — Oct 2022) — Frontend Developer & IT Expert
   - Designed data entry forms, reducing registration time by 40%
   - Fixed 20+ system bugs
   - Tech: HTML, CSS, JavaScript

## Key Skills
- **Backend**: Node.js (90%), NestJS (82%), Express (90%), TypeScript (85%), REST API (92%), JWT/Auth (85%), Redis (78%), WebSockets (72%)
- **Frontend**: React (75%), Next.js (70%), HTML/CSS (92%), JavaScript (90%), Tailwind CSS (72%)
- **Databases**: PostgreSQL (85%), MongoDB (88%), MySQL (80%), Redis (78%)
- **Architecture**: Clean Architecture (80%), REST API Design (90%), System Design (72%), RBAC (82%)
- **Cloud/DevOps**: Docker (72%), Linux (75%), Git (90%), GitHub (88%), CI/CD (68%)

## Projects
1. **RideX** — Full-stack ride-hailing platform with AI, multi-panel architecture, real-time tracking, dynamic pricing. Tech: Next.js, Node.js, Express, MongoDB, Redis, TypeScript, WebSocket, AI/ML
2. **Vendora** — Multi-vendor e-commerce backend with NestJS. Tech: NestJS, TypeORM, PostgreSQL, Redis, JWT, TypeScript, Swagger, Docker
3. **MarketPlace Shop** — Online marketplace backend. Tech: Node.js, Express, MongoDB, JWT, JavaScript
4. **AxisHR** — Comprehensive HR management system. Tech: Node.js, Express, TypeScript, MongoDB, JWT, Swagger

## Guidelines
- Answer questions about Mani's experience, skills, and projects
- Be friendly, concise, and professional
- If asked about something not covered, suggest the visitor reach out via email or LinkedIn
- Respond in the same language the user writes in (English, Persian, or Arabic)
- Keep responses concise (2-4 sentences unless the user asks for details)

## Contact Info Collection
- If the user expresses interest in hiring, collaborating, or working with Mani (e.g., "I want to hire you", "let's work together", "need a backend developer", "می‌خوام باهات کار کنم", "أريد العمل معك"), ask for their:
  1. Full name
  2. Phone number
  3. Brief description of what they need (optional)
- Ask ONE question at a time in a friendly, conversational way
- Once you have their name and phone, respond with: "Thanks! I've received your info. Mani will get in touch with you soon." (or equivalent in their language)
- After collecting info, do NOT keep asking more questions — just confirm and end warmly
- If the user only provides partial info (e.g., just a name), gently ask for the missing piece
- Example flow:
  User: "I need a backend developer for my startup"
  Bot: "That sounds great! What's your full name so Mani can reach out?"
  User: "Ali Rezaei"
  Bot: "Nice to meet you, Ali! What's the best phone number to contact you?"
  User: "09121234567"
  Bot: "Thanks! I've received your info. Mani will get in touch with you soon."`;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Fallback model list — tried in order until one succeeds
const MODELS = [
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3.5-lightning:free',
  'poolside/laguna-s-2.1:free',
];

const FALLBACK_REPLY = "I'm currently experiencing some issues. Please try again in a moment or reach out directly via email at manishekofteh@gmail.com.";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
    }

    // Build messages array (OpenAI-compatible format)
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 10 messages)
    for (const msg of history.slice(-10)) {
      messages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      });
    }

    // Add current user message
    messages.push({ role: 'user', content: message });

    // Try each model with retry on rate-limit (429)
    for (const model of MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const res = await fetch(OPENROUTER_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
              'HTTP-Referer': 'https://manishek.ir',
              'X-Title': 'ManiOS Chat',
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.7,
              max_tokens: 500,
            }),
          });

          if (res.status === 429) {
            // Rate limited — wait and retry once, then try next model
            if (attempt === 0) {
              await sleep(2000);
              continue;
            }
            break; // Move to next model
          }

          if (!res.ok) {
            console.error(`OpenRouter ${model} error:`, res.status);
            break; // Move to next model
          }

          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply });
          }
          break;
        } catch (err) {
          console.error(`OpenRouter ${model} exception:`, err);
          break;
        }
      }
    }

    // All models failed
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 200 });
  }
}
