'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/components/providers/app-provider';
import { api } from '@/lib/api';
import { tokens } from '@/config/design-tokens';
import type { ChatMessage } from '@/types';

interface AiChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Simple regex-based markdown renderer ─────────────────────── */

function renderMarkdown(text: string) {
  // Split by lines first to handle block-level elements
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, i) => {
    const key = `line-${i}`;

    // Code blocks (``` ... ```)
    if (line.startsWith('```') && line.endsWith('```') && line.length > 6) {
      const code = line.slice(3, -3);
      elements.push(
        <code
          key={key}
          className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan-300"
        >
          {code}
        </code>,
      );
      return;
    }

    // Inline formatting — apply in order: bold, code, links
    let processed: React.ReactNode = line;

    // Bold: **text**
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    if (boldParts.length > 1) {
      processed = boldParts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={`${key}-b-${j}`} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    }

    // If processed is a string, apply inline code
    if (typeof processed === 'string') {
      const codeParts = processed.split(/(`[^`]+`)/g);
      if (codeParts.length > 1) {
        processed = codeParts.map((part, j) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return (
              <code
                key={`${key}-c-${j}`}
                className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-cyan-300"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          // Apply link detection on non-code parts
          const linkParts = part.split(/(\[([^\]]+)\]\(([^)]+)\))/g);
          if (linkParts.length > 1) {
            return linkParts.map((lp, k) => {
              const linkMatch = lp.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                return (
                  <a
                    key={`${key}-l-${j}-${k}`}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80"
                  >
                    {linkMatch[1]}
                  </a>
                );
              }
              return lp;
            });
          }
          return part;
        });
      } else {
        // No inline code, but check for links
        const linkParts = processed.split(/(\[([^\]]+)\]\(([^)]+)\))/g);
        if (linkParts.length > 1) {
          processed = linkParts.map((lp, j) => {
            const linkMatch = lp.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
            if (linkMatch) {
              return (
                <a
                  key={`${key}-l-${j}`}
                  href={linkMatch[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  {linkMatch[1]}
                </a>
              );
            }
            return lp;
          });
        }
      }
    }

    elements.push(
      <span key={key}>
        {processed}
        {i < lines.length - 1 && <br />}
      </span>,
    );
  });

  return elements;
}

/* ── Thinking indicator ───────────────────────────────────────── */

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-primary/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────── */

const GRACEFUL_ERROR =
  'The AI assistant will be available soon. This feature is being set up.';

export function AiChatWindow({ isOpen, onClose }: AiChatWindowProps) {
  const { t, rtl } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when window opens
  useEffect(() => {
    if (isOpen) {
      // Small delay so the animation starts first
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));
        const result = await api.chat.sendMessage(trimmed, history);

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: result.reply,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } catch {
        // Show graceful error instead of the raw error
        const errorMsg: ChatMessage = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: GRACEFUL_ERROR,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [messages, isLoading],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(input);
      }
    },
    [input, sendMessage],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(suggestion);
    },
    [sendMessage],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            'fixed bottom-24 z-40 flex flex-col overflow-hidden rounded-2xl',
            'w-[calc(100vw-3rem)] sm:w-[380px] max-w-[calc(100vw-3rem)]',
            'h-[min(600px,70vh)]',
            'right-6',
          )}
          style={{ zIndex: tokens.zIndex.dotNav, backgroundColor: 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(24px)' }}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{
            duration: tokens.motion.duration.normal,
            ease: tokens.motion.ease.out,
          }}
        >
          {/* ── Gradient accent line ── */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground/90">
                {t.ai_assistant.title}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
              aria-label={t.resume.close}
            >
              <X size={14} />
            </button>
          </div>

          {/* ── Suggestions (shown when no messages) ── */}
          {messages.length === 0 && !isLoading && (
            <motion.div
              className="flex flex-wrap gap-2 px-4 pb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              {t.ai_assistant.suggestions.map((suggestion, i) => (
                <motion.button
                  key={i}
                  type="button"
                  className="glass rounded-full px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* ── Chat area ── */}
          <div className="flex-1 overflow-y-auto px-4 py-2">
            {messages.length === 0 && !isLoading && (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl glass">
                    <Brain size={20} className="text-primary/60" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.ai_assistant.placeholder}
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={cn(
                  'mb-3 flex',
                  msg.role === 'user'
                    ? rtl
                      ? 'justify-start'
                      : 'justify-end'
                    : rtl
                      ? 'justify-end'
                      : 'justify-start',
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: tokens.motion.ease.smooth }}
              >
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed',
                    msg.role === 'user'
                      ? 'glass-strong text-foreground'
                      : 'glass-subtle text-foreground/90',
                  )}
                >
                  {msg.role === 'assistant'
                    ? renderMarkdown(msg.content)
                    : msg.content}
                </div>
              </motion.div>
            ))}

            {/* Thinking indicator */}
            {isLoading && (
              <motion.div
                className={cn(
                  'mb-3 flex',
                  rtl ? 'justify-end' : 'justify-start',
                )}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="glass-subtle rounded-2xl px-3.5 py-2.5 text-[13px] text-muted-foreground">
                  {t.ai_assistant.thinking}
                  <ThinkingDots />
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* ── Input area ── */}
          <div className="border-t border-white/[0.06] px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl glass-subtle px-3 py-1.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.ai_assistant.placeholder}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                disabled={isLoading}
              />
              <motion.button
                type="button"
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                  input.trim() && !isLoading
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'text-muted-foreground/40',
                )}
                whileHover={input.trim() && !isLoading ? { scale: 1.08 } : {}}
                whileTap={input.trim() && !isLoading ? { scale: 0.92 } : {}}
                disabled={!input.trim() || isLoading}
                onClick={() => sendMessage(input)}
                aria-label="Send message"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}