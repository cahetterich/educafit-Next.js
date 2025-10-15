// app/(app)/professor/relatorios/page.jsx
'use client';
import Card from '../../../../components/ui/Card';
import { useEffect, useMemo, useState } from 'react';

const AKEY = 'edufit.prof.atividades';
const TKEY = 'edufit.turmas.v2';

// função pseudo-estável: mesma atividade → mesmo % aproximado
function stablePct(id, turmaSize){
  const seed = id.split('').reduce((a,c)=>a+c.charCodeAt(0),0);
  const base = 35 + (seed % 45); // 35..79
  const ajuste = turmaSize ? Math.min(15, Math.round(200/turmaSize)) : 0;
  return Math.min(95, base + ajuste);
}

export default function ProfRelatoriosPage(){
  const [ativs, setAtivs] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(()=>{
    try{ setAtivs(JSON.parse(localStorage.getItem(AKEY)||'[]')); }catch{}
    try{ setTurmas(JSON.parse(localStorage.getItem(TKEY)||'[]')); }catch{}
  },[]);

  const linhas = useMemo(()=>{
    const byTurmaSize = Object.fromEntries(turmas.map(t=>[t.nome, t.emails.length]));
    return ativs
      .sort((a,b)=> a.data.localeCompare(b.data))
      .map(a=>{
        const size = byTurmaSize[a.turma] ?? 30; // default 30 alunos
        const taxa = stablePct(a.id, size);
        return { ...a, taxa, size };
      });
  },[ativs, turmas]);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Relatórios</h1>
        <p className="muted">Engajamento por atividade (demo, sem back-end). A taxa considera o tamanho da turma.</p>
      </header>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="text-left p-3">Data</th>
              <th className="text-left p-3">Turma</th>
              <th className="text-left p-3">Atividade</th>
              <th className="text-right p-3">Alunos</th>
              <th className="text-right p-3">Taxa concl.</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map(l=>(
              <tr key={l.id} className="border-t border-[color:var(--edu-border)]">
                <td className="p-3">{new Date(l.data).toLocaleDateString()}</td>
                <td className="p-3">{l.turma}</td>
                <td className="p-3">{l.titulo}</td>
                <td className="p-3 text-right">{l.size}</td>
                <td className="p-3 text-right">
                  <span className="inline-flex items-center gap-2">
                    <b>{l.taxa}%</b>
                    <span className="w-24 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <span className="block h-2 bg-primary" style={{width:`${l.taxa}%`}}/>
                    </span>
                  </span>
                </td>
              </tr>
            ))}
            {!linhas.length && <tr><td className="p-4 muted" colSpan={5}>Crie atividades para ver os indicadores.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

