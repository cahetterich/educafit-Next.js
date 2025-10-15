'use client';
import React from 'react';
import { t } from '../../lib/i18n';

export default function Hero(){
  return (
    <section className="mb-4">
      <div className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-5 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-transparent">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <span className="badge bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {t('home.badge_beta')}
            </span>
            <h1 className="h1 mt-2">EducaFit</h1>
            <p className="muted mt-1">{t('tagline')}</p>
            <div className="mt-3 flex gap-2">
              <a href="/login" className="btn btn-primary">{t('home.hero_login')}</a>
              <a href="/signup" className="btn btn-ghost">{t('home.hero_signup')}</a>
            </div>
          </div>

          <div className="relative w-40 h-40 md:w-56 md:h-56">
            <div className="absolute inset-0 rounded-full border border-[color:var(--edu-border)] dark:border-slate-800 bg-slate-50 dark:bg-slate-800"></div>
            <div className="absolute inset-2 rounded-full bg-white/50 dark:bg-slate-900/30"></div>
            <div className="relative w-full h-full grid place-items-center">
              <img src="/icon-192.png" alt="EducaFit" className="w-20 md:w-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
