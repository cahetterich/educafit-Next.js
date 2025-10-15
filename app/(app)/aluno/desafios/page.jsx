'use client';
import Card from '../../../../components/ui/Card';
import { useDesafios } from '../../../_hooks/useDesafios';

export default function DesafiosAlunoPage() {
  const { aluno, badges, rankingTurma, pontosPorConclusao } = useDesafios();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Desafios & Pontos</h1>
        <p className="muted">Ganhe {pontosPorConclusao} pts por atividade concluída na Agenda. Desbloqueie badges e suba no ranking da turma.</p>

        {/* Estatísticas resumidas */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <Card className="p-4">
            <div className="text-xs opacity-70">Sua posição</div>
            <div className="text-2xl font-bold">{aluno.pos}º</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs opacity-70">Seus pontos</div>
            <div className="text-2xl font-bold">{aluno.pontos}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs opacity-70">Badges desbloqueadas</div>
            <div className="text-2xl font-bold">{badges.length}</div>
          </Card>
        </div>
      </header>

      {/* Badges */}
      <section>
        <h2 className="text-sm font-semibold opacity-70 mb-2">Suas badges</h2>
        <div className="flex flex-wrap gap-2">
          {badges.length ? badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 text-primary text-sm">
              🏅 {b}
            </span>
          )) : <span className="muted text-sm">Nenhuma ainda — conclua atividades para desbloquear.</span>}
        </div>
      </section>

      {/* Ranking */}
      <section>
        <h2 className="text-sm font-semibold opacity-70 mb-2">Ranking — Turma 7A</h2>
        <Card className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="text-left p-3">Pos.</th>
                <th className="text-left p-3">Nome</th>
                <th className="text-right p-3">Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingTurma.map((r) => (
                <tr key={r.ra} className={r.pos % 2 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50/40 dark:bg-slate-900/50'}>
                  <td className="p-3">{r.pos}º</td>
                  <td className="p-3">
                    {r.ra === 'A001' ? <b>{r.nome}</b> : r.nome}
                    {r.ra === 'A001' && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Você</span>}
                  </td>
                  <td className="p-3 text-right font-semibold">{r.pontos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>
    </div>
  );
}
