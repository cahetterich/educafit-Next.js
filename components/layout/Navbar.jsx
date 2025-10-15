'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { t, getLocale } from '../../lib/i18n';

/** Aplica/remover tema no <html> e persiste em cookie + localStorage */
function applyTheme(next) {
  const isDark = next === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  try {
    localStorage.setItem('eduTheme', next);
    document.cookie = `eduTheme=${next}; path=/; max-age=31536000`;
  } catch {}
}

function getInitialTheme() {
  try {
    const fromLS = localStorage.getItem('eduTheme');
    if (fromLS === 'dark' || fromLS === 'light') return fromLS;
  } catch {}
  // fallback: prefereça do sistema
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  // sincroniza na montagem (cliente)
  useEffect(() => {
    const th = getInitialTheme();
    setTheme(th);
    applyTheme(th);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggle}
      className="btn btn-ghost"
      aria-label={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
      title={theme === 'dark' ? 'Tema claro' : 'Tema escuro'}
    >
      {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
    </button>
  );
}

function LangToggle() {
  const locale = getLocale();
  const isPT = locale === 'pt-BR';

  return (
    <button
      onClick={() => {
        const next = isPT ? 'en' : 'pt-BR';
        try {
          localStorage.setItem('eduLocale', next);
          document.cookie = `eduLocale=${next}; path=/; max-age=31536000`;
        } catch {}
        // recarrega para o SSR vir com o locale correto (evita hydration mismatch)
        location.reload();
      }}
      className="btn btn-ghost flex items-center gap-1"
      aria-label="Idioma"
      title="Idioma"
    >
      <GlobeAltIcon className="w-5 h-5" />
      <span className="font-semibold text-sm">{isPT ? 'PT' : 'EN'}</span>
    </button>
  );
}

function NavItem({ href, children }) {
  const pathname = usePathname();
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

  const activeCls =
    'px-4 py-2 rounded-xl font-extrabold bg-slate-100 dark:bg-slate-800 border border-[color:var(--edu-border)] dark:border-slate-700';
  const inactiveCls =
    'px-2 py-2 font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white';

  return (
    <Link href={href} className={isActive ? activeCls : inactiveCls}>
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/80 backdrop-blur border-b border-[color:var(--edu-border)] dark:border-slate-800">
      <div className="container-edu py-3 flex items-center justify-between">
        {/* Marca */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/icon-192.png" alt="EducaFit" className="w-7 h-7 rounded-md" />
          <strong>EducaFit</strong>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          <NavItem href="/">{t('nav.home')}</NavItem>
          <NavItem href="/login">{t('nav.login')}</NavItem>
          <NavItem href="/signup">{t('nav.signup')}</NavItem>
          <NavItem href="/recovery">{t('nav.recovery')}</NavItem>
          <LangToggle />
          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden btn btn-ghost"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          title="Menu"
        >
          {open ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-[color:var(--edu-border)] dark:border-slate-800">
          <div className="container-edu py-2 flex flex-col gap-2">
            <NavItem href="/">{t('nav.home')}</NavItem>
            <NavItem href="/login">{t('nav.login')}</NavItem>
            <NavItem href="/signup">{t('nav.signup')}</NavItem>
            <NavItem href="/recovery">{t('nav.recovery')}</NavItem>
            <div className="flex gap-2 pt-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
