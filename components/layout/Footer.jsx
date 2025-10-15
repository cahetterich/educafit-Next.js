'use client';
import React from 'react';
import Link from 'next/link';
import { t, tx } from '../../lib/i18n';

export default function Footer(){
  return (
    <footer className="mt-6 border-t border-[color:var(--edu-border)] dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="container-edu py-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <img src="/icon-192.png" alt="EducaFit" className="w-6 h-6"/>
              <strong>EducaFit</strong>
            </div>
            <p className="muted">{t('footer.tagline')}</p>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="font-extrabold mb-2">{t('footer.nav_title')}</div>
              <ul className="space-y-1 text-sm">
                <li><Link href="/">{t('nav.home')}</Link></li>
                <li><Link href="/login">{t('nav.login')}</Link></li>
                <li><Link href="/signup">{t('nav.signup')}</Link></li>
                <li><Link href="/recovery">{t('nav.recovery')}</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-extrabold mb-2">{t('footer.contact_title')}</div>
              <ul className="space-y-1 text-sm">
                <li>{t('footer.email')}</li>
                <li>Instagram • GitHub</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="sep"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-sm muted">
          <span>{tx('footer.copyright', { year: new Date().getFullYear() })}</span>
          <span>{t('footer.made_in_br')}</span>
        </div>
      </div>
    </footer>
  );
}
