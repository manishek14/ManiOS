'use client';

import { useState, useCallback, useRef, type MouseEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2, FolderX } from 'lucide-react';
import Image from 'next/image';
import { useApp } from '@/components/providers/app-provider';
import { PROJECTS } from '@/lib/constants';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

// ─── Types ────────────────────────────────────────────────────
type FilterKey = 'all' | 'backend' | 'frontend' | 'experimental';

const FILTER_KEYS: FilterKey[] = ['all', 'backend', 'frontend', 'experimental'];

// ─── Animation Variants ───────────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.3 },
  },
};

// ─── Filter Bar ───────────────────────────────────────────────
function FilterBar({
  active,
  onFilter,
}: {
  active: FilterKey;
  onFilter: (f: FilterKey) => void;
}) {
  const { t } = useApp();

  return (
    <div className="relative flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl glass-strong w-full max-w-full mx-auto mb-10 sm:mb-12 overflow-hidden">
      {FILTER_KEYS.map((key) => {
        const isActive = active === key;
        const label = t.projects.filters[key as keyof typeof t.projects.filters];

        return (
          <button
            key={key}
            onClick={() => onFilter(key)}
            className={cn(
              'relative z-10 flex-1 sm:flex-initial min-w-[70px] sm:min-w-0',
              'px-2.5 sm:px-4 py-1.5 sm:py-2',
              'text-[11px] sm:text-sm font-medium rounded-full transition-colors duration-300 cursor-pointer',
              'whitespace-nowrap text-center',
              isActive
                ? 'text-primary glass-strong border border-primary/30'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <span className="relative z-10">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Tilt Project Card ────────────────────────────────────────
function TiltProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { locale, t } = useApp();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ±6 degrees
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ rotateX, rotateY });
    setShinePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  // Locale-aware strings
  const projectName = (t.projects.items as Record<string, { name: string }>)[project.id]?.name ?? project.name;
  const projectDescription = project.description[locale] ?? project.description.en;
  const projectArchitecture = project.architecture[locale] ?? project.architecture.en;
  const projectItem = (t.projects.items as Record<string, { view_demo?: string; view_code?: string; features?: string[] }>)[project.id];
  const viewDemoLabel = projectItem?.view_demo;
  const viewCodeLabel = projectItem?.view_code;
  const displayFeatures = projectItem?.features
    ? projectItem.features.slice(0, 3)
    : project.features.slice(0, 3);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
      }}
      className="group"
    >
      <div
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${isHovered ? -8 : 0}px)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative rounded-2xl overflow-hidden glass cursor-default"
      >
        {/* Glass shine overlay on hover */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isHovered
              ? `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
              : 'transparent',
          }}
        />

        {/* Diagonal shine sweep on hover */}
        <div
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              background: `linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)`,
              transform: `translate(${shinePos.x - 50}%, ${shinePos.y - 50}%)`,
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%',
            }}
          />
        </div>

        {/* Cover gradient area */}
        <div
          className={cn(
            'relative h-48 bg-gradient-to-br flex items-end',
            project.coverGradient
          )}
        >
          {/* Project image or pattern overlay */}
          {project.image ? (
            <Image
              src={project.image}
              alt={projectName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
          )}

          {/* Bottom dark gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-[1]" />

          {/* Project name on cover */}
          <div className="relative z-10 p-4 sm:p-5 pb-3 sm:pb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {projectName}
            </h3>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 end-3 sm:top-4 sm:end-4 z-10">
            <span className="glass-strong text-[10px] sm:text-xs font-medium text-white/80 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
              {t.projects.filters[project.category as keyof typeof t.projects.filters] ?? project.category}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {projectDescription}
          </p>

          {/* Architecture */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/70 mb-1.5 block">
              {t.shared.architecture}
            </span>
            <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
              {projectArchitecture}
            </p>
          </div>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="glass-subtle text-[11px] text-muted-foreground px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features (2-3 items) */}
          {displayFeatures.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {displayFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/60 mt-0.5 shrink-0" />
                  <span className="text-xs text-muted-foreground/70 leading-snug line-clamp-1">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="relative z-30 flex items-center gap-3 pt-2 border-t border-white/[0.06]">
            {project.liveUrl && viewDemoLabel && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full glass text-xs text-foreground hover:text-primary gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {viewDemoLabel}
                </Button>
              </a>
            )}
            {project.github && viewCodeLabel && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(!project.liveUrl && 'flex-1')}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    'glass text-xs text-foreground hover:text-primary gap-2 cursor-pointer',
                    project.liveUrl ? '' : 'w-full'
                  )}
                >
                  <Github className="w-3.5 h-3.5" />
                  {viewCodeLabel}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Projects Section ─────────────────────────────────────────
export function ProjectsSection() {
  const { t } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filteredProjects = PROJECTS.filter(
    (p) => activeFilter === 'all' || p.category === activeFilter
  );

  return (
    <SectionWrapper id="projects">
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
            {t.projects.title}
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.projects.subtitle}
          </motion.p>
        </div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterBar active={activeFilter} onFilter={setActiveFilter} />
        </motion.div>

        {/* Project cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          key={activeFilter}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <TiltProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))
          ) : (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <FolderX className="w-12 h-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground/60">
                {t.projects.filters.no_results ?? 'No projects in this category'}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}