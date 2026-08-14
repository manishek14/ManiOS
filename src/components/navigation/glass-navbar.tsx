'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { useApp, LOCALES } from '@/components/providers/app-provider';
import { SECTIONS } from '@/lib/constants';
import { tokens } from '@/config/design-tokens';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Locale } from '@/types';

/* ─── MS Logo ──────────────────────────────────────────────── */
function MSLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MS Logo"
    >
      <defs>
        <linearGradient id="ms-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* M - Two overlapping chevrons forming an M */}
      <path
        d="M4 22L9 10L14 17L16 12"
        stroke="url(#ms-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* S - A flowing S shape interlocking with M */}
      <path
        d="M28 10C25 10 22 11.5 22 14.5C22 17.5 28 18.5 28 21.5C28 24.5 25 22 22 22"
        stroke="url(#ms-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Locale Flag Helpers ──────────────────────────────────── */
const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  fa: '🇮🇷',
  ar: '🇸🇦',
};

/* ─── Hook: Active Section Tracker ─────────────────────────── */
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return activeId;
}

/* ─── Glass Navbar ─────────────────────────────────────────── */
export function GlassNavbar() {
  const { locale, setLocale, rtl, loadingComplete } = useApp();
  const { theme, setTheme } = useTheme();
  const activeSection = useActiveSection();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prevScrollY = useRef(0);

  const { scrollY } = useScroll();

  /* Track scrolled state for glass transition */
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50);

    /* Auto-hide on scroll down, show on scroll up */
    if (latest > prevScrollY.current && latest > 200) {
      setHidden(true);
      setMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
    prevScrollY.current = latest;
  });

  /* Smooth scroll to section */
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  }, []);

  /* Theme toggle */
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  /* Don't render until loading is complete */
  if (!loadingComplete) return null;

  return (
    <motion.header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
        scrolled
          ? 'glass-strong border-b border-white/[0.08] glass-navbar-mobile'
          : 'bg-transparent border-b border-transparent'
      )}
      animate={{ y: hidden ? -100 : 0 }}
      transition={tokens.motion.ease.spring}
      role="banner"
    >
      <nav
        className={cn(
          'mx-auto flex items-center justify-between h-16 px-4 md:px-8',
          'max-w-[1280px]'
        )}
        style={{ maxWidth: tokens.layout.maxWidth }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <motion.button
          onClick={() => scrollToSection('home')}
          className={cn(
            'relative flex-shrink-0 transition-transform duration-300',
            'hover:scale-110 active:scale-95'
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to home"
        >
          <MSLogo className="w-8 h-8" />
        </motion.button>

        {/* ── Center: Desktop Nav Links ── */}
        <ul
          className={cn(
            'hidden md:flex items-center gap-1',
            rtl && 'flex-row-reverse'
          )}
          role="menubar"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            const label = section.label[locale];

            return (
              <li key={section.id} role="none">
                <motion.button
                  role="menuitem"
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300',
                    'hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
                    isActive
                      ? 'gradient-text'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={tokens.motion.ease.springBouncy}
                >
                  {label}
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-4 bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 rounded-full"
                      transition={tokens.motion.ease.springBouncy}
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* ── Right: Controls ── */}
        <div
          className={cn(
            'flex items-center gap-1',
            rtl && 'flex-row-reverse'
          )}
        >
          {/* Theme Toggle */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="relative h-9 w-9 rounded-full hover:bg-white/[0.06]"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </motion.div>

          {/* Language Selector */}
          <DropdownMenu>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 h-9 px-2.5 rounded-full hover:bg-white/[0.06] text-sm font-medium"
                  aria-label="Select language"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{LOCALE_FLAGS[locale]}</span>
                  <span className="sm:hidden">{locale.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
            </motion.div>
            <DropdownMenuContent
              align={rtl ? 'start' : 'end'}
              className="min-w-[140px] glass-strong border-white/[0.08]"
            >
              {LOCALES.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={cn(
                    'flex items-center gap-2 cursor-pointer rounded-md py-2 px-2',
                    locale === loc && 'bg-accent text-accent-foreground'
                  )}
                >
                  <span className="text-base leading-none">{LOCALE_FLAGS[loc]}</span>
                  <span className="text-sm font-medium uppercase">{loc}</span>
                  {locale === loc && (
                    <motion.span
                      layoutId="locale-check"
                      className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                    />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="h-9 w-9 rounded-full hover:bg-white/[0.06]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <motion.div
                animate={mobileMenuOpen ? 'open' : 'closed'}
                className="relative h-4 w-4"
              >
                <motion.span
                  variants={{
                    closed: { y: -5, rotate: 0 },
                    open: { y: 1, rotate: 45 },
                  }}
                  className="absolute left-0 right-0 h-px bg-current origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                  }}
                  className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-px"
                />
                <motion.span
                  variants={{
                    closed: { y: 5, rotate: 0 },
                    open: { y: -1, rotate: -45 },
                  }}
                  className="absolute left-0 right-0 h-px bg-current origin-center"
                />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={tokens.motion.ease.spring}
      >
        <div className="glass-strong border-t border-white/[0.06] px-4 py-3">
          <ul className={cn('flex flex-col gap-1', rtl && 'text-right')} role="menu">
            {SECTIONS.map((section, index) => {
              const isActive = activeSection === section.id;
              const label = section.label[locale];

              return (
                <motion.li
                  key={section.id}
                  role="none"
                  initial={{ opacity: 0, x: rtl ? 20 : -20 }}
                  animate={mobileMenuOpen ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: index * tokens.motion.stagger.fast,
                    duration: tokens.motion.duration.fast,
                    ease: tokens.motion.ease.out,
                  }}
                >
                  <button
                    role="menuitem"
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-white/[0.06] active:scale-[0.98]',
                      rtl && 'text-right',
                      isActive
                        ? 'gradient-text bg-white/[0.04]'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {label}
                  </button>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}