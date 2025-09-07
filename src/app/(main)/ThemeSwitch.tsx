'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useMemo, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';

const themes = [
  {
    label: '浅色模式',
    value: 'light',
    icon: BiSun,
  },
  {
    label: '深色模式',
    value: 'dark',
    icon: BiMoon,
  },
];
export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { setTheme, theme, resolvedTheme } = useTheme();
  const ThemeIcon = useMemo(
    () => themes.find(item => item.value === theme)?.icon,
    [theme],
  );

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  if (!ThemeIcon) return null;

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={toggleTheme}
      className='group flex items-center justify-between rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-4 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20'
    >
      <ThemeIcon className='h-5 w-5 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400' />
    </button>
  );
}
