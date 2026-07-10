'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlassVariant = 'default' | 'strong' | 'subtle';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: GlassVariant;
}

const variantClass: Record<GlassVariant, string> = {
  default: 'glass',
  strong: 'glass-strong',
  subtle: 'glass-subtle',
};

/**
 * GlassPanel
 *
 * A reusable glass-morphism container. Wraps children in a frosted-glass
 * panel with a subtle hover lift effect powered by Framer Motion.
 */
export function GlassPanel({
  children,
  className,
  variant = 'default',
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn(variantClass[variant], 'rounded-2xl', className)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
}