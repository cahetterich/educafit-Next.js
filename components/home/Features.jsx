'use client';
import React from 'react';
import Card from '../ui/Card';
import { t } from '../../lib/i18n';
import { BoltIcon, UsersIcon, ChartBarIcon, SparklesIcon, DevicePhoneMobileIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function Feature({ icon:Icon, title, desc }){
  return (
    <Card>
      <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 grid place-items-center mb-2">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="font-extrabold mb-1">{title}</div>
      <div className="muted text-sm">{desc}</div>
    </Card>
  );
}

export default function Features(){
  const data = [
    { icon:BoltIcon, title:t('home.f_gamification_t'), desc:t('home.f_gamification_d') },
    { icon:UsersIcon, title:t('home.f_tracking_t'),    desc:t('home.f_tracking_d') },
    { icon:ChartBarIcon, title:t('home.f_reports_t'),  desc:t('home.f_reports_d') },
    { icon:SparklesIcon, title:t('home.f_onboarding_t'), desc:t('home.f_onboarding_d') },
    { icon:DevicePhoneMobileIcon, title:t('home.f_pwa_t'), desc:t('home.f_pwa_d') },
    { icon:ShieldCheckIcon, title:t('home.f_privacy_t'), desc:t('home.f_privacy_d') },
  ];
  return (
    <section className="mt-4">
      <h2 className="h3 mb-2">{t('home.diffs')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((f,i)=>(<Feature key={i} {...f}/>))}
      </div>
    </section>
  );
}
