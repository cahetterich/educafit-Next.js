'use client';
import React from 'react';
import Card from '../ui/Card';
import { t } from '../../lib/i18n';

export default function Purpose(){
  return (
    <section className="mt-4">
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center">💙</div>
          <div className="h3">{t('home.purpose_title')}</div>
        </div>
        <p className="leading-relaxed">{t('home.purpose_text')}</p>
      </Card>
    </section>
  );
}
