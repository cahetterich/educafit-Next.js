// app/(auth)/signup/page.jsx
'use client';
import React, { useState } from 'react';
import Card from '../../../../components/ui/Card';
import { t } from '../../../../lib/i18n';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [role, setRole] = useState('student');
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEmail = /.+@.+\..+/.test(email);
  const passOk = pass.length >= 6;
  const passMatch = pass && pass2 && pass === pass2;

  const disabled = !name || !isEmail || !passOk || !passMatch || loading;

  async function onSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    setLoading(true);
    // integrar com backend
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    console.log('signup', { name, email, role });
  }

  const Pill = ({ active, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'px-3 py-1.5 rounded-full border font-semibold bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/30 dark:border-blue-800'
          : 'px-3 py-1.5 rounded-full border font-semibold border-[color:var(--edu-border)] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
      }
    >
      {children}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Título */}
      <div className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 mb-3 bg-white dark:bg-slate-900">
        <h1 className="h2">{t('signup.title')}</h1>
      </div>

      <Card>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="block font-semibold mb-1">{t('signup.name')}</label>
            <input
              type="text"
              className="input rounded-xl"
              placeholder={t('signup.name')}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-1">{t('signup.email')}</label>
            <input
              type="email"
              className="input rounded-xl"
              placeholder="nome@escola.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={email ? !isEmail : undefined}
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block font-semibold mb-1">{t('signup.pass')}</label>
            <div className="relative">
              <input
                type={show1 ? 'text' : 'password'}
                className="input rounded-xl pr-12"
                placeholder={t('signup.pass_ph')}
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setShow1(s => !s)}
                aria-label={show1 ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {show1 ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            <div className="mt-2 text-sm muted">{t('signup.pass_ph')}</div>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block font-semibold mb-1">{t('signup.pass_confirm')}</label>
            <div className="relative">
              <input
                type={show2 ? 'text' : 'password'}
                className="input rounded-xl pr-12"
                placeholder={t('signup.pass_confirm')}
                value={pass2}
                onChange={e => setPass2(e.target.value)}
                aria-invalid={pass2 ? !passMatch : undefined}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setShow2(s => !s)}
                aria-label={show2 ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {show2 ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>
            {!passMatch && pass2 ? (
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">{t('signup.pass_mismatch')}</div>
            ) : null}
          </div>

          {/* Perfil */}
          <div>
            <label className="block font-semibold mb-2">{t('signup.profile')}</label>
            <div className="flex gap-3">
              <Pill active={role === 'student'} onClick={() => setRole('student')}>
                {t('signup.student')}
              </Pill>
              <Pill active={role === 'teacher'} onClick={() => setRole('teacher')}>
                {t('signup.teacher')}
              </Pill>
            </div>
          </div>

           <button type="submit" disabled={disabled} className="btn-gradient-blue">
            {loading ? '...' : t('signup.cta')}
          </button>
        </form>
      </Card>
    </div>
  );
}

