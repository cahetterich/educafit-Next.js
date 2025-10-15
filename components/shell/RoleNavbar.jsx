// components/shell/RoleNavbar.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

// Ícones — continuam no client
import {
  HomeIcon,
  CalendarDaysIcon,
  TrophyIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

const ICONS = {
  HomeIcon,
  CalendarDaysIcon,
  TrophyIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  BuildingLibraryIcon,
};

const MENU_BY_ROLE = {
  aluno: [
    { href: '/aluno/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/aluno/agenda', label: 'Agenda', icon: 'CalendarDaysIcon' },
    { href: '/aluno/desafios', label: 'Desafios', icon: 'TrophyIcon' },
    { href: '/aluno/videos', label: 'Vídeos', icon: 'VideoCameraIcon' },
    { href: '/aluno/mural', label: 'Mural', icon: 'ChatBubbleOvalLeftIcon' },
    { href: '/aluno/configuracoes', label: 'Config.', icon: 'Cog6ToothIcon' },
  ],
  professor: [
    { href: '/professor/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/professor/turmas', label: 'Turmas', icon: 'UsersIcon' },
    { href: '/professor/atividades', label: 'Atividades', icon: 'CalendarDaysIcon' },
    { href: '/professor/relatorios', label: 'Relatórios', icon: 'ChartBarIcon' },
    { href: '/professor/config', label: 'Config.', icon: 'Cog6ToothIcon' },
  ],
  escola: [
    { href: '/escola/dashboard', label: 'Dashboard', icon: 'HomeIcon' },
    { href: '/escola/indicadores', label: 'Indicadores', icon: 'BuildingLibraryIcon' },
    { href: '/escola/relatorios', label: 'Relatórios', icon: 'ChartBarIcon' },
    { href: '/escola/config', label: 'Config.', icon: 'Cog6ToothIcon' },
  ],
};

export default function RoleNavbar({ role }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menu = MENU_BY_ROLE[role] ?? MENU_BY_ROLE.aluno;

  // estilos reutilizáveis para ficar idêntico à pública
  const wrapCls =
    'sticky top-0 z-40 border-b border-[color:var(--edu-border)] bg-[color:var(--edu-surface)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--edu-surface)]/70';
  const barCls =
    'container-edu h-16 flex items-center justify-between'; // mesma altura da pública
  const brandCls = 'flex items-center gap-2';
  const pillBase =
    'inline-flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm transition-colors ' +
    'hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40';
  const pillActive =
    'bg-primary/10 text-primary font-semibold ring-1 ring-inset ring-primary/20';
  const pillIdle = 'text-[color:var(--edu-fg-muted)]';

  return (
    <header className={wrapCls} role="navigation" aria-label="Menu principal (área logada)">
      <div className={barCls}>
        {/* Brand + chip do papel (mantém a identidade da pública) */}
        <div className={brandCls}>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white font-bold">
            EF
          </span>
          <div className="leading-tight">
            <div className="font-semibold">EducaFit</div>
            <div className="text-xs opacity-70 capitalize">{role}</div>
          </div>
        </div>

        {/* Desktop: nav em pílulas, mesma hierarquia visual da pública */}
        <nav className="hidden md:flex items-center gap-1">
          {menu.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = ICONS[item.icon] ?? HomeIcon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${pillBase} ${active ? pillActive : pillIdle}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ações rápidas compactas para não destoar da pública */}
        <div className="flex items-center gap-2">
          <Link
            href="/logout"
            className="rounded-2xl px-3.5 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Sair"
          >
            Sair
          </Link>
          <button
            className="md:hidden rounded-2xl px-3.5 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile: mesmo visual em coluna */}
      {open && (
        <div className="md:hidden border-t border-[color:var(--edu-border)] bg-[color:var(--edu-surface)]">
          <nav className="container-edu py-2 flex flex-col">
            {menu.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${pillBase} ${active ? pillActive : pillIdle}`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/logout"
              className="rounded-2xl px-3.5 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setOpen(false)}
            >
              Sair
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
