'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/components/providers/app-provider';
import { tokens } from '@/config/design-tokens';

/**
 * CinematicLoader
 *
 * A full-screen loading overlay that plays once on initial page load.
 * Uses a simple, robust timeout-based approach — no fragile animation event listeners.
 *
 * Timeline (total ≈ 2 s, hard-capped):
 *   0 ms     → overlay visible, ink-spread text animation begins
 *   1 200 ms → text fully revealed, brief hold
 *   1 500 ms → fade-out begins (0.5 s)
 *   2 000 ms → loadingComplete = true, component unmounts
 */
const HOLD_MS = 1500;
const TOTAL_MS = 2000;

export function CinematicLoader() {
  const { loadingComplete, setLoadingComplete } = useApp();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (loadingComplete) return;

    // Safety: hard-cap at TOTAL_MS so the loader can NEVER get stuck
    const forceComplete = setTimeout(() => {
      setLoadingComplete(true);
      setVisible(false);
    }, TOTAL_MS);

    return () => clearTimeout(forceComplete);
  }, [loadingComplete, setLoadingComplete]);

  if (!visible && loadingComplete) return null;

  return (
    <AnimatePresence onExitComplete={() => setVisible(false)}>
      {!loadingComplete && (
        <motion.div
          key="loader"
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: tokens.zIndex.loading,
            backgroundColor: tokens.color.surface.dark,
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut', delay: (HOLD_MS - 1200) / 1000 }}
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
              animation: 'ink-spread 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards',
            }}
          >
            Mani Shekofteh
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}