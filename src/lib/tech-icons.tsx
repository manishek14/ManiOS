'use client';

import React, { useState, memo } from 'react';

// ─── Technology Brand Colors ──────────────────────────────────
export const TECH_COLORS: Record<string, string> = {
  'Node.js': '#339933',
  'NestJS': '#E0234E',
  'Express': '#E5E7EB',
  'TypeScript': '#3178C6',
  'REST API': '#818cf8',
  'JWT / Auth': '#818cf8',
  'Redis': '#DC382D',
  'WebSockets': '#818cf8',
  'React': '#61DAFB',
  'Next.js': '#E5E7EB',
  'HTML & CSS': '#E34F26',
  'JavaScript': '#F7DF1E',
  'Tailwind CSS': '#06B6D4',
  'Redux': '#764ABC',
  'Bootstrap': '#7952B3',
  'Three.js': '#E5E7EB',
  'PostgreSQL': '#4169E1',
  'MongoDB': '#47A248',
  'MySQL': '#4479A1',
  'SQL Server': '#CC2927',
  'SQL': '#336791',
  'SQLite': '#0078D4',
  'Clean Architecture': '#a78bfa',
  'REST API Design': '#818cf8',
  'System Design': '#a78bfa',
  'RBAC': '#f472b6',
  'PBAC': '#22d3ee',
  'Caching Strategies': '#818cf8',
  'API Documentation': '#22d3ee',
  'Docker': '#2496ED',
  'Linux': '#FCC624',
  'Git': '#F05032',
  'GitHub': '#E5E7EB',
  'CI/CD': '#818cf8',
  'Deployment': '#22d3ee',
  'ChatGPT': '#E5E7EB',
  'Claude': '#D97757',
  'Cursor': '#E5E7EB',
  'GitHub Copilot': '#818cf8',
  'VS Code': '#007ACC',
  'Postman': '#FF6C37',
  'Swagger': '#85EA2D',
  'Unit Testing': '#22d3ee',
};

// ─── Simple Icons CDN Mapping (official brand logos) ─────────
const SIMPLE_ICONS: Record<string, { slug: string; color: string }> = {
  'Node.js': { slug: 'nodedotjs', color: '339933' },
  'NestJS': { slug: 'nestjs', color: 'E0234E' },
  'Express': { slug: 'express', color: 'E5E7EB' },
  'TypeScript': { slug: 'typescript', color: '3178C6' },
  'React': { slug: 'react', color: '61DAFB' },
  'Next.js': { slug: 'nextdotjs', color: 'E5E7EB' },
  'HTML & CSS': { slug: 'html5', color: 'E34F26' },
  'JavaScript': { slug: 'javascript', color: 'F7DF1E' },
  'Tailwind CSS': { slug: 'tailwindcss', color: '06B6D4' },
  'Redux': { slug: 'redux', color: '764ABC' },
  'Bootstrap': { slug: 'bootstrap', color: '7952B3' },
  'Three.js': { slug: 'threedotjs', color: 'E5E7EB' },
  'PostgreSQL': { slug: 'postgresql', color: '4169E1' },
  'MongoDB': { slug: 'mongodb', color: '47A248' },
  'MySQL': { slug: 'mysql', color: '4479A1' },
  'SQL Server': { slug: 'microsoftsqlserver', color: 'CC2927' },
  'SQLite': { slug: 'sqlite', color: '0078D4' },
  'Docker': { slug: 'docker', color: '2496ED' },
  'Linux': { slug: 'linux', color: 'FCC624' },
  'Git': { slug: 'git', color: 'F05032' },
  'GitHub': { slug: 'github', color: 'E5E7EB' },
  'ChatGPT': { slug: 'openai', color: 'E5E7EB' },
  'Claude': { slug: 'anthropic', color: 'D97757' },
  'Cursor': { slug: 'cursor', color: 'E5E7EB' },
  'GitHub Copilot': { slug: 'githubcopilot', color: '818CF8' },
  'VS Code': { slug: 'visualstudiocode', color: '007ACC' },
  'Postman': { slug: 'postman', color: 'FF6C37' },
  'Swagger': { slug: 'swagger', color: '85EA2D' },
};

