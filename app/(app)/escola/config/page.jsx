'use client';
import { useState } from 'react';
import Card from '../../../../components/ui/Card';

export default function EscolaConfigPage(){
  const [escola, setEscola] = useState({
    nome:'Escola Modelo SP',
    cidade:'São Paulo',
    uf:'SP',
    rede:'Municipal',
    anoLetivo:'2025'
  });
  const [prefs, setPrefs] = useState({
    idioma:'pt-BR',
    tema:'light',
    duracaoPadrao:20
  });
  const [saved, setSaved] = useState({});

  function mark(k){ setSaved(s=>({...s,[k]:true})); setTimeout(()=>setSaved(s=>({...s,[k]:false})),1200); }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Configurações — Escola</h1>
        <p className="muted">Ajustes institucionais e do portal (demo).</p>
      </header>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Dados da escola</h2>
          {saved.a && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div><label className="block text-sm font-medium mb-1">Nome</label>
            <input className="input rounded-xl w-full" value={escola.nome} onChange={e=>setEscola({...escola,nome:e.target.value})}/></div>
          <div><label className="block text-sm font-medium mb-1">Cidade</label>
            <input className="input rounded-xl w-full" value={escola.cidade} onChange={e=>setEscola({...escola,cidade:e.target.value})}/></div>
          <div><label className="block text-sm font-medium mb-1">UF</label>
            <input className="input rounded-xl w-full" value={escola.uf} onChange={e=>setEscola({...escola,uf:e.target.value})}/></div>
          <div><label className="block text-sm font-medium mb-1">Rede</label>
            <select className="input rounded-xl w-full" value={escola.rede} onChange={e=>setEscola({...escola,rede:e.target.value})}>
              <option>Municipal</option><option>Estadual</option><option>Privada</option>
            </select></div>
          <div><label className="block text-sm font-medium mb-1">Ano letivo</label>
            <input className="input rounded-xl w-full" value={escola.anoLetivo} onChange={e=>setEscola({...escola,anoLetivo:e.target.value})}/></div>
        </div>
        <div className="mt-3">
          <button className="btn-gradient-blue rounded-xl px-4 py-2 text-sm" onClick={()=>mark('a')}>Salvar</button>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Preferências do portal</h2>
          {saved.b && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          <div><label className="block text-sm font-medium mb-1">Idioma</label>
            <select className="input rounded-xl w-full" value={prefs.idioma} onChange={e=>setPrefs({...prefs,idioma:e.target.value})}>
              <option value="pt-BR">Português (Brasil)</option><option value="en">English</option>
            </select></div>
          <div><label className="block text-sm font-medium mb-1">Tema</label>
            <select className="input rounded-xl w-full" value={prefs.tema} onChange={e=>setPrefs({...prefs,tema:e.target.value})}>
              <option value="light">Claro</option><option value="dark">Escuro</option>
            </select></div>
          <div><label className="block text-sm font-medium mb-1">Duração padrão (min)</label>
            <input type="number" min={5} className="input rounded-xl w-full" value={prefs.duracaoPadrao}
                   onChange={e=>setPrefs({...prefs,duracaoPadrao:Number(e.target.value||0)})}/></div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700" onClick={()=>mark('b')}>Salvar</button>
          <button className="rounded-xl px-4 py-2 text-sm" title="Apenas visual">Convidar professor</button>
          <button className="rounded-xl px-4 py-2 text-sm" title="Atalho visual">Criar turma</button>
        </div>
      </Card>
    </div>
  );
}
