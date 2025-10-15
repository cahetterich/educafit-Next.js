'use client';
import React from 'react';
import Card from '../ui/Card';
import { t } from '../../lib/i18n';

export default function Values(){
  const items = [
    { t: t('home.v1_t'), d: t('home.v1_d') },
    { t: t('home.v2_t'), d: t('home.v2_d') },
    { t: t('home.v3_t'), d: t('home.v3_d') },
    { t: t('home.v4_t'), d: t('home.v4_d') },
    { t: t('home.v5_t'), d: t('home.v5_d') },
  ];
  return (
    <section className="mt-4">
      <h2 className="h3 mb-2">{t('home.values')}</h2>
      <Card>
        <div className="space-y-4">
          {items.map((it, i)=> (
            <div key={i} className="flex gap-3 py-1">
              <div className="relative">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-[color:var(--edu-border)] dark:bg-slate-700" />
                <div className="relative z-10 w-6 h-6 rounded-full grid place-items-center bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                  <span className="text-primary text-xs font-extrabold">{i+1}</span>
                </div>
              </div>
              <div className="pl-4 -mt-0.5">
                <div className="font-extrabold">{it.t}</div>
                <div className="muted leading-relaxed">{it.d}</div>
              </div>
            </div>
          ))}
          <div className="pt-1">
            <a href="/manifesto" className="text-primary font-extrabold underline">{t('home.learn_more')} →</a>
          </div>
        </div>
      </Card>
    </section>
  );
}
