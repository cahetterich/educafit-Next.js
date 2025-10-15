// src/services/api.js (mobile)
const BASE = __DEV__
  ? 'http://192.168.0.10:3000' // IP da máquina na rede 
  : 'https://seu-deploy.vercel.app';

export async function apiLogin(email, pass) {
  const r = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pass }),
  });
  if (!r.ok) throw new Error('auth');
  return r.json();
}

export async function apiRecover(email) {
  await fetch(`${BASE}/api/auth/recover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return true;
}

export async function apiSignup({ name, email, pass, role }) {
  const r = await fetch(`${BASE}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, pass, role }),
  });
  if (!r.ok) throw new Error('signup');
  return r.json();
}
