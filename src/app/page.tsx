'use client';

import { useState } from 'react';
import { AuroraBackground } from '@/components/shared/aurora-background';
import { CinematicLoader } from '@/components/loading/cinematic-loader';
import { ScrollProgress } from '@/components/shared/scroll-progress';
import { GlassNavbar } from '@/components/navigation/glass-navbar';
import { DotNavigation } from '@/components/navigation/dot-navigation';
import { HeroSection } from '@/components/home/hero-section';
import { AboutSection } from '@/components/about/about-section';
import { SkillsSection } from '@/components/skills/skills-section';
import { ProjectsSection } from '@/components/projects/projects-section';
import { ExperienceSection } from '@/components/experience/experience-section';
import { ContactSection } from '@/components/contact/contact-section';
import { BackToTop } from '@/components/shared/back-to-top';
import { ResumeModal } from '@/components/resume/resume-modal';

export default function Home() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <CinematicLoader />
      <ScrollProgress />
      <GlassNavbar />
      <DotNavigation />

      <HeroSection onOpenResume={() => setResumeOpen(true)} />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />

      <BackToTop />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}