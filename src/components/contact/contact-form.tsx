'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, User, Phone, FileText, AlertCircle } from 'lucide-react';
import { useApp } from '@/components/providers/app-provider';
import { GlassPanel } from '@/components/shared/glass-panel';
import { api, ApiError } from '@/lib/api';
import { tokens } from '@/config/design-tokens';
import { cn } from '@/lib/utils';

interface FormErrors {
  fullname?: string;
  phone?: string;
  description?: string;
}

export function ContactForm() {
  const { t } = useApp();
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullname.trim()) {
      newErrors.fullname = t.contact.required;
    } else if (fullname.trim().length < 3) {
      newErrors.fullname = 'نام باید حداقل ۳ کاراکتر باشد';
    }

    if (!phone.trim()) {
      newErrors.phone = t.contact.required;
    } else if (!/^09[0-9]{9}$/.test(phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = t.contact.invalid_phone;
    }

    if (description.trim().length > 0 && description.trim().length < 10) {
      newErrors.description = 'توضیحات باید حداقل ۱۰ کاراکتر باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await api.contact.submit({
        fullname: fullname.trim(),
        phone: phone.trim().replace(/\s+/g, ''),
        description: description.trim() || undefined,
      });
      setShowSuccess(true);
      setFullname('');
      setPhone('');
      setDescription('');
    } catch (err) {
      if (err instanceof ApiError && err.body) {
        const body = err.body as Record<string, unknown>;
        // Handle NestJS validation errors array
        if (Array.isArray(body.message)) {
          const fieldErrors: FormErrors = {};
          for (const msg of body.message) {
            if (typeof msg === 'string') {
              if (msg.includes('نام') || msg.toLowerCase().includes('fullname')) fieldErrors.fullname = msg;
              else if (msg.includes('موبایل') || msg.toLowerCase().includes('phone')) fieldErrors.phone = msg;
              else if (msg.includes('توضیحات') || msg.toLowerCase().includes('description')) fieldErrors.description = msg;
              else setApiError(msg);
            }
          }
          setErrors(fieldErrors);
        } else if (typeof body.message === 'string') {
          setApiError(body.message);
        } else {
          setApiError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
        }
      } else {
        setApiError('خطایی رخ داد. لطفاً دوباره تلاش کنید.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearFieldError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    if (apiError) setApiError('');
  };

  const fieldBase = 'w-full rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/20';

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.ease.out }}
      >
        <GlassPanel variant="strong" className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              {t.contact.form_title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t.contact.form_subtitle}
            </p>
          </div>

          {/* API-level error */}
          <AnimatePresence>
            {apiError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{apiError}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Fullname */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                <User size={14} className="text-muted-foreground/40" />
              </div>
              <input
                type="text"
                value={fullname}
                onChange={(e) => { setFullname(e.target.value); clearFieldError('fullname'); }}
                placeholder={t.contact.fullname_placeholder}
                className={cn(fieldBase, 'ps-10', errors.fullname && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20')}
                disabled={isSubmitting}
              />
              {errors.fullname && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-[11px] text-red-400">
                  {errors.fullname}
                </motion.p>
              )}
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                <Phone size={14} className="text-muted-foreground/40" />
              </div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }}
                placeholder={t.contact.phone_placeholder}
                style={{ direction: 'rtl', textAlign: 'right' }}
                className={cn(fieldBase, 'ps-10', errors.phone && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20')}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-[11px] text-red-400">
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Description */}
            <div className="relative">
              <div className="pointer-events-none absolute start-0 top-3 flex items-center ps-4">
                <FileText size={14} className="text-muted-foreground/40" />
              </div>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); clearFieldError('description'); }}
                placeholder={t.contact.description_placeholder}
                rows={3}
                className={cn(fieldBase, 'ps-10 resize-none', errors.description && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20')}
                disabled={isSubmitting}
              />
              {errors.description && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1 text-[11px] text-red-400">
                  {errors.description}
                </motion.p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-200',
                isSubmitting
                  ? 'bg-primary/50 text-primary-foreground/60 cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer',
              )}
              whileHover={isSubmitting ? {} : { scale: 1.01 }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.span
                    className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  {t.contact.submitting}
                </>
              ) : (
                <>
                  <Send size={14} />
                  {t.contact.submit}
                </>
              )}
            </motion.button>
          </form>
        </GlassPanel>
      </motion.div>

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSuccess(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="relative z-10 w-full max-w-sm rounded-2xl p-8 text-center"
              style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: tokens.motion.duration.normal, ease: tokens.motion.ease.out }}
            >
              <motion.div
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 15 }}
              >
                <CheckCircle2 className="h-7 w-7 text-emerald-400" />
              </motion.div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {t.contact.success_title}
              </h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                {t.contact.success_message}
              </p>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 cursor-pointer"
              >
                {t.contact.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
