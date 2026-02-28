'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export type Theme = 'night' | 'bright';

const STORAGE_KEY = 'bowani-theme';

export function ThemeSwitcher() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initial: Theme = stored === 'bright' || stored === 'night' ? stored : 'night';
    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggle = () => {
    const next = theme === 'bright' ? 'night' : 'bright';
    setTheme(next);
  };

  if (theme === null) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate/50 bg-transparent" aria-hidden />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'bright' ? 'Switch to night mode' : 'Switch to bright mode'}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate/50 text-foreground transition-colors hover:bg-slate/20"
    >
      {theme === 'bright' ? (
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      ) : (
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      )}
    </button>
  );
}
