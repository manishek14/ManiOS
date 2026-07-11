'use client';

import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Copy, ExternalLink } from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { GlassPanel } from '@/components/shared/glass-panel';
import { SOCIAL_LINKS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { tokens } from '@/config/design-tokens';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

/* ── Card visual configuration ── */

interface ContactCardConfig {
  icon: LucideIcon;
  platformLabel: string;
  glowColor: string;
  iconColor: string;
  iconGlow: string;
  canCopy: boolean;
}

const CARD_CONFIG: Record<string, ContactCardConfig> = {
  email: {
    icon: Mail,
    platformLabel: 'Email',
    glowColor: 'bg-indigo-500/15',
    iconColor: 'text-indigo-400',
    iconGlow: 'drop-shadow(0 0 10px rgba(99,102,241,0.3))',
    canCopy: true,
  },
  github: {
    icon: Github,
    platformLabel: 'GitHub',
    glowColor: 'bg-neutral-400/10',
    iconColor: 'text-foreground/80',
    iconGlow: 'drop-shadow(0 0 10px rgba(255,255,255,0.15))',
    canCopy: false,
  },
  linkedin: {
    icon: Linkedin,
    platformLabel: 'LinkedIn',
    glowColor: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    iconGlow: 'drop-shadow(0 0 10px rgba(96,165,250,0.3))',
    canCopy: false,
  },
  telegram: {
    icon: Send,
    platformLabel: 'Telegram',
    glowColor: 'bg-cyan-500/15',
    iconColor: 'text-cyan-400',
    iconGlow: 'drop-shadow(0 0 10px rgba(103,232,249,0.3))',
    canCopy: false,
  },
};

/* ── Animation variants ── */

const cardFadeUp = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: tokens.motion.duration.normal,
      delay: i * tokens.motion.stagger.normal,
      ease: tokens.motion.ease.out,
    },
  }),
};

/* ── Single contact card ── */

function ContactCard({
  config,
  url,
  value,
  index,
}: {
  config: ContactCardConfig;
  url: string;
  value: string;
  index: number;
}) {
  const { t } = useApp();
  const { toast } = useToast();
  const Icon = config.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      // Toast may not be visible if Toaster is not mounted — provide visual fallback
      try {
        toast({ title: t.contact.copied });
      } catch {
        // toast not available, button text change below acts as feedback
      }
    } catch {
      // Clipboard not available — silently fail
    }
  };

  const handleOpen = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      custom={index}
      variants={cardFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <GlassPanel variant="strong" className="group relative overflow-hidden p-6">
        {/* Background glow — fades in on hover */}
        <div
          className={cn(
            'pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            config.glowColor,
          )}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {/* Icon with bounce on hover */}
          <motion.div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-2xl glass-subtle',
              config.iconColor,
            )}
            whileHover={{ scale: 1.1, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Icon
              className="h-7 w-7"
              style={{ filter: config.iconGlow }}
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Platform name */}
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {config.platformLabel}
          </span>

          {/* Value */}
          <span className="max-w-full break-all text-center text-xs text-muted-foreground">
            {value}
          </span>

          {/* Action buttons */}
          <div className="flex w-full gap-2 pt-2">
            {config.canCopy && (
              <button
                type="button"
                onClick={handleCopy}
                className="glass-subtle flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[0.6875rem] font-medium text-foreground/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-foreground cursor-pointer"
              >
                <Copy className="h-3 w-3" />
                <span>{t.contact.copy_email}</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleOpen}
              className={cn(
                'glass-subtle flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-[0.6875rem] font-medium text-foreground/70 transition-colors duration-200 hover:bg-white/[0.08] hover:text-foreground',
                config.canCopy ? 'flex-1' : 'w-full',
              )}
            >
              <ExternalLink className="h-3 w-3" />
              <span>{t.contact.open_link}</span>
            </button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}

/* ── Contact Section ── */

export function ContactSection() {
  const { t } = useApp();

  return (
    <SectionWrapper id="contact">
      <div className="mx-auto max-w-3xl">
        {/* ── Section header ── */}
        <motion.div
          className="mb-14 text-center md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{
            duration: tokens.motion.duration.slow,
            ease: tokens.motion.ease.out,
          }}
        >
          <h2 className="gradient-text mb-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto max-w-xl text-sm text-muted-foreground md:text-base">
            {t.contact.subtitle}
          </p>
        </motion.div>

        {/* ── Contact cards grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SOCIAL_LINKS.map((link, i) => {
            const config = CARD_CONFIG[link.id];
            if (!config) return null;
            return (
              <ContactCard
                key={link.id}
                config={config}
                url={link.url}
                value={link.label}
                index={i}
              />
            );
          })}
        </div>

        {/* ── Closing message ── */}
        <motion.p
          className="mt-16 text-center text-xs tracking-wide text-muted-foreground/40 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Built with Next.js, Framer Motion &amp; attention to detail
        </motion.p>
      </div>
    </SectionWrapper>
  );
}