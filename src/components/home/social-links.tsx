'use client';

import { useRef, useCallback, type MouseEvent, type ComponentType, type SVGProps } from 'react';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
};

const MAGNETIC_PULL = 6;
const SPRING_CONFIG = { stiffness: 300, damping: 20, mass: 0.5 };

interface SocialLinkButtonProps {
  platform: string;
  url: string;
  label: string;
}

function SocialLinkButton({ platform, url, label }: SocialLinkButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const hovered = useMotionValue(1);

  const smoothX = useSpring(x, SPRING_CONFIG);
  const smoothY = useSpring(y, SPRING_CONFIG);
  const smoothScale = useSpring(hovered, SPRING_CONFIG);

  const transform = useMotionTemplate`translateX(${smoothX}px) translateY(${smoothY}px) scale(${smoothScale})`;

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(((e.clientX - centerX) / (rect.width / 2)) * MAGNETIC_PULL);
      y.set(((e.clientY - centerY) / (rect.height / 2)) * MAGNETIC_PULL);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    hovered.set(1);
  }, [x, y, hovered]);

  const handleHoverStart = useCallback(() => {
    hovered.set(1.15);
  }, [hovered]);

  const Icon = ICON_MAP[platform];

  if (!Icon) return null;

  return (
    <motion.a
      ref={ref}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="glass social-glow rounded-xl p-2.5 text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={handleHoverStart}
    >
      <Icon className="size-4" />
    </motion.a>
  );
}

interface SocialLinksProps {
  className?: string;
}

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {SOCIAL_LINKS.map((link) => (
        <SocialLinkButton
          key={link.id}
          platform={link.platform}
          url={link.url}
          label={link.label}
        />
      ))}
    </div>
  );
}