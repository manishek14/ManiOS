'use client';

import { useState } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { tokens } from '@/config/design-tokens';

/**
 * ScrollProgress
 *
 * A thin (2 px) gradient progress bar fixed at the very top of the viewport.
 * Width animates from 0 → 100 % as the user scrolls using Framer Motion's
 * `useScroll` + `useSpring` for buttery-smooth tracking.
 * `useMotionValueEvent` controls the bar's visibility once the user scrolls.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track when the user first scrolls to show the bar with a subtle fade
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest > 0.005) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  // Smooth the raw scroll value with a spring
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 origin-left"
      style={{
        zIndex: tokens.zIndex.navbar,
        height: '2px',
        scaleX,
        opacity: hasScrolled ? 1 : 0,
        background: `linear-gradient(90deg, ${tokens.color.aurora.indigo}, ${tokens.color.aurora.cyan})`,
        boxShadow: `0 0 8px ${tokens.color.aurora.indigo}66, 0 0 20px ${tokens.color.aurora.cyan}44`,
        transition: 'opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
}