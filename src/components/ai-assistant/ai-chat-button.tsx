'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { tokens } from '@/config/design-tokens';
import { useApp } from '@/components/providers/app-provider';

interface AiChatButtonProps {
  onClick: () => void;
}

/**
 * AiChatButton
 *
 * A circular floating glass button with a Brain icon that triggers
 * the AI assistant chat window. Positioned opposite the back-to-top
 * button (bottom-left for LTR, bottom-right for RTL).
 *
 * Features a subtle pulsing glow animation and Framer Motion
 * hover/tap interactions.
 */
export function AiChatButton({ onClick }: AiChatButtonProps) {
  const { rtl } = useApp();

  return (
    <motion.button
      type="button"
      className={cn(
        'ai-chat-pulse fixed bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full glass-strong text-white/80 transition-colors hover:text-white',
        rtl ? 'left-6' : 'right-6',
      )}
      style={{ zIndex: tokens.zIndex.dotNav }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      aria-label="Open AI Assistant"
    >
      <Brain size={22} strokeWidth={2} />
    </motion.button>
  );
}