// ─── Design Tokens ───────────────────────────────────────────
// Every value referenced from components. No hardcoded magic numbers.

export const tokens = {
  // ── Color System ──
  color: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    accent: {
      cyan: '#67e8f9',
      violet: '#a78bfa',
      blue: '#60a5fa',
    },
    glass: {
      white: 'rgba(255, 255, 255, 0.08)',
      whiteStrong: 'rgba(255, 255, 255, 0.12)',
      whiteSubtle: 'rgba(255, 255, 255, 0.04)',
      border: 'rgba(255, 255, 255, 0.1)',
      borderStrong: 'rgba(255, 255, 255, 0.2)',
    },
    aurora: {
      blue: '#1e40af',
      indigo: '#4338ca',
      purple: '#7c3aed',
      cyan: '#06b6d4',
      violet: '#8b5cf6',
    },
    surface: {
      dark: '#030712',
      darkElevated: '#0a0f1e',
      darkCard: 'rgba(15, 23, 42, 0.6)',
    },
  },

  // ── Typography ──
  font: {
    display: "'Grand Hotel', cursive",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSize: {
    hero: { base: '3rem', md: '4.5rem', lg: '6rem' },
    h1: { base: '2.25rem', md: '3rem', lg: '3.75rem' },
    h2: { base: '1.875rem', md: '2.25rem', lg: '2.75rem' },
    h3: { base: '1.25rem', md: '1.5rem', lg: '1.75rem' },
    body: { base: '0.9375rem', md: '1rem' },
    caption: { base: '0.8125rem', md: '0.875rem' },
    small: '0.75rem',
  },

  fontWeight: {
    display: 400,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.1,
    snug: 1.25,
    normal: 1.6,
    relaxed: 1.75,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.2em',
  },

  // ── Spacing ──
  spacing: {
    section: { base: '5rem', md: '7rem', lg: '10rem' },
    sectionX: { base: '1.25rem', md: '2rem', lg: '5rem' },
    card: '1.5rem',
    cardGap: '1.25rem',
    element: '0.75rem',
  },

  // ── Glass ──
  glass: {
    blur: {
      sm: 'blur(8px)',
      md: 'blur(16px)',
      lg: 'blur(24px)',
      xl: 'blur(40px)',
    },
    backdrop: 'blur(16px) saturate(180%)',
    backdropStrong: 'blur(24px) saturate(200%)',
    noise:
      'url("data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.03%22/%3E%3C/svg%3E")',
  },

  // ── Border Radius ──
  radius: {
    sm: '0.375rem',
    md: '0.625rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // ── Shadows ──
  shadow: {
    glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glassLift: '0 16px 48px rgba(0, 0, 0, 0.4)',
    glow: '0 0 20px rgba(99, 102, 241, 0.3)',
    glowStrong: '0 0 40px rgba(99, 102, 241, 0.4)',
    card: '0 4px 16px rgba(0, 0, 0, 0.2)',
  },

  // ── Motion ──
  motion: {
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.6,
      cinematic: 1.0,
      loading: 2.0,
    },
    ease: {
      smooth: [0.25, 0.1, 0.25, 1] as const,
      spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
      springBouncy: { type: 'spring' as const, stiffness: 400, damping: 20 },
      springGentle: { type: 'spring' as const, stiffness: 150, damping: 20 },
      out: [0.16, 1, 0.3, 1] as const,
    },
    stagger: {
      fast: 0.04,
      normal: 0.08,
      slow: 0.12,
    },
  },

  // ── Layout ──
  layout: {
    maxWidth: '1280px',
    navbarHeight: '4rem',
    dotNavWidth: '3rem',
  },

  // ── Z-Index ──
  zIndex: {
    background: -1,
    base: 0,
    card: 10,
    dotNav: 40,
    navbar: 50,
    modal: 60,
    loading: 100,
    tooltip: 70,
  },
} as const;

export type DesignTokens = typeof tokens;