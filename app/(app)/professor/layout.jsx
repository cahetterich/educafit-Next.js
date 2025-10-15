// app/(app)/professor/layout.jsx
import { cookies } from 'next/headers';
import AppShell from '../../../components/shell/AppShell';
import DemoSeed from '../../../components/prof/DemoSeed';

export const metadata = { title: 'Professor | EducaFit' };

export default function ProfessorLayout({ children }) {
  const role = cookies().get('edufit.role')?.value ?? 'professor';

  return (
    <>
      {/* Semeia turmas/atividades fake se ainda não existir */}
      <DemoSeed />
      {/* Shell com navbar de usuário logado */}
      <AppShell role={role}>
        {children}
      </AppShell>
    </>
  );
}
