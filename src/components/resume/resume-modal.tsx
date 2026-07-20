'use client';

import { useState } from 'react';
import {
  Download,
  Eye,
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useApp } from '@/components/providers/app-provider';
import { cn } from '@/lib/utils';
import { getTechIcon, TECH_COLORS } from '@/lib/tech-icons';
import { EXPERIENCES, PROJECTS } from '@/lib/constants';
import type { Locale } from '@/types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Skill item with tech color ──────────────────────────────── */

function SkillItem({ name }: { name: string }) {
  const color = TECH_COLORS[name] || '#6366f1';
  const icon = getTechIcon(name, 12);

  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0" style={{ filter: `drop-shadow(0 0 3px ${color}55)` }}>
        {icon}
      </span>
      <span className="text-[11px] text-foreground/70">{name}</span>
    </div>
  );
}

/* ── Section block ────────────────────────────────────────────── */

function SectionBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-xl glass-subtle p-4', className)}>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-primary">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ── Timeline dot ─────────────────────────────────────────────── */

function TimelineDot({ active }: { active: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center">
      <div
        className={cn(
          'mt-1.5 h-2.5 w-2.5 rounded-full border-2',
          active
            ? 'border-primary bg-primary/30'
            : 'border-white/20 bg-transparent',
        )}
      />
      <div className="h-full w-px bg-white/[0.06]" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { t, locale, rtl } = useApp();
  const [showResume, setShowResume] = useState(true);

  const resumeT = t.resume as Record<string, string>;

  const contactItems = [
    { icon: Mail, text: 'manishekofteh@gmail.com', href: 'mailto:manishekofteh@gmail.com' },
    { icon: Github, text: 'manishek14', href: 'https://github.com/manishek14' },
    { icon: Linkedin, text: 'Mani Shekofteh', href: 'https://linkedin.com/in/mani-shekofteh' },
    { icon: Phone, text: resumeT.phone || '09154944256', href: undefined },
    { icon: MapPin, text: resumeT.location || 'Mashhad, Iran', href: undefined },
  ];

  const skillGroups = [
    {
      category: locale === 'fa' ? 'بک‌اند' : locale === 'ar' ? 'الخلفية' : 'Backend',
      skills: [
        { name: 'Node.js' },
        { name: 'NestJS' },
        { name: 'Express' },
        { name: 'TypeScript' },
        { name: 'REST API' },
        { name: 'JWT / Auth' },
        { name: 'Redis' },
        { name: 'WebSockets' },
      ],
    },
    {
      category: locale === 'fa' ? 'فرانت‌اند' : locale === 'ar' ? 'الواجهة' : 'Frontend',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'HTML & CSS' },
        { name: 'JavaScript' },
        { name: 'Tailwind CSS' },
      ],
    },
    {
      category: locale === 'fa' ? 'پایگاه داده' : locale === 'ar' ? 'قواعد البيانات' : 'Databases',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'MySQL' },
        { name: 'Redis' },
      ],
    },
    {
      category: locale === 'fa' ? 'ابزارها' : locale === 'ar' ? 'الأدوات' : 'Tools',
      skills: [
        { name: 'Docker' },
        { name: 'Git' },
        { name: 'Postman' },
        { name: 'Swagger' },
        { name: 'CI/CD' },
      ],
    },
  ];

  // Use locale-aware experience data
  const experiences = EXPERIENCES.map((exp) => ({
    role: typeof exp.role === 'string' ? exp.role : (exp.role as Record<Locale, string>)[locale] ?? exp.role.en,
    company: locale === 'fa' ? exp.companyLocal : exp.company,
    period: exp.period,
    achievements: typeof exp.achievements === 'string' ? [exp.achievements] : (exp.achievements as Record<Locale, string[]>)[locale] ?? exp.achievements.en,
    tech: exp.techStack,
  }));

  // Use locale-aware project data
  const projects = PROJECTS.map((project) => ({
    name: project.name,
    description: typeof project.description === 'string' ? project.description : (project.description as Record<Locale, string>)[locale] ?? project.description.en,
    tech: project.techStack,
    github: project.github,
    liveUrl: project.liveUrl,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl h-[90vh] overflow-hidden border-white/[0.08] p-0 gap-0"
        style={{ backgroundColor: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(20px)' }}
      >
        {/* ── Top bar with action buttons ── */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3">
          <DialogHeader className="p-0">
            <DialogTitle className="text-sm font-medium text-foreground/80">
              {resumeT.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 gap-1.5 text-xs',
                showResume
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
              onClick={() => setShowResume(true)}
            >
              <Eye size={13} />
              {resumeT.view_resume}
            </Button>

            <a href="/resume.pdf" download>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'h-8 gap-1.5 text-xs',
                  !showResume
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                onClick={() => setShowResume(false)}
              >
                <Download size={13} />
                {resumeT.download_resume}
              </Button>
            </a>
          </div>
        </div>

        {/* ── Resume content (scrollable) ── */}
        <div className="h-[calc(90vh-3.5rem)] overflow-y-auto">
          {/* ── Header ── */}
          <div className="border-b border-white/[0.06] px-6 py-6">
            <h1 className="font-display text-3xl sm:text-4xl gradient-text">
              {resumeT.name}
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              {resumeT.role}
            </p>

            {/* Contact row */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground/80">
                    <Icon size={12} className="text-primary/60" />
                    {item.text}
                  </span>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.text}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  );
                }
                return (
                  <span key={item.text} className="cursor-default">
                    {content}
                  </span>
                );
              })}
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0">
            {/* ── Left column (narrower) ── */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-e border-white/[0.06] p-6 space-y-4">
              {/* Skills */}
              {skillGroups.map((group) => (
                <SectionBlock key={group.category} title={group.category}>
                  <div className="space-y-2">
                    {group.skills.map((skill) => (
                      <SkillItem
                        key={skill.name}
                        name={skill.name}
                      />
                    ))}
                  </div>
                </SectionBlock>
              ))}

              {/* Languages */}
              <SectionBlock title={resumeT.section_languages}>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-foreground/70">{resumeT.lang_en}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {resumeT.lang_en_level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-foreground/70">{resumeT.lang_fa}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {resumeT.lang_fa_level}
                    </span>
                  </div>
                </div>
              </SectionBlock>

              {/* Education */}
              <SectionBlock title={resumeT.section_education}>
                <div>
                  <p className="text-[12px] font-medium text-foreground/90">
                    {resumeT.education_degree}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {resumeT.education_university}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    {resumeT.education_period}
                  </p>
                </div>
              </SectionBlock>
            </div>

            {/* ── Right column (wider) ── */}
            <div className="lg:col-span-8 p-6 space-y-4">
              {/* Summary */}
              <SectionBlock title={resumeT.section_summary}>
                <p className="text-[12px] leading-relaxed text-foreground/75">
                  {resumeT.summary}
                </p>
              </SectionBlock>

              {/* Experience */}
              <SectionBlock title={resumeT.section_experience}>
                <div className="space-y-0">
                  {experiences.map((exp, i) => (
                    <div key={exp.company} className="relative flex gap-3">
                      {/* Timeline */}
                      <TimelineDot active={i === 0} />

                      {/* Content */}
                      <div className={cn('pb-4', i === experiences.length - 1 && 'pb-0')}>
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-[12px] font-semibold text-foreground/90">
                            {exp.role}
                          </span>
                          <span className="text-[11px] text-primary/80">
                            {exp.company}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">
                          {exp.period}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((a, j) => (
                            <li
                              key={j}
                              className="flex gap-2 text-[11px] text-foreground/65"
                            >
                              <ChevronRight
                                size={10}
                                className="mt-0.5 shrink-0 text-primary/50"
                              />
                              {a}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {exp.tech.map((tech) => {
                            const color = TECH_COLORS[tech] || '#6366f1';
                            const icon = getTechIcon(tech, 10);
                            return (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] text-muted-foreground"
                                style={{ backgroundColor: `${color}12` }}
                              >
                                {icon}
                                {tech}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* Projects */}
              <SectionBlock title={resumeT.section_projects}>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.name}
                      className="rounded-lg bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-foreground/90">
                          {project.name}
                        </span>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/40 transition-colors hover:text-primary"
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground/40 transition-colors hover:text-primary ml-0.5"
                          >
                            <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-foreground/60">
                        {project.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tech.map((tech) => {
                          const color = TECH_COLORS[tech] || '#6366f1';
                          const icon = getTechIcon(tech, 10);
                          return (
                            <span
                              key={tech}
                              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] text-muted-foreground"
                              style={{ backgroundColor: `${color}12` }}
                            >
                              {icon}
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}