'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tokens } from '@/config/design-tokens';
import { useApp } from '@/components/providers/app-provider';

/**
 * BackToTop
 *
 * A circular glass-morphism floating button that appears only when the user
 * has scrolled near the bottom of the page. Positioned bottom-LEFT to avoid
 * conflict with the chatbot button (bottom-right).
 */

export function BackToTop() {
  const { rtl } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      // Show button when user is within 400px of the bottom AND has scrolled at least 400px
      const nearBottom = scrollY > docHeight - winHeight - 400;
      const hasScrolled = scrollY > 400;
      setVisible(nearBottom && hasScrolled);
    };

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
            'left-6',
            rtl && 'left-auto right-6',
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