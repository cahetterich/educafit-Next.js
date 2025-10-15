'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearRole } from '../../lib/role';

export default function Logout() {
  const router = useRouter();
  useEffect(() => { clearRole(); router.replace('/login'); }, [router]);
  return null;
}
