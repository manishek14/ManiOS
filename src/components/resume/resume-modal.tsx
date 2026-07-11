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

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Skill item (no percentage) ─────────────────────────────────── */

function SkillItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
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
  const { t, rtl } = useApp();
  const [showResume, setShowResume] = useState(true);

  const contactItems = [
    { icon: Mail, text: 'manishekofteh@gmail.com', href: 'mailto:manishekofteh@gmail.com' },
    { icon: Github, text: 'manishek14', href: 'https://github.com/manishek14' },
    { icon: Linkedin, text: 'Mani Shekofteh', href: 'https://linkedin.com/in/mani-shekofteh' },
    { icon: Phone, text: '+98 936 XXX XXXX', href: undefined },
    { icon: MapPin, text: 'Mashhad, Iran', href: undefined },
  ];

  const skillGroups = [
    {
      category: 'Backend',
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
      category: 'Frontend',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'HTML & CSS' },
        { name: 'JavaScript' },
        { name: 'Tailwind CSS' },
      ],
    },
    {
      category: 'Databases',
      skills: [
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'MySQL' },
        { name: 'Redis' },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { name: 'Docker' },
        { name: 'Git / GitHub' },
        { name: 'Postman' },
        { name: 'Swagger' },
        { name: 'CI/CD' },
      ],
    },
  ];

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'MoaserHome',
      period: 'Aug 2025 — Mar 2026',
      achievements: [
        'Reduced product page load time by 35% through query optimization and lazy loading',
        'Implemented Redis caching, reducing API response from 600ms to 120ms',
        'Built user & product management APIs with NestJS, TypeORM, and PostgreSQL',
      ],
      tech: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'React'],
    },
    {
      role: 'Backend Developer',
      company: 'RojanSoft',
      period: 'Jun 2024 — Feb 2025',
      achievements: [
        'Built JWT auth API handling 500 concurrent requests/sec',
        'Documented entire API with Swagger, cutting cross-team coordination time',
        'Designed scalable RESTful API architecture from scratch',
      ],
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    },
    {
      role: 'Frontend Developer',
      company: 'CarnCar',
      period: 'Jun 2023 — Sep 2023',
      achievements: [
        'Built reusable React components without additional state libraries',
        'Created admin panel enabling support team to work independently',
      ],
      tech: ['React', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      role: 'Frontend Developer & IT Expert',
      company: 'Razavi Architectural Arrays',
      period: 'Jun 2022 — Oct 2022',
      achievements: [
        'Designed 3 data entry forms, reducing registration time by 40%',
        'Fixed 20+ system bugs across hardware and software sections',
      ],
      tech: ['HTML', 'CSS', 'JavaScript'],
    },
  ];

  const projects = [
    {
      name: 'RideX',
      description: 'Full-stack ride-hailing platform with AI-powered route optimization, dynamic pricing, and real-time tracking across passenger, driver, and admin panels.',
      tech: ['Next.js', 'Node.js', 'MongoDB', 'Redis', 'WebSocket', 'AI/ML'],
      github: 'https://github.com/manishek14/ridex',
    },
    {
      name: 'Vendora',
      description: 'Production-ready multi-vendor e-commerce backend with NestJS, featuring complex product attributes, RBAC, and flexible payment flows.',
      tech: ['NestJS', 'TypeORM', 'PostgreSQL', 'Redis', 'JWT', 'Docker'],
      github: 'https://github.com/manishek14/Vendora',
    },
    {
      name: 'AxisHR',
      description: 'Comprehensive HR management system handling employee lifecycle, leave requests, attendance tracking, payroll calculations, and organizational structure.',
      tech: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'JWT', 'Swagger'],
      github: 'https://github.com/manishek14/AxisHR',
    },
  ];

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
              {t.resume.title}
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
              {t.resume.view_resume}
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
                {t.resume.download_resume}
              </Button>
            </a>
          </div>
        </div>

        {/* ── Resume content (scrollable) ── */}
        <div className="h-[calc(90vh-3.5rem)] overflow-y-auto">
          {/* ── Header ── */}
          <div className="border-b border-white/[0.06] px-6 py-6">
            <h1 className="font-display text-3xl sm:text-4xl gradient-text">
              Mani Shekofteh
            </h1>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
              Backend Engineer
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
              <SectionBlock title="Languages">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-foreground/70">English</span>
                    <span className="text-[10px] text-muted-foreground">
                      Upper Intermediate
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-foreground/70">Persian</span>
                    <span className="text-[10px] text-muted-foreground">
                      Native
                    </span>
                  </div>
                </div>
              </SectionBlock>

              {/* Education */}
              <SectionBlock title="Education">
                <div>
                  <p className="text-[12px] font-medium text-foreground/90">
                    Bachelor of Software Engineering
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Islamic Azad University, Mashhad
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/60">
                    2025 — Present
                  </p>
                </div>
              </SectionBlock>
            </div>

            {/* ── Right column (wider) ── */}
            <div className="lg:col-span-8 p-6 space-y-4">
              {/* Summary */}
              <SectionBlock title="Summary">
                <p className="text-[12px] leading-relaxed text-foreground/75">
                  Results-driven backend engineer with 2+ years of professional
                  experience building scalable, production-grade systems in
                  Node.js and NestJS. Passionate about clean architecture,
                  API design, and performance optimization — from reducing
                  response times with Redis caching to designing modular
                  micro-service patterns. Combines deep technical expertise
                  with strong communication skills and a relentless drive to
                  ship code that is maintainable, testable, and built to last.
                </p>
              </SectionBlock>

              {/* Experience */}
              <SectionBlock title="Experience">
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
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionBlock>

              {/* Projects */}
              <SectionBlock title="Key Projects">
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
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-foreground/60">
                        {project.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
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