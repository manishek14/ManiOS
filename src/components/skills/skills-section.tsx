'use client';

import { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Server,
  Monitor,
  Database,
  Layers,
  Cloud,
  Brain,
  Wrench,
} from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { SKILL_CATEGORIES } from '@/lib/constants';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { GlassPanel } from '@/components/shared/glass-panel';

// ─── Icon Elements (pre-rendered, no component creation during render) ───
const ICON_CLASS = 'w-[18px] h-[18px]';

const iconElements: Record<string, React.ReactElement> = {
  Server: <Server className={ICON_CLASS} />,
  Monitor: <Monitor className={ICON_CLASS} />,
  Database: <Database className={ICON_CLASS} />,
  Layers: <Layers className={ICON_CLASS} />,
  Cloud: <Cloud className={ICON_CLASS} />,
  Brain: <Brain className={ICON_CLASS} />,
  Wrench: <Wrench className={ICON_CLASS} />,
};

// ─── Animation Variants ───────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ─── Skill Bar ────────────────────────────────────────────────
function SkillBar({ skill, index }: { skill: { name: string; level: number }; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 min-w-0"
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Skill name */}
      <span className="text-sm text-muted-foreground shrink-0 min-w-0 truncate">
        {skill.name}
      </span>

      {/* Progress bar track */}
      <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.05 + 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      {/* Percentage */}
      <motion.span
        className="text-xs text-muted-foreground/60 tabular-nums w-8 text-end shrink-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 + 0.5 }}
      >
        {skill.level}%
      </motion.span>
    </motion.div>
  );
}

// ─── Category Card ────────────────────────────────────────────
function CategoryCard({
  category,
  index,
}: {
  category: (typeof SKILL_CATEGORIES)[number];
  index: number;
}) {
  const { locale } = useApp();
  const categoryName = category.name[locale] ?? category.name.en;
  const iconEl = iconElements[category.icon] ?? iconElements.Server;

  return (
    <GlassPanel
      variant="default"
      className="p-5 flex flex-col gap-4"
    >
      {/* Card header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary shrink-0">
          {iconEl}
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {categoryName}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Skills list */}
      <div className="flex flex-col gap-2.5">
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </GlassPanel>
  );
}

// ─── Skills Section ───────────────────────────────────────────
export function SkillsSection() {
  const { t } = useApp();

  const categories = useMemo(() => SKILL_CATEGORIES, []);

  return (
    <SectionWrapper id="skills">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.skills.title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.skills.subtitle}
          </motion.p>
        </div>

        {/* Category grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} variants={cardVariants} custom={index}>
              <CategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}