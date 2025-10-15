// src/app/(site)/manifesto/page.jsx
'use client';
import React from 'react';
import Link from 'next/link';
import { t } from '../../../../lib/i18n';
import Card from '../../../../components/ui/Card';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function Section({ title, children }) {
  return (
    <section className="mt-4">
      {title ? <h2 className="h3 mb-2">{title}</h2> : null}
      <Card>{children}</Card>
    </section>
  );
}

function ValuesTimeline() {
  const items = [
    { t: t('home.v1_t'), d: t('home.v1_d') },
    { t: t('home.v2_t'), d: t('home.v2_d') },
    { t: t('home.v3_t'), d: t('home.v3_d') },
    { t: t('home.v4_t'), d: t('home.v4_d') },
    { t: t('home.v5_t'), d: t('home.v5_d') },
  ];
  return (
    <Card>
      <div className="space-y-4">
        {items.map((it, i) => (
          <div key={i} className="flex gap-3 py-1">
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-[color:var(--edu-border)] dark:bg-slate-700" />
              <div className="relative z-10 w-6 h-6 rounded-full grid place-items-center bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <span className="text-primary text-xs font-extrabold">{i + 1}</span>
              </div>
            </div>
            <div className="pl-4 -mt-0.5">
              <div className="font-extrabold">{it.t}</div>
              <div className="muted leading-relaxed">{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-2 items-start">
      <CheckCircleIcon className="w-5 h-5 mt-0.5 text-primary" />
      <span>{children}</span>
    </li>
  );
}

export default function ManifestoPage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <section className="mt-2 mb-3">
        <h1 className="h2 mb-1">{t('manifesto.title')}</h1>
        <p className="muted">{t('tagline')}</p>
      </section>

      <Section title="">
        <p className="leading-relaxed">{t('manifesto.intro')}</p>
      </Section>

      <section className="mt-4">
        <h2 className="h3 mb-2">{t('home.values')}</h2>
        <ValuesTimeline />
      </section>

      <Section title={t('manifesto.commitments_title')}>
        <p className="leading-relaxed">{t('manifesto.commitments_p')}</p>
      </Section>

      <Section title={t('manifesto.privacy_title')}>
        <ul className="space-y-2 text-[15px]">
          <Bullet>{t('manifesto.privacy_b1')}</Bullet>
          <Bullet>{t('manifesto.privacy_b2')}</Bullet>
          <Bullet>{t('manifesto.privacy_b3')}</Bullet>
          <Bullet>{t('manifesto.privacy_b4')}</Bullet>
        </ul>
      </Section>

      <Section title={t('manifesto.a11y_title')}>
        <ul className="space-y-2 text-[15px]">
          <Bullet>{t('manifesto.a11y_b1')}</Bullet>
          <Bullet>{t('manifesto.a11y_b2')}</Bullet>
          <Bullet>{t('manifesto.a11y_b3')}</Bullet>
          <Bullet>{t('manifesto.a11y_b4')}</Bullet>
        </ul>
      </Section>

      <Section title={t('manifesto.impact_title')}>
        <p className="leading-relaxed mb-3">{t('manifesto.impact_p')}</p>
        <ul className="space-y-2 text-[15px]">
          <Bullet>{t('manifesto.impact_b1')}</Bullet>
          <Bullet>{t('manifesto.impact_b2')}</Bullet>
        </ul>
      </Section>

      <Section title={t('manifesto.tech_title')}>
        <p className="leading-relaxed">{t('manifesto.tech_p')}</p>
      </Section>

      <div className="mt-4">
        <Link href="/" className="font-extrabold underline">
          {t('manifesto.back')}
        </Link>
      </div>
    </div>
  );
}
