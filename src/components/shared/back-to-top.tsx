'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/components/providers/app-provider';
import { tokens } from '@/config/design-tokens';

/** Minimum scroll distance (px) before the button appears. */
const SCROLL_THRESHOLD = 400;

/**
 * BackToTop
 *
 * A circular glass-morphism floating button that appears once the user has
 * scrolled past 400 px. Positioned bottom-right (or bottom-left in RTL
 * layouts). Clicking it smoothly scrolls the viewport back to the top.
 */
export function BackToTop() {
  const { rtl } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Check initial scroll position (e.g. page refresh mid-scroll)
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className={cn(
            'glass-strong fixed bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white',
            rtl ? 'left-6' : 'right-6',
          )}
          style={{ zIndex: tokens.zIndex.dotNav }}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}