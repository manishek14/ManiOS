'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/components/providers/app-provider';
import { tokens } from '@/config/design-tokens';

/**
 * CinematicLoader
 *
 * A full-screen loading overlay that plays once on initial page load.
 * Sequence:
 *   1. "Mani Shekofteh" text reveals left-to-right with ink-spread clip-path (~1.5 s)
 *   2. Brief 300 ms hold so the user reads the name
 *   3. The entire overlay fades out over 0.5 s
 *   4. On completion, `loadingComplete` is set to `true` via the AppProvider
 */
export function CinematicLoader() {
  const { loadingComplete, setLoadingComplete } = useApp();
  const [phase, setPhase] = useState<'ink' | 'fade' | 'done'>('ink');

  const handleInkComplete = useCallback(() => {
    // Brief pause so the user sees the full text before it fades
    setTimeout(() => setPhase('fade'), 300);
  }, []);

  const handleOuterAnimateComplete = useCallback(() => {
    if (phase === 'fade') {
      setPhase('done');
      setLoadingComplete(true);
    }
  }, [phase, setLoadingComplete]);

  // If loading was already marked complete (e.g. hot-reload), skip entirely
  if (loadingComplete || phase === 'done') return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: tokens.zIndex.loading, backgroundColor: tokens.color.surface.dark }}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'fade' ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={handleOuterAnimateComplete}
      aria-live="polite"
      role="alert"
      aria-label="Loading"
    >
      {/* Subtle glow behind the text */}
      <div
        className="absolute h-48 w-96 rounded-full opacity-60 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${tokens.color.aurora.indigo}88 0%, transparent 70%)`,
        }}
      />

      {/* Text with ink-spread CSS animation */}
      <span
        className="font-display text-glow relative block text-center text-4xl text-white md:text-6xl"
        style={{
          animation: 'ink-spread 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
        }}
        onAnimationEnd={handleInkComplete}
      >
        Mani Shekofteh
      </span>
    </motion.div>
  );
}