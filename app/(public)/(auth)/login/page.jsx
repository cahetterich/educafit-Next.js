// app/(auth)/login/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '../../../../components/ui/Card';
import { t } from '../../../../lib/i18n';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import RolePicker from '../../../../components/auth/RolePicker';
import { getRole, dashboardPathFor } from '../../../../lib/role';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRoleState] = useState(null);

  useEffect(() => { setRoleState(getRole()); }, []);

  const isEmail = /.+@.+\..+/.test(email);
  const isPass = pass.length >= 4;
  const disabled = !(isEmail && isPass) || loading;

  async function onSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    setLoading(false);
    const currentRole = getRole();
    if (currentRole) router.push(dashboardPathFor(currentRole));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 mb-3 bg-white dark:bg-slate-900">
        <h1 className="h2">{t('login.title')}</h1>
      </div>

      <Card className="max-w-4xl">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">{t('login.email')}</label>
            <input
              type="email"
              className="input rounded-xl"
              placeholder="nome@escola.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={email ? !isEmail : undefined}
              aria-label={t('login.email')}
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">{t('login.pass')}</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                className="input rounded-xl pr-10"
                value={pass}
                onChange={e => setPass(e.target.value)}
                aria-label={t('login.pass')}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setShow(s => !s)}
                aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                title={show ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="muted">{t('login.hint')}</span>
              <Link href="/recovery" className="text-primary font-semibold hover:underline">
                {t('login.forgot')}
              </Link>
            </div>
          </div>

          <button type="submit" disabled={disabled} className="btn-gradient-blue">
            {loading ? '...' : t('login.cta')}
          </button>
        </form>

        {/* NOVO: seção integrada e alinhada ao Card */}
        <div className="mt-6 pt-6 border-t border-[color:var(--edu-border)] dark:border-slate-800">
          <RolePicker currentRole={role} />
        </div>
      </Card>
    </div>
  );
}

