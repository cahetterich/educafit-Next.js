'use client';
import React from 'react';
import PlanCard from './PlanCard';
import { t } from '../../lib/i18n';

export default function Plans(){
  return (
    <section className="mt-3">
      <h2 className="h3 mb-2">{t('home.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <PlanCard
          title={t('home.basic')}
          bullets={t('home.bullets_basic')}
          cta={t('home.cta_basic')}
          subtitle={t('home.subtitle_basic')}
          tone="blue"
        />
        <PlanCard
          title={t('home.pro')}
          bullets={t('home.bullets_pro')}
          cta={t('home.cta_pro')}
          subtitle={t('home.subtitle_pro')}
          highlight
          tone="orange"
        />
        <PlanCard
          title={t('home.schools')}
          bullets={t('home.bullets_schools')}
          cta={t('home.cta_schools')}
          subtitle={t('home.subtitle_schools')}
          tone="blue"
        />
      </div>
    </section>
  );
}
