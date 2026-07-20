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
import { AiChatButton } from '@/components/ai-assistant/ai-chat-button';
import { AiChatWindow } from '@/components/ai-assistant/ai-chat-window';
import { ResumeModal } from '@/components/resume/resume-modal';

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <main className="relative min-h-screen">
      <AuroraBackground />
      <div className="noise-overlay" />
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
      <AiChatButton onClick={() => setChatOpen((v) => !v)} />
      <AiChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </main>
  );
}