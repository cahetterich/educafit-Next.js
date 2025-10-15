'use client';
import React from 'react';
import Card from '../ui/Card';
import Tag from '../ui/Tag';
import { t } from '../../lib/i18n';

export default function PlanCard({ title, bullets, cta, subtitle, highlight=false, tone='blue' }){
  const hasPrice = (title||'').includes('•');
  const [name, price] = String(title||'').split('•').map(s=>s.trim());
  const items = String(bullets||'').split('•').map(s=>s.trim()).filter(Boolean);
  const accent = tone==='orange' ? 'text-orange-500' : 'text-primary';

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <div className="h3">{name || title}</div>
          {hasPrice && <div className={`text-xl font-extrabold ${accent}`}>{price}</div>}
        </div>
        {highlight && <Tag tone="info">{t('home.most_popular')}</Tag>}
      </div>

      <div className="sep"></div>

      <ul className="space-y-1 text-sm">
        {items.map((it,i)=>(<li key={i}>• {it}</li>))}
      </ul>

      <div className="mt-3">
        {highlight ? (
          <a href="#" className="btn btn-primary bg-gradient-to-r from-orange-400 to-orange-500 hover:opacity-90">{cta}</a>
        ) : (
          <a href="#" className="btn btn-primary">{cta}</a>
        )}
      </div>

      {subtitle && <p className="muted mt-2">{subtitle}</p>}
    </Card>
  );
}
