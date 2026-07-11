'use client';

import type { ReactNode } from 'react';
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
    <div
      className={cn(variantClass[variant], 'rounded-2xl transition-transform duration-300 ease-out hover:-translate-y-1', className)}
    >
      {children}
    </div>
  );
}