import type { Locale } from '@/types';
import en from '@/i18n/en.json';
import fa from '@/i18n/fa.json';
import ar from '@/i18n/ar.json';

const translations = { en, fa, ar } as const;
export type Translation = typeof en;

export function getTranslation(locale: Locale): Translation {
  return translations[locale];
}

export function t(locale: Locale, path: string): string {
  const keys = path.split('.');
  let current: unknown = translations[locale];
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function isRTL(locale: Locale): boolean {
  return locale === 'fa' || locale === 'ar';
}

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
  ar: 'العربية',
};

export const LOCALES: Locale[] = ['en', 'fa', 'ar'];