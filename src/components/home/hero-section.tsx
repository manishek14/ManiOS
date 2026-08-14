'use client';

import { useRef, useCallback, useMemo, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Activity, FileText } from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { MagneticButton } from '@/components/shared/magnetic-button';
import { SocialLinks } from '@/components/home/social-links';
import { cn } from '@/lib/utils';
import { tokens } from '@/config/design-tokens';

const PARALLAX_MAX = 10;

/* ── Fade-up variant factory with custom delay ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.motion.duration.normal,
      delay,
      ease: tokens.motion.ease.out as [number, number, number, number],
    },
  }),
} as const;

/* ── Props ── */
interface HeroSectionProps {
  onOpenResume: () => void;
}

/* ── Component ── */
export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const { t, loadingComplete } = useApp();
  const containerRef = useRef<HTMLElement>(null);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  /* ── Parallax motion values ── */
  // Normalised 0→1 across the container; 0.5 = centre = zero displacement
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const parallaxX = useTransform(rawX, [0, 1], [-PARALLAX_MAX, PARALLAX_MAX]);
  const parallaxY = useTransform(rawY, [0, 1], [-PARALLAX_MAX, PARALLAX_MAX]);

  const PARALLAX_SPRING = { stiffness: 100, damping: 20, mass: 0.5 };
  const smoothX = useSpring(parallaxX, PARALLAX_SPRING);
  const smoothY = useSpring(parallaxY, PARALLAX_SPRING);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      rawX.set((e.clientX - rect.left) / rect.width);
      rawY.set((e.clientY - rect.top) / rect.height);
    },
    [rawX, rawY],
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0.5);
    rawY.set(0.5);
  }, [rawX, rawY]);

  /* ── Split name into words for staggered reveal ── */
  const nameWords = useMemo(() => t.hero.name.split(' '), [t.hero.name]);

  return (
    <AnimatePresence mode="wait">
      {loadingComplete && (
        <motion.section
          ref={containerRef}
          id="home"
          className="relative min-h-screen flex items-center py-20"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* ━━━ Portrait ━━━ */}
            <motion.div
              className="relative flex-shrink-0 w-full max-w-xs lg:max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: tokens.motion.duration.cinematic,
                ease: tokens.motion.ease.out as [number, number, number, number],
              }}
              style={{ y: isPortraitHovered ? 0 : smoothY }}
              onMouseEnter={() => setIsPortraitHovered(true)}
              onMouseLeave={() => setIsPortraitHovered(false)}
            >
              {/* Radial glow behind portrait (indigo / purple) */}
              <div
                className="absolute -inset-8 rounded-3xl opacity-70 blur-2xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.12) 40%, transparent 70%)',
                }}
              />

              {/* Animated rotating gradient border */}
              <div className="portrait-border-wrap">
                <div className="portrait-border-inner">
                  <Image
                    src="/portrait.jpg"
                    alt="Mani Shekofteh"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                    priority
                  />

                  {/* Glass-subtle overlay fading up from bottom */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none rounded-b-3xl"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(255,255,255,0.04), transparent)',
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* ━━━ Content ━━━ */}
            <div
              className={cn(
                'flex flex-col gap-4 lg:gap-5',
                'items-center lg:items-start',
                'text-center lg:text-start',
              )}
            >
              {/* Greeting */}
              <motion.p
                className="text-sm tracking-wider uppercase text-muted-foreground font-medium"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.3}
              >
                {t.hero.greeting}
              </motion.p>

              {/* Name — word-by-word reveal */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl leading-tight">
                {nameWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block me-2 text-[#f472b6]"
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5 + i * 0.1,
                      ease: tokens.motion.ease.out as [number, number, number, number],
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Tagline */}
              <motion.p
                className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1.0}
              >
                {t.hero.tagline}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-4 mt-2"
                initial="hidden"
                animate="visible"
              >
                {/* View Activity — glass style */}
                <motion.div variants={fadeUp} custom={1.3}>
                  <MagneticButton className="glass rounded-xl px-5 py-2.5 text-sm font-medium cursor-pointer">
                    <a
                      href="https://github.com/manishek14"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Activity className="size-4" />
                      {t.hero.cta_activity}
                    </a>
                  </MagneticButton>
                </motion.div>

                {/* Resume — primary outline style */}
                <motion.div variants={fadeUp} custom={1.5}>
                  <MagneticButton
                    className={cn(
                      'rounded-xl px-5 py-2.5 text-sm font-medium cursor-pointer',
                      'bg-primary/10 text-primary border border-primary/20',
                      'hover:bg-primary/20 transition-colors',
                    )}
                    onClick={onOpenResume}
                  >
                    <FileText className="size-4 me-2" />
                    {t.hero.cta_resume}
                  </MagneticButton>
                </motion.div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="mt-2"
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={fadeUp} custom={1.7}>
                  <SocialLinks />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}