// middleware.js
import { NextResponse } from 'next/server';

const RULES = [
  { startsWith: '/aluno', allow: ['aluno'] },
  { startsWith: '/professor', allow: ['professor'] },
  { startsWith: '/escola', allow: ['escola'] },
];

export function middleware(req) {
  const role = req.cookies.get('edufit.role')?.value;
  const path = req.nextUrl.pathname;

  const rule = RULES.find(r => path.startsWith(r.startsWith));
  if (!rule) return NextResponse.next();

  if (!role || !rule.allow.includes(role)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Protege as rotas por papel
export const config = {
  matcher: ['/aluno/:path*', '/professor/:path*', '/escola/:path*'],
};
