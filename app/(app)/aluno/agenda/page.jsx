'use client';
import Card from '../../../../components/ui/Card';
import { useAgenda } from '../../../_hooks/useAgenda';

export default function AgendaAlunoPage() {
  const { atividadesByDate, resumo, toggleConclusao } = useAgenda();

  return (
    <div className="space-y-6">
      {/* PageHeader */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Agenda</h1>
        <p className="muted">Veja suas atividades e marque como concluídas para somar pontos.</p>

        {/* Progresso simples */}
        <div className="mt-4">
          <div className="text-sm mb-1">
            Progresso da semana: <b>{resumo.concluidas}</b> de <b>{resumo.total}</b> ({resumo.perc}%)
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-[width] duration-300"
              style={{ width: `${resumo.perc}%` }}
              aria-label={`Progresso ${resumo.perc}%`}
            />
          </div>
        </div>
      </header>

      {/* Lista agrupada por data */}
      <div className="space-y-6">
        {Object.keys(atividadesByDate).sort().map(data => (
          <section key={data} className="space-y-3">
            <h2 className="text-sm font-semibold opacity-70">
              {new Date(data).toLocaleDateString()}
            </h2>

            {atividadesByDate[data].map(a => (
              <Card key={a.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">{a.turma}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 capitalize">{a.tipo}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">{a.duracaoMin}min</span>
                  </div>
                  <h3 className="font-semibold">{a.titulo}</h3>
                  <p className="muted">{a.descricao}</p>
                  {a.videos?.length ? (
                    <p className="text-xs opacity-70">Vídeos: {a.videos.join(', ')}</p>
                  ) : null}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'text-xs px-2 py-1 rounded-full',
                      a.status === 'concluida'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
                    ].join(' ')}
                  >
                    {a.status === 'concluida' ? 'Concluída' : 'Pendente'}
                  </span>

                  <button
                    className={[
                      'btn',
                      a.status === 'concluida' ? 'bg-slate-200 dark:bg-slate-800' : 'btn-gradient-blue',
                      'rounded-xl',
                    ].join(' ')}
                    onClick={() => toggleConclusao(a.id)}
                    aria-pressed={a.status === 'concluida'}
                  >
                    {a.status === 'concluida' ? 'Desfazer' : 'Concluir'}
                  </button>
                </div>
              </Card>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
