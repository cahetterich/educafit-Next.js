// app/(app)/aluno/dashboard/page.jsx
'use client';
import Card from '../../../../components/ui/Card';
import { useAgenda } from '../../../_hooks/useAgenda';
import { useDesafios } from '../../../_hooks/useDesafios';
import { useVideos } from '../../../_hooks/useVideos';
import { useMural } from '../../../_hooks/useMural';
import Link from 'next/link';
import { useMemo } from 'react';

const USERKEY = 'edufit.user';
function loadUser() {
  try { return JSON.parse(localStorage.getItem(USERKEY) || '{}'); }
  catch { return {}; }
}

export default function AlunoDashboard() {
  const { resumo, atividadesByDate } = useAgenda();
  const { aluno, badges } = useDesafios();
  const { lista: videos } = useVideos();
  const { timeline } = useMural();
  const user = loadUser();

  // Próxima atividade (menor data >= hoje)
  const proxima = useMemo(() => {
    const hoje = new Date().toISOString().slice(0,10);
    const datas = Object.keys(atividadesByDate).sort();
    for (const d of datas) {
      if (d >= hoje) {
        return atividadesByDate[d][0];
      }
    }
    // se todas são passadas, pega a última do dataset
    const lastD = datas[datas.length - 1];
    return lastD ? atividadesByDate[lastD][0] : null;
  }, [atividadesByDate]);

  // Últimos do mural (2 posts)
  const recentesMural = timeline.slice(0, 2);

  // Vídeos recomendados (não assistidos, até 2)
  const recomendados = videos.filter(v => !v.watched).slice(0, 2);

  // IMC rápido
  const imc = useMemo(() => {
    const h = parseFloat(user.alturaCm)/100, w = parseFloat(user.pesoKg);
    if (!h || !w) return null;
    return +(w/(h*h)).toFixed(1);
  }, [user.alturaCm, user.pesoKg]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Dashboard — Aluno</h1>
        <p className="muted">Bem-vindo! Resumo da sua semana e atalhos rápidos.</p>
      </header>

      {/* Linha 1 — indicadores principais */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-xs opacity-70">Progresso da semana</div>
          <div className="text-lg font-semibold mt-1">{resumo.concluidas} / {resumo.total} ({resumo.perc}%)</div>
          <div className="h-2 mt-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-[width] duration-300" style={{width: `${resumo.perc}%`}}/>
          </div>
          <Link href="/aluno/agenda" className="mt-3 inline-block text-sm text-primary hover:underline">Ir para Agenda →</Link>
        </Card>

        <Card className="p-4">
          <div className="text-xs opacity-70">Pontos & Badges</div>
          <div className="text-lg font-semibold mt-1">{aluno.pontos} pts • {badges.length} badges</div>
          <div className="text-xs opacity-70">Sua posição: <b>{aluno.pos}º</b></div>
          <Link href="/aluno/desafios" className="mt-3 inline-block text-sm text-primary hover:underline">Ver ranking →</Link>
        </Card>

        <Card className="p-4">
          <div className="text-xs opacity-70">Saúde (estimativa)</div>
          <div className="text-lg font-semibold mt-1">
            {imc ? <>IMC <b>{imc}</b></> : <span className="muted">Informe altura e peso</span>}
          </div>
          <Link href="/aluno/configuracoes" className="mt-3 inline-block text-sm text-primary hover:underline">Atualizar medidas →</Link>
        </Card>
      </div>

      {/* Linha 2 — próxima atividade + vídeos recomendados */}
      <div className="grid lg:grid-cols-3 gap-3">
        <Card className="p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Próxima atividade</h2>
            <Link href="/aluno/agenda" className="text-sm text-primary hover:underline">Ver todas</Link>
          </div>
          {proxima ? (
            <div className="mt-2">
              <div className="text-sm opacity-70">{new Date(proxima.data).toLocaleDateString()} • Turma {proxima.turma}</div>
              <div className="mt-1 font-semibold">{proxima.titulo}</div>
              <div className="muted text-sm">{proxima.descricao}</div>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">{proxima.tipo}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">{proxima.duracaoMin}min</span>
              </div>
            </div>
          ) : <p className="muted mt-2">Sem atividades cadastradas.</p>}
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Vídeos recomendados</h2>
            <Link href="/aluno/videos" className="text-sm text-primary hover:underline">Ver todos</Link>
          </div>
          <ul className="mt-2 space-y-2 text-sm">
            {recomendados.length ? recomendados.map(v => (
              <li key={v.id} className="flex items-center justify-between">
                <span>{v.titulo}</span>
                <span className="text-xs opacity-70">{v.duracaoMin}min</span>
              </li>
            )) : <li className="muted">Você já assistiu todos os vídeos sugeridos. 🎉</li>}
          </ul>
        </Card>
      </div>

      {/* Linha 3 — mural recente */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Mural — recentes</h2>
          <Link href="/aluno/mural" className="text-sm text-primary hover:underline">Abrir mural</Link>
        </div>
        <div className="mt-2 space-y-3">
          {recentesMural.length ? recentesMural.map(p => (
            <div key={p.id} className="border-t first:border-0 border-[color:var(--edu-border)] pt-2">
              <div className="text-sm font-semibold">{p.autor}</div>
              <div className="text-xs opacity-70">{new Date(p.data).toLocaleString()}</div>
              <div className="mt-1">{p.texto}</div>
            </div>
          )) : <p className="muted">Sem publicações por enquanto.</p>}
        </div>
      </Card>
    </div>
  );
}
