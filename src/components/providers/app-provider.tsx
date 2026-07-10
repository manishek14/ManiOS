'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Locale } from '@/types';
import { getTranslation, isRTL, LOCALES, LOCALE_LABELS, type Translation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface AppContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translation;
  rtl: boolean;
  loadingComplete: boolean;
  setLoadingComplete: (v: boolean) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [loadingComplete, setLoadingComplete] = useState(false);
  const rtl = isRTL(locale);
  const t = getTranslation(locale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  useEffect(() => {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, rtl]);

  return (
    <AppContext.Provider value={{ locale, setLocale, t, rtl, loadingComplete, setLoadingComplete }}>
      <div className={cn('min-h-screen', rtl && 'rtl')}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export { LOCALES, LOCALE_LABELS };