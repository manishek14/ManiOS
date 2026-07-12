<div align="center">

# ManiOS

### A Cinematic Portfolio Experience

**Neo Glassmorphism / Aurora UI / Liquid Glass Design**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer)](https://www.framer.com/motion/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9-black?logo=three.js)](https://docs.pmnd.rs/react-three-fiber)

</div>

---

## Overview

**ManiOS** is an award-winning cinematic portfolio website for [Mani Shekofteh](https://github.com/manishek14) — a backend engineer specializing in Node.js, NestJS, and scalable API design.

The site features a **Neo Glassmorphism** design language with aurora gradient backgrounds, liquid glass panels, magnetic hover effects, and fluid Framer Motion animations — all built on a modern **Next.js 16** stack with full **trilingual support** (English, Persian, Arabic).

---

## Screenshots

| Hero Section | Skills Ecosystem | Project Showcase |
|:---:|:---:|:---:|
| Dark aurora background with cinematic loader and glassmorphic navigation | Categorized skill bars with brand-colored technology icons | Glass cards with gradient covers and live demo links |

---

## Features

### Design System
- **Design Token Architecture** — Centralized tokens for colors, typography, spacing, glass effects, blur, elevation, shadows, and motion curves
- **Neo Glassmorphism / Liquid Glass** — Multi-layered glass panels with configurable opacity, blur, and border glow
- **Aurora Background** — Animated CSS gradient orbs with organic movement and noise overlay
- **Dark/Light Theme** — Full theme support via `next-themes` with smooth transitions
- **Responsive Design** — Mobile-first approach with fluid breakpoints and touch-friendly targets

### Animations & Interactions
- **Cinematic Loader** — Ink-spread text reveal with timed fade-out on first visit
- **Scroll Progress Bar** — Gradient progress indicator at the viewport top
- **Section Fade-Up Animations** — `useInView`-powered entrance animations for every section
- **Magnetic Hover Buttons** — Cursor-following pull effect using `useMotionValue` / `useSpring`
- **Glass Panel Hover Lift** — Subtle elevation on hover with spring-based physics
- **Dot Navigation** — Side-positioned scroll indicator with active section tracking
- **Back-to-Top** — Floating glass circular button with smooth scroll

### Content Sections
- **Hero** — Full-screen introduction with animated name reveal, social links, and CTA buttons
- **About** — Personal story, engineering philosophy, and career aspirations with RTL support
- **Soft Skills** — Interactive panel showcasing communication, leadership, and problem-solving
- **Skills** — 7 categorized skill groups (Backend, Frontend, Databases, Architecture, Cloud/DevOps, AI/Tools, Developer Tools) with animated progress bars and brand-colored SVG icons
- **Projects** — Filterable project showcase (All / Backend / Frontend / Experimental) with glass cards, gradient covers, tech stack tags, and live/code links
- **Experience** — Timeline of professional experience with achievements and tech stacks
- **Contact** — Glassmorphic contact form with email, GitHub, LinkedIn, and Telegram links
- **Resume Modal** — Full-screen resume viewer with language-aware content and PDF download

### AI Features
- **AI Chat Assistant** — Floating chat button with expandable glassmorphic chat window
- **Intelligent Responses** — Context-aware AI that can answer questions about Mani's skills, projects, and experience

### Internationalization (i18n)
- **3 Languages** — English, Persian (Farsi), Arabic
- **RTL Support** — Automatic right-to-left layout for Persian and Arabic
- **Complete Translations** — All UI text, project descriptions, and experience content translated
- **Language Switcher** — Accessible from the navigation bar

### Technical
- **SEO Optimized** — Open Graph, Twitter cards, structured metadata, and `robots.txt`
- **Custom Scrollbar** — Styled thin scrollbar matching the dark theme
- **Accessible** — Semantic HTML, ARIA attributes, keyboard navigation, and screen reader support
- **Performance** — Font optimization with `next/font`, CSS-only aurora animations, and efficient re-renders

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + tw-animate-css |
| **UI Components** | shadcn/ui (New York style) |
| **Animations** | Framer Motion 12 |
| **3D Graphics** | React Three Fiber + Three.js + Drei |
| **Icons** | Lucide React |
| **State Management** | Zustand |
| **Theme** | next-themes |
| **Fonts** | Inter (body) + Grand Hotel (display) via next/font |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # AI chat endpoint
│   │   └── route.ts               # General API
│   ├── globals.css                # Global styles, theme tokens, custom scrollbar
│   ├── layout.tsx                 # Root layout with fonts, theme, providers
│   └── page.tsx                   # Main page composing all sections
├── components/
│   ├── about/
│   │   ├── about-section.tsx      # About me with philosophy & aspirations
│   │   └── soft-skills-panel.tsx  # Interactive soft skills showcase
│   ├── ai-assistant/
│   │   ├── ai-chat-button.tsx     # Floating chat trigger button
│   │   └── ai-chat-window.tsx     # Glassmorphic chat window
│   ├── contact/
│   │   └── contact-section.tsx    # Contact form and social links
│   ├── experience/
│   │   └── experience-section.tsx # Professional experience timeline
│   ├── home/
│   │   ├── hero-section.tsx       # Full-screen hero with CTAs
│   │   └── social-links.tsx       # Social media link buttons
│   ├── loading/
│   │   └── cinematic-loader.tsx   # Animated loading screen
│   ├── navigation/
│   │   ├── dot-navigation.tsx     # Side dot scroll indicator
│   │   └── glass-navbar.tsx       # Glassmorphic top navbar
│   ├── projects/
│   │   └── projects-section.tsx   # Filterable project showcase
│   ├── providers/
│   │   └── app-provider.tsx       # Context providers wrapper
│   ├── resume/
│   │   └── resume-modal.tsx       # Full-screen resume viewer
│   ├── shared/
│   │   ├── aurora-background.tsx  # Animated aurora gradient
│   │   ├── back-to-top.tsx        # Scroll-to-top button
│   │   ├── glass-panel.tsx        # Reusable glass container
│   │   ├── magnetic-button.tsx    # Magnetic hover button
│   │   ├── scroll-progress.tsx    # Top progress bar
│   │   └── section-wrapper.tsx    # Animated section wrapper
│   ├── skills/
│   │   └── skills-section.tsx     # Categorized skill bars
│   └── ui/                        # shadcn/ui component library
├── config/
│   └── design-tokens.ts           # Centralized design system tokens
├── hooks/
│   ├── use-mobile.ts              # Mobile viewport detection
│   └── use-toast.ts               # Toast notification hook
├── i18n/
│   ├── en.json                    # English translations
│   ├── fa.json                    # Persian (Farsi) translations
│   └── ar.json                    # Arabic translations
├── lib/
│   ├── api.ts                     # API utility functions
│   ├── constants.ts               # Skills, projects, experience data
│   ├── db.ts                      # Database client (Prisma)
│   ├── i18n.ts                    # Translation system
│   ├── tech-icons.tsx             # SVG technology icons with brand colors
│   └── utils.ts                   # Utility functions
├── types/
│   └── index.ts                   # TypeScript type definitions
prisma/
│   └── schema.prisma              # Database schema
public/
│   ├── favicon.svg                # Site favicon
│   ├── logo.svg                   # Logo SVG
│   ├── portrait.jpg               # Profile photo
│   ├── resume.pdf                 # Downloadable resume
│   └── robots.txt                 # SEO robots configuration
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/) package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/manishek14/ManiOS.git
cd ManiOS

# Install dependencies
bun install
# or
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Push database schema
bun run db:push

# Start development server
bun run dev
```

The site will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server on port 3000 |
| `bun run build` | Create production build |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint code quality checks |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run database migrations |
| `bun run db:reset` | Reset database |

---

## Design Philosophy

> **"Code should be written for the next person who reads it — and that person might be you, six months from now."**

ManiOS follows a strict design token system where every visual value (color, spacing, blur, shadow, timing) is defined in a centralized `design-tokens.ts` file. No magic numbers. No hardcoded values. Every component references tokens, making the entire design system consistent and maintainable.

The glassmorphism effect is achieved through carefully layered CSS properties:
- **Background**: Semi-transparent white with configurable opacity levels (`default` / `strong` / `subtle`)
- **Backdrop Blur**: 12-20px Gaussian blur for the frosted glass effect
- **Border**: 1px solid white with low opacity for the glass edge
- **Shadow**: Layered box-shadows for depth and elevation
- **Hover**: Spring-based lift animation via Framer Motion

---

## Author

**Mani Shekofteh**

- GitHub: [@manishek14](https://github.com/manishek14)
- LinkedIn: [Mani Shekofteh](https://linkedin.com/in/mani-shekofteh)
- Email: manishekofteh@gmail.com
- Telegram: [@dufdoat](https://t.me/dufdoat)

---

## License

This project is open source and available under the [MIT License](LICENSE).