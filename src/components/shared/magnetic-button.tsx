'use client';

import type { ReactNode, MouseEvent } from 'react';
import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

/** Maximum displacement in pixels when cursor is at the edge of the button. */
const MAX_PULL = 8;

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * MagneticButton
 *
 * A button that subtly follows the cursor while hovering, then springs
 * back to its natural position on mouse leave. Uses Framer Motion
 * `useMotionValue` / `useSpring` / `useMotionTemplate` for 60 fps movement.
 */
export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  // Raw motion values for X / Y displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-smoothed versions
  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // Compose into a CSS transform string via useMotionTemplate
  const transform = useMotionTemplate`translateX(${smoothX}px) translateY(${smoothY}px)`;

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalise cursor offset to -1 … 1, then scale to MAX_PULL
      const pullX = ((e.clientX - centerX) / (rect.width / 2)) * MAX_PULL;
      const pullY = ((e.clientY - centerY) / (rect.height / 2)) * MAX_PULL;

      x.set(pullX);
      y.set(pullY);
    },
    [x, y],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}