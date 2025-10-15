'use client';
import Card from '../../../../components/ui/Card';
import { useState, useMemo } from 'react';
import { useTurmas } from '../../../_hooks/useTurmas';
import { useProfAtividades } from '../../../_hooks/useProfAtividades';

export default function ProfTurmasPage(){
  const { turmas, totalAlunos, addTurma, removeTurma, addEmails, removeEmail } = useTurmas();
  const { items } = useProfAtividades(); // para contar atividades por turma
  const [novoNome, setNovoNome] = useState('');
  const [csv, setCsv] = useState({}); // { turmaId: 'a@, b@' }

  const qtdAtivPorTurma = useMemo(() => {
    return items.reduce((acc,a)=>{ acc[a.turma]=(acc[a.turma]||0)+1; return acc; },{});
  }, [items]);

  function criarTurma(e){
    e.preventDefault();
    const nome = (novoNome||'').trim();
    if (!nome) return;
    addTurma(nome);
    setNovoNome('');
  }
  function addEmailsTurma(id){
    const str = (csv[id]||'').trim();
    if (!str) return;
    addEmails(id, str);
    setCsv(s=>({ ...s, [id]: '' }));
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Turmas</h1>
        <p className="muted">Crie turmas, inclua alunos por e-mail e visualize indicadores rápidos.</p>
      </header>

      {/* Criar turma — no topo, botão proporcional */}
      <Card className="p-4">
        <form onSubmit={criarTurma} className="flex flex-col sm:flex-row gap-2">
          <input className="input rounded-xl sm:w-64" placeholder="Ex.: 7C"
                 value={novoNome} onChange={e=>setNovoNome(e.target.value)} />
          <button className="rounded-xl px-4 py-2 text-sm bg-primary text-white hover:opacity-90">
            Adicionar turma
          </button>
        </form>
      </Card>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {turmas.map(t=>(
          <Card key={t.id} className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs opacity-70">Turma</div>
                <div className="text-2xl font-bold">{t.nome}</div>
              </div>
              <button className="text-sm text-red-600 dark:text-red-400 hover:underline"
                      onClick={()=>removeTurma(t.id)}>Remover</button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-xl border border-[color:var(--edu-border)] p-3">
                <div className="opacity-70 text-xs">Alunos</div>
                <div className="font-semibold">{t.emails.length}</div>
              </div>
              <div className="rounded-xl border border-[color:var(--edu-border)] p-3">
                <div className="opacity-70 text-xs">Atividades</div>
                <div className="font-semibold">{qtdAtivPorTurma[t.nome] || 0}</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs opacity-70">Adicionar alunos (e-mails separados por vírgula)</label>
              <div className="flex gap-2">
                <input className="input rounded-xl flex-1"
                       value={csv[t.id]||''}
                       onChange={e=>setCsv(s=>({...s,[t.id]:e.target.value}))}
                       placeholder="ana@..., joao@..., ..." />
                <button className="rounded-xl px-3 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                        onClick={()=>addEmailsTurma(t.id)}>Adicionar</button>
              </div>
            </div>

            <details className="mt-1">
              <summary className="cursor-pointer text-sm text-primary">Alunos</summary>
              <ul className="mt-2 space-y-1 text-sm">
                {t.emails.map(e=>(
                  <li key={e} className="flex items-center justify-between">
                    <span className="truncate">{e}</span>
                    <button className="text-red-600 dark:text-red-400 hover:underline text-xs"
                            onClick={()=>removeEmail(t.id, e)}>remover</button>
                  </li>
                ))}
                {!t.emails.length && <li className="muted">Nenhum aluno cadastrado.</li>}
              </ul>
            </details>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <div className="text-sm">Total de turmas: <b>{turmas.length}</b> • Alunos cadastrados: <b>{totalAlunos}</b></div>
      </Card>
    </div>
  );
}