const CDN_BASE = 'https://cdn.simpleicons.org';

// ─── CDN Icon Component (with fallback) ──────────────────────
const CdnIcon = memo(function CdnIcon({
  name,
  slug,
  color,
  size,
}: {
  name: string;
  slug: string;
  color: string;
  size: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackDot color={color} size={size} />;
  }

  return (
    <img
      src={`${CDN_BASE}/${slug}/${color}`}
      alt={name}
      width={size}
      height={size}
      className="shrink-0"
      loading="lazy"
      decoding="async"
      style={{ filter: `drop-shadow(0 0 3px #${color}44)` }}
      onError={() => setFailed(true)}
    />
  );
});

// ─── Fallback Colored Dot ─────────────────────────────────────
function FallbackDot({ color, size }: { color: string; size: number }) {
  return (
    <span
      className="shrink-0 rounded-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: `#${color}`,
        boxShadow: `0 0 6px #${color}66`,
      }}
    />
  );
}

// ─── Concept Icons (generic/non-brand technologies) ──────────
function ConceptIcon({
  name,
  color,
  size,
}: {
  name: string;
  color: string;
  size: number;
}) {
  const sw = 1.5;

  switch (name) {
    case 'REST API':
    case 'REST API Design':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h10M4 18h16" />
          <circle cx="18" cy="12" r="2" />
        </svg>
      );
    case 'JWT / Auth':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="12" r="2.5" />
          <path d="M14 10l3 2-3 2" />
        </svg>
      );
    case 'WebSockets':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 8h12l-3-3M20 16H8l3 3" />
          <circle cx="6" cy="8" r="1.5" fill={color} stroke="none" />
          <circle cx="18" cy="16" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    case 'SQL':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
          <path d="M12 2C7 2 3 3.5 3 5.5v13c0 2 4 3.5 9 3.5s9-1.5 9-3.5v-13C21 3.5 17 2 12 2zm0 2c4 0 7 1 7 2s-3 2-7 2-7-1-7-2 3-2 7-2zM5 8.5c1.5.9 4 1.5 7 1.5s5.5-.6 7-1.5v3c0 1-3 2-7 2s-7-1-7-2v-3zm0 6c1.5.9 4 1.5 7 1.5s5.5-.6 7-1.5v4c0 1-3 2-7 2s-7-1-7-2v-4z" />
        </svg>
      );
    case 'Clean Architecture':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'System Design':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="8" y="14" width="8" height="7" rx="1" />
          <path d="M6.5 10v1.5a2.5 2.5 0 005 0V10M17.5 10v1.5a2.5 2.5 0 01-5 0V10" />
        </svg>
      );
    case 'RBAC':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'PBAC':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <rect x="9" y="10" width="6" height="4" rx="1" />
          <path d="M10.5 10V8.5a1.5 1.5 0 013 0V10" />
        </svg>
      );
    case 'Caching Strategies':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42" />
        </svg>
      );
    case 'API Documentation':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
      );
    case 'CI/CD':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="2.5" fill={color} stroke="none" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M6 8.5v7" />
          <path d="M8.5 6H16a3 3 0 013 3v0a3 3 0 01-3 3h-5a3 3 0 00-3 3" opacity="0.6" />
          <path d="M14 16l3 3-3 3" />
        </svg>
      );
    case 'Deployment':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v10l5-5" />
          <path d="M12 12l-5-5" />
          <path d="M4 17l8 5 8-5" />
        </svg>
      );
    case 'Unit Testing':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      );
    default:
      return <FallbackDot color={color} size={size} />;
  }
}

// ─── Main Export ───────────────────────────────────────────────
export function getTechIcon(name: string, size = 18): React.ReactNode {
  const cdnIcon = SIMPLE_ICONS[name];
  if (cdnIcon) {
    return <CdnIcon name={name} slug={cdnIcon.slug} color={cdnIcon.color} size={size} />;
  }
  const color = TECH_COLORS[name] || '#818cf8';
  return <ConceptIcon name={name} color={color} size={size} />;
}
