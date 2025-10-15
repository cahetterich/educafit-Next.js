// lib/role.js
export function setRole(role) {
  document.cookie = `edufit.role=${role}; path=/; max-age=86400; samesite=lax`;
  const user = {
    role,
    userId: (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
    name: role === 'aluno' ? 'Aluno Demo' : role === 'professor' ? 'Prof. Demo' : 'Coord. Demo',
  };
  localStorage.setItem('edufit.user', JSON.stringify(user));
  return user;
}

export function getRole() {
  const m = document.cookie.match(/(?:^| )edufit\.role=([^;]+)/);
  return m?.[1] ?? null;
}

export function clearRole() {
  document.cookie = 'edufit.role=; path=/; max-age=0; samesite=lax';
  localStorage.removeItem('edufit.user');
}

export function dashboardPathFor(role) {
  if (role === 'aluno') return '/aluno/dashboard';
  if (role === 'professor') return '/professor/dashboard';
  if (role === 'escola') return '/escola/dashboard';
  return '/login';
}
