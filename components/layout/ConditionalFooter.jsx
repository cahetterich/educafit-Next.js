// components/layout/ConditionalFooter.jsx
'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAuth = /^\/(login|signup|recovery)(\/|$)/.test(pathname);
  if (isAuth) return null;
  return <Footer />;
}
