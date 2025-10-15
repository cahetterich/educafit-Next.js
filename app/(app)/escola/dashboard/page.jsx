// app/escola/dashboard/page.jsx
'use client';
import Card from '../../../../components/ui/Card';
import { useEscolaData } from '../../../_hooks/useEscolaData';

export default function EscolaDashboardPage(){
  const { kpis, engajamentoPorTurma } = useEscolaData();

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Dashboard — Escola</h1>
        <p className="muted">Visão geral de turmas, professores e engajamento (demo).</p>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="p-4"><div className="text-xs opacity-70">Turmas ativas</div><div className="text-2xl font-bold">{kpis.turmas}</div></Card>
        <Card className="p-4"><div className="text-xs opacity-70">Professores</div><div className="text-2xl font-bold">{kpis.professores}</div></Card>
        <Card className="p-4"><div className="text-xs opacity-70">Alunos</div><div className="text-2xl font-bold">{kpis.alunos}</div></Card>
        <Card className="p-4"><div className="text-xs opacity-70">Atividades (7d)</div><div className="text-2xl font-bold">{kpis.atvSemana}</div></Card>
        <Card className="p-4"><div className="text-xs opacity-70">Taxa média</div><div className="text-2xl font-bold">{kpis.taxaMedia}%</div></Card>
      </section>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Engajamento por turma</h2>
          <span className="muted text-sm">% de alunos com ao menos 1 conclusão</span>
        </div>
        <div className="mt-4 space-y-3">
          {engajamentoPorTurma.map(row=>(
            <div key={row.turma}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium">{row.turma}</span>
                <span className="muted">{row.concl}/{row.alunos} • {row.perc}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                  style={{ width: `${Math.min(100,row.perc)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="font-semibold">Top turmas</h2>
        <ul className="mt-2 space-y-2">
          {engajamentoPorTurma.slice(0,3).map(t=>(
            <li key={t.turma} className="flex items-center justify-between">
              <span className="font-medium">{t.turma}</span>
              <span className="text-sm">{t.perc}%</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
