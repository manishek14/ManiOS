'use client';

import { tokens } from '@/config/design-tokens';

/**
 * AuroraBackground
 *
 * Renders an animated aurora gradient background using pure CSS.
 * Three color orbs drift, scale, and rotate with staggered keyframes
 * to create a living, atmospheric backdrop. A subtle noise texture
 * is layered on top to add film-grain depth.
 *
 * Uses design tokens for aurora colors and z-index.
 */
export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: tokens.zIndex.background }}
      aria-hidden="true"
    >
      {/* Orb 1 — Deep Blue */}
      <div
        className="absolute left-[-20%] top-[-20%] h-[60vw] w-[60vw] max-h-[800px] max-w-[800px] rounded-[50%] opacity-40 blur-[120px] md:h-[50vw] md:w-[50vw] md:max-h-[900px] md:max-w-[900px]"
        style={{
          background: `radial-gradient(circle, ${tokens.color.aurora.blue}88 0%, ${tokens.color.aurora.blue}22 50%, transparent 70%)`,
          animation: 'aurora-shift 15s ease-in-out infinite',
        }}
      />

      {/* Orb 2 — Indigo */}
      <div
        className="absolute right-[-15%] top-[10%] h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-[50%] opacity-30 blur-[140px] md:h-[45vw] md:w-[45vw] md:max-h-[800px] md:max-w-[800px]"
        style={{
          background: `radial-gradient(circle, ${tokens.color.aurora.indigo}77 0%, ${tokens.color.aurora.indigo}22 50%, transparent 70%)`,
          animation: 'aurora-shift-2 20s ease-in-out infinite',
        }}
      />

      {/* Orb 3 — Purple */}
      <div
        className="absolute bottom-[-10%] left-[30%] h-[50vw] w-[50vw] max-h-[650px] max-w-[650px] rounded-[50%] opacity-25 blur-[100px] md:h-[40vw] md:w-[40vw] md:max-h-[750px] md:max-w-[750px]"
        style={{
          background: `radial-gradient(circle, ${tokens.color.aurora.purple}66 0%, ${tokens.color.aurora.purple}22 50%, transparent 70%)`,
          animation: 'aurora-shift-3 25s ease-in-out infinite',
        }}
      />

      {/* Noise Overlay */}
      <div className="noise-overlay" />
    </div>
  );
}