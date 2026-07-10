'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Target, Rocket } from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { GlassPanel } from '@/components/shared/glass-panel';
import { tokens } from '@/config/design-tokens';
import { SoftSkillsPanel } from './soft-skills-panel';

const paragraphItems = ['p1', 'p2', 'p3'] as const;

const insightCards = [
  { key: 'philosophy', icon: Sparkles, color: 'text-amber-400' },
  { key: 'approach', icon: Target, color: 'text-emerald-400' },
  { key: 'aspirations', icon: Rocket, color: 'text-rose-400' },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.motion.duration.normal,
      delay: i * tokens.motion.stagger.normal,
      ease: tokens.motion.ease.out,
    },
  }),
};

export function AboutSection() {
  const { t } = useApp();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <SectionWrapper id="about">
      <div className="mx-auto max-w-6xl">
        {/* ── Title Area ── */}
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: tokens.motion.duration.slow, ease: tokens.motion.ease.out }}
        >
          <h2 className="gradient-text mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.about.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* ── Content Grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
          {/* Left Column — Three narrative paragraphs (3/5 width) */}
          <div className="flex flex-col gap-5 lg:col-span-3 lg:gap-6">
            {paragraphItems.map((key, i) => (
              <motion.div
                key={key}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={gridInView ? 'visible' : 'hidden'}
              >
                <GlassPanel variant="strong" className="p-5 md:p-6">
                  <p
                    className="leading-relaxed text-sm text-foreground/85 md:text-base md:leading-relaxed"
                    style={{ lineHeight: tokens.lineHeight.relaxed }}
                  >
                    {t.about[key]}
                  </p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>

          {/* Right Column — Insight cards (2/5 width) */}
          <div className="flex flex-col gap-4 lg:col-span-2 lg:gap-5">
            {insightCards.map((card, i) => {
              const titleKey = `${card.key}_title` as const;
              const textKey = card.key as const;
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.key}
                  custom={paragraphItems.length + i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={gridInView ? 'visible' : 'hidden'}
                >
                  <GlassPanel
                    variant="default"
                    className="flex gap-4 p-5 md:p-6"
                  >
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl glass-subtle ${card.color}`}
                    >
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1.5 text-sm font-semibold tracking-tight text-foreground md:text-base">
                        {t.about[titleKey]}
                      </h3>
                      <p
                        className="text-xs leading-relaxed text-muted-foreground md:text-sm"
                        style={{ lineHeight: tokens.lineHeight.relaxed }}
                      >
                        {t.about[textKey]}
                      </p>
                    </div>
                  </GlassPanel>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Soft Skills Panel (desktop only) */}
      <SoftSkillsPanel />
    </SectionWrapper>
  );
}