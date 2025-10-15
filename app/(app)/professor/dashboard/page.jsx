// app/(app)/professor/dashboard/page.jsx
'use client';
import Card from '../../../../components/ui/Card';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const AKEY = 'edufit.prof.atividades';
const TKEY = 'edufit.turmas.v2';

export default function ProfDashboardPage(){
  const [ativs, setAtivs] = useState([]);
  const [turmas, setTurmas] = useState([]);

  useEffect(()=>{
    try{ setAtivs(JSON.parse(localStorage.getItem(AKEY)||'[]')); }catch{}
    try{ setTurmas(JSON.parse(localStorage.getItem(TKEY)||'[]')); }catch{}
  },[]);

  const hoje = new Date().toISOString().slice(0,10);
  const futuras = useMemo(()=> ativs.filter(a=>a.data>=hoje).sort((a,b)=>a.data.localeCompare(b.data)),[ativs, hoje]);
  const recentes = useMemo(()=> ativs.filter(a=>a.data<hoje).sort((a,b)=>b.data.localeCompare(a.data)).slice(0,3),[ativs, hoje]);

  const totalTurmas = turmas.length || 3;
  const totalAlunos = turmas.reduce((acc,t)=>acc+t.emails.length,0) || 30*totalTurmas;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Dashboard — Professor</h1>
        <p className="muted">Resumo rápido e atalhos para criação e acompanhamento.</p>
      </header>

      <div className="grid sm:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-xs opacity-70">Atividades futuras</div>
          <div className="text-2xl font-bold mt-1">{futuras.length}</div>
          <Link href="/professor/atividades" className="mt-3 inline-block text-sm text-primary hover:underline">Criar atividade →</Link>
        </Card>

        <Card className="p-4">
          <div className="text-xs opacity-70">Turmas & Alunos</div>
          <div className="text-2xl font-bold mt-1">{totalTurmas} turmas</div>
          <div className="text-xs opacity-70">{totalAlunos} alunos (demo)</div>
          <Link href="/professor/turmas" className="mt-3 inline-block text-sm text-primary hover:underline">Gerenciar turmas →</Link>
        </Card>

        <Card className="p-4">
          <div className="text-xs opacity-70">Relatórios</div>
          <div className="text-2xl font-bold mt-1">Engajamento</div>
          <Link href="/professor/relatorios" className="mt-3 inline-block text-sm text-primary hover:underline">Abrir relatórios →</Link>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Próximas atividades</h2>
            <Link href="/professor/atividades" className="text-sm text-primary hover:underline">Gerenciar</Link>
          </div>
          <ul className="mt-2 text-sm space-y-2">
            {futuras.slice(0,4).map(a=>(
              <li key={a.id} className="flex items-center justify-between border-t first:border-0 border-[color:var(--edu-border)] pt-2">
                <span>{new Date(a.data).toLocaleDateString()} • {a.turma} — <b>{a.titulo}</b></span>
                <span className="text-xs opacity-70">{a.duracaoMin}min • {a.tipo}</span>
              </li>
            ))}
            {!futuras.length && <li className="muted">Sem atividades futuras. Crie uma nova.</li>}
          </ul>
        </Card>

        <Card className="p-4">
          <h2 className="font-semibold">Atividades recentes</h2>
          <ul className="mt-2 text-sm space-y-2">
            {recentes.map(a=>(
              <li key={a.id} className="flex items-center justify-between border-t first:border-0 border-[color:var(--edu-border)] pt-2">
                <span>{new Date(a.data).toLocaleDateString()} • {a.turma} — <b>{a.titulo}</b></span>
                <span className="text-xs opacity-70">{a.duracaoMin}min • {a.tipo}</span>
              </li>
            ))}
            {!recentes.length && <li className="muted">Ainda não há atividades concluídas.</li>}
          </ul>
        </Card>
      </div>
    </div>
  );
}
