// app/aluno/layout.jsx
import { cookies } from 'next/headers';
import AppShell from '../../../components/shell/AppShell';

export const metadata = { title: 'Aluno | EducaFit' };

export default function AlunoLayout({ children }) {
  const role = cookies().get('edufit.role')?.value ?? 'aluno';
  return <AppShell role={role}>{children}</AppShell>;
}

