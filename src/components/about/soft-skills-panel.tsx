'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  MessageSquare,
  Shield,
  Compass,
  Lightbulb,
  Puzzle,
  RefreshCw,
  Users,
  BookOpen,
} from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { SOFT_SKILLS } from '@/lib/constants';
import { tokens } from '@/config/design-tokens';
import type { LucideIcon } from 'lucide-react';

// ── Icon lookup — maps the string name from constants to the component ──
const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Shield,
  Compass,
  Lightbulb,
  Puzzle,
  RefreshCw,
  Users,
  BookOpen,
};

// ── A single skill row with animated progress bar ──
function SkillRow({
  name,
  iconName,
  level,
  index,
  isInView,
}: {
  name: string;
  iconName: string;
  level: number;
  index: number;
  isInView: boolean;
}) {
  const Icon = iconMap[iconName] ?? MessageSquare;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: 16 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
      transition={{
        duration: tokens.motion.duration.normal,
        delay: 0.15 + index * tokens.motion.stagger.fast,
        ease: tokens.motion.ease.out,
      }}
    >
      {/* Label row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Icon className="h-3.5 w-3.5 shrink-0 text-primary/70" strokeWidth={1.8} />
          <span className="truncate text-xs font-medium text-foreground/80">
            {name}
          </span>
        </div>
        <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
          {level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="glass h-1.5 w-full overflow-hidden rounded-full">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              'linear-gradient(90deg, var(--chart-1) 0%, var(--chart-2) 100%)',
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3 + index * tokens.motion.stagger.fast,
            ease: tokens.motion.ease.out,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Main floating panel ──
export function SoftSkillsPanel() {
  const { locale, rtl, t } = useApp();
  const [aboutVisible, setAboutVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track the #about section visibility
  useEffect(() => {
    const section = document.getElementById('about');
    if (!section) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setAboutVisible(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' }
    );

    observerRef.current.observe(section);
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Slide direction based on text direction
  const slideFrom = rtl ? { x: -80, opacity: 0 } : { x: 80, opacity: 0 };

  // We need a tiny "in view" trigger inside the panel itself to
  // animate the progress bars only when the panel first appears.
  const panelInnerRef = useRef<HTMLDivElement>(null);
  const barsInView = useInView(panelInnerRef, { once: true, margin: '-20px' });

  return (
    <AnimatePresence>
      {aboutVisible && (
        <motion.aside
          className="fixed top-1/2 z-[45] hidden -translate-y-1/2 lg:block"
          style={{ [rtl ? 'left' : 'right']: 'clamp(0.75rem, 2vw, 2rem)' }}
          initial={slideFrom}
          animate={{ x: 0, opacity: 1 }}
          exit={slideFrom}
          transition={{
            duration: tokens.motion.duration.slow,
            ease: tokens.motion.ease.smooth,
          }}
        >
          <div
            ref={panelInnerRef}
            className="glass-subtle w-[270px] rounded-2xl p-4"
            style={{ maxHeight: '80vh', overflowY: 'auto' }}
          >
            {/* Title */}
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.shared.soft_skills_title}
            </h3>

            {/* Skills list */}
            <div className="space-y-4">
              {SOFT_SKILLS.map((skill, i) => (
                <SkillRow
                  key={skill.id}
                  name={skill.name[locale]}
                  iconName={skill.icon}
                  level={skill.level}
                  index={i}
                  isInView={barsInView}
                />
              ))}
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}