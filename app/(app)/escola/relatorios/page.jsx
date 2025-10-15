'use client';
import Card from '../../../../components/ui/Card';
import { useEscolaData } from '../../../_hooks/useEscolaData';

export default function EscolaRelatoriosPage(){
  const { turmas, atividades, progress } = useEscolaData();

  const linhas = atividades.map(a=>{
    const turma = turmas.find(t=>t.nome===a.turma);
    const total = turma?.emails.length || 0;
    let concl=0;
    (turma?.emails||[]).forEach(e=>{
      if (progress[`${a.id}:${e}`]==='concluida') concl++;
    });
    const perc = total ? Math.round((concl/total)*100) : 0;
    return { data:a.data, turma:a.turma, professor:'Marina S. (demo)', atividade:a.titulo, total, concl, perc };
  });

  function exportCSV(){
    const header = ['Data','Turma','Professor','Atividade','Alunos','Concluíram','%'];
    const rows = linhas.map(l=>[l.data,l.turma,l.professor,l.atividade,l.total,l.concl,l.perc]);
    const csv = [header, ...rows].map(r=>r.join(';')).join('\n');
    const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'educafit-relatorios.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="h2">Relatórios</h1>
            <p className="muted">Engajamento por atividade (demo, sem back-end).</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl px-3 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">Filtrar</button>
            <button className="btn-gradient-blue rounded-xl px-3 py-2 text-sm" onClick={exportCSV}>Exportar CSV</button>
          </div>
        </div>
      </header>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr>
              {['Data','Turma','Professor','Atividade','Alunos','Concluíram','%'].map(h=>(
                <th key={h} className="text-left px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l,i)=>(
              <tr key={i} className="border-t border-[color:var(--edu-border)]">
                <td className="px-4 py-3">{l.data}</td>
                <td className="px-4 py-3">{l.turma}</td>
                <td className="px-4 py-3">{l.professor}</td>
                <td className="px-4 py-3">{l.atividade}</td>
                <td className="px-4 py-3">{l.total}</td>
                <td className="px-4 py-3">{l.concl}</td>
                <td className="px-4 py-3">{l.perc}%</td>
              </tr>
            ))}
            {!linhas.length && (
              <tr><td className="px-4 py-6 text-center muted" colSpan={7}>Crie atividades para ver os indicadores.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
