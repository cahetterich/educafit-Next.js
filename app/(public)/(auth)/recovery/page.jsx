// app/(auth)/recovery/page.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Card from '../../../../components/ui/Card';
import { t } from '../../../../lib/i18n';

export default function RecoveryPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmail = /.+@.+\..+/.test(email);
  const disabled = !isEmail || loading;

  async function onSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    // TODO: integrar com backend
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Título */}
      <div className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 mb-3 bg-white dark:bg-slate-900">
        <h1 className="h2">{t('recovery.title')}</h1>
      </div>

      <Card>
        {!sent ? (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">{t('recovery.email')}</label>
              <input
                type="email"
                className="input rounded-xl"
                placeholder="nome@escola.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                aria-invalid={email ? !isEmail : undefined}
              />
            </div>

            <button type="submit" disabled={disabled} className="btn-gradient-blue">
              {loading ? '...' : t('recovery.send')}
            </button>

            <div className="text-center text-sm mt-2">
              <Link href="/login" className="muted hover:underline">
                {t('recovery.back')}
              </Link>
            </div>
          </form>
        ) : (
          <div className="py-2">
            <p className="leading-relaxed">{t('recovery.sent')}</p>
            <div className="text-center text-sm mt-3">
              <Link href="/login" className="text-primary font-semibold hover:underline">
                {t('recovery.back')}
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
