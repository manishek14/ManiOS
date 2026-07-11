'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { GlassPanel } from '@/components/shared/glass-panel';
import { EXPERIENCES } from '@/lib/constants';
import { tokens } from '@/config/design-tokens';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types';

/* ── Animation variants ── */

const cardFadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.motion.duration.normal,
      delay: i * tokens.motion.stagger.slow,
      ease: tokens.motion.ease.out,
    },
  }),
};

const achievementSlide = {
  hidden: { opacity: 0, x: -10 },
  visible: (j: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: j * 0.06, ease: 'easeOut' },
  }),
};

const techFade = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (j: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, delay: j * 0.03 + 0.15, ease: 'easeOut' },
  }),
};

/* ── Timeline dot ── */

function TimelineDot({
  isInView,
  isFirst,
}: {
  isInView: boolean;
  isFirst: boolean;
}) {
  return (
    <motion.div
      className="relative z-10"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.4 }}
    >
      {/* Core dot */}
      <div className="relative flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-primary" />
        {/* Glow ring */}
        <div className="glow-primary absolute h-3 w-3 rounded-full bg-primary" />

        {/* Pulse ring — only for the first (most recent) item */}
        {isFirst && isInView && (
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-primary/40"
            animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ── Single timeline item ── */

function TimelineCard({
  exp,
  index,
}: {
  exp: Experience;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { locale, rtl } = useApp();

  const isEven = index % 2 === 0;
  const isFirst = index === 0;
  const cardOnLeft = rtl ? !isEven : isEven;

  const role = exp.role[locale] ?? exp.role.en;
  const description = exp.description[locale] ?? exp.description.en;
  const achievements = exp.achievements[locale] ?? exp.achievements.en;
  const companyName = locale === 'en' ? exp.company : exp.companyLocal;

  return (
    <div ref={ref} className="relative">
      {/* ── Dot ── */}
      <div
        className={cn(
          'absolute top-7 z-10',
          // Mobile: positioned on the line
          !rtl && 'left-3.5',
          rtl && 'right-3.5',
          // Desktop: centered on the timeline
          'md:left-1/2 md:-translate-x-1/2 md:right-auto',
        )}
      >
        <TimelineDot isInView={isInView} isFirst={isFirst} />
      </div>

      {/* ── Card ── */}
      <motion.div
        className={cn(
          // Mobile: give space for the side line + dot
          !rtl && 'pl-10',
          rtl && 'pr-10',
          // Desktop: reset mobile padding, use half-width
          'md:w-[calc(50%-2rem)] md:pl-0 md:pr-0',
          // Desktop: alternate sides
          cardOnLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8',
        )}
        custom={index}
        variants={cardFadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <GlassPanel variant="default" className="p-5 md:p-6">
          <div className="space-y-3">
            {/* Period badge */}
            <span className="inline-block text-[0.6875rem] font-medium tracking-widest text-primary/70 uppercase">
              {exp.period}
            </span>

            {/* Role + Company */}
            <div>
              <h3 className="text-lg font-bold tracking-tight text-foreground">
                {role}
              </h3>
              <p className="text-sm text-muted-foreground">{companyName}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>{exp.location}</span>
            </div>

            {/* Description */}
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>

            {/* Achievements */}
            <ul className="space-y-1.5 pt-1">
              {achievements.map((item, j) => (
                <motion.li
                  key={j}
                  custom={j}
                  variants={achievementSlide}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="flex items-start gap-2 text-xs leading-relaxed text-foreground/70"
                >
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/50" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Tech stack pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.techStack.map((tech, j) => (
                <motion.span
                  key={tech}
                  custom={j}
                  variants={techFade}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  className="glass-subtle rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium text-foreground/50"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
}

/* ── Experience Section ── */

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, rtl } = useApp();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Line grows to full height as user scrolls through the timeline
  const lineScaleY = useTransform(scrollYProgress, (v) => Math.min(1, v * 1.25));

  return (
    <SectionWrapper id="experience">
      <div className="mx-auto max-w-5xl">
        {/* ── Section header ── */}
        <motion.div
          className="mb-14 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: tokens.motion.duration.slow,
            ease: tokens.motion.ease.out,
          }}
        >
          <h2 className="gradient-text mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.experience.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={containerRef} className="relative">
          {/* Desktop center line */}
          <div className="absolute left-1/2 top-0 bottom-0 hidden w-px -translate-x-1/2 md:block">
            <motion.div
              className="h-full w-full bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            />
          </div>

          {/* Mobile side line */}
          <div
            className={cn(
              'absolute top-0 bottom-0 w-px md:hidden',
              !rtl && 'left-5',
              rtl && 'right-5',
            )}
          >
            <motion.div
              className="h-full w-full bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0"
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-10 md:space-y-14">
            {EXPERIENCES.map((exp, i) => (
              <TimelineCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}