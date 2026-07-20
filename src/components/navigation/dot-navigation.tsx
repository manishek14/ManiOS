'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useApp } from '@/components/providers/app-provider';
import { SECTIONS } from '@/lib/constants';
import { tokens } from '@/config/design-tokens';

/* ─── Hook: Active Section Tracker (shared logic) ──────────── */
function useActiveSection() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveId(SECTIONS[i].id);
          return;
        }
      }
      setActiveId(SECTIONS[0].id);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeId;
}

/* ─── Dot Navigation ───────────────────────────────────────── */
export function DotNavigation() {
  const { locale, rtl, loadingComplete } = useApp();
  const activeSection = useActiveSection();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /* Smooth scroll to section */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  /* Don't render until loading is complete or on small screens */
  if (!loadingComplete) return null;

  return (
    <nav
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-0',
        rtl ? 'left-5' : 'right-5'
      )}
      role="navigation"
      aria-label="Section navigation"
    >
      {/* Vertical connecting line (background track) */}
      <div
        className={cn(
          'absolute w-px bg-white/[0.06]',
          'top-0',
          'h-full'
        )}
        aria-hidden="true"
      />

      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredId === section.id;
        const label = section.label[locale];

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-center py-2.5"
          >
            {/* Tooltip — appears on opposite side of dots */}
            <AnimatePresence>
              {(isActive || isHovered) && (
                <motion.span
                  initial={{ opacity: 0, x: rtl ? 6 : -6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: rtl ? 6 : -6, scale: 0.9 }}
                  transition={{
                    duration: tokens.motion.duration.fast,
                    ease: tokens.motion.ease.out,
                  }}
                  className={cn(
                    'absolute whitespace-nowrap text-xs font-medium pointer-events-none',
                    'px-2.5 py-1 rounded-md glass-strong',
                    'right-6',
                    rtl && 'right-auto left-6',
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot / Active Bar */}
            <button
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'relative flex items-center justify-center outline-none',
                'focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full',
                'transition-colors duration-300'
              )}
              aria-label={`Navigate to ${label}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <motion.div
                transition={tokens.motion.ease.springBouncy}
                className={cn(
                  'rounded-full transition-all duration-300',
                  isActive
                    ? 'w-1 h-8 glow-primary bg-gradient-to-b from-indigo-400 via-violet-400 to-cyan-400'
                    : 'w-2.5 h-2.5 glass-strong hover:bg-white/[0.2] hover:scale-125'
                )}
              />

              {/* Hover ring */}
              <AnimatePresence>
                {isHovered && !isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.6 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: tokens.motion.duration.fast }}
                    className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary/20 pointer-events-none"
                    aria-hidden="true"
                  />
                )}
              </AnimatePresence>
            </button>
          </div>
        );
      })}
    </nav>
  );
}