'use client';
import Card from '../../../../components/ui/Card';
import { useEscolaData } from '../../../_hooks/useEscolaData';

export default function EscolaIndicadoresPage(){
  const { turmas } = useEscolaData();

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Indicadores</h1>
        <p className="muted">Filtros e visualizações (somente demonstrativo).</p>
        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          <select className="input rounded-xl">
            <option>Todas as turmas</option>
            {turmas.map(t=><option key={t.id}>{t.nome}</option>)}
          </select>
          <select className="input rounded-xl">
            <option>Todos os professores</option>
            <option>Marina S.</option>
            <option>Rafael M.</option>
          </select>
          <select className="input rounded-xl">
            <option>Últimos 30 dias</option>
            <option>60 dias</option>
            <option>90 dias</option>
          </select>
        </div>
      </header>

      {/* Evolução (linha fake com gradiente) */}
      <Card className="p-4">
        <h2 className="font-semibold">Evolução semanal</h2>
        <div className="mt-3 h-36 rounded-2xl bg-gradient-to-tr from-blue-100 via-blue-50 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 relative overflow-hidden">
          <div className="absolute inset-x-4 bottom-4 h-20">
            {/* “linha” fake */}
            <div className="h-full w-full"
                 style={{backgroundImage:'linear-gradient(135deg, rgba(37,99,235,0.7) 2px, transparent 2px)', backgroundSize:'20px 20px'}}/>
          </div>
        </div>
      </Card>

      {/* Pizza Fake */}
      <Card className="p-4">
        <h2 className="font-semibold">Distribuição por categoria</h2>
        <div className="mt-3 flex items-center gap-6">
          <div className="w-40 h-40 rounded-full"
               style={{background:'conic-gradient(#2563eb 0 30%, #10b981 0 55%, #f59e0b 0 80%, #6366f1 0 100%)'}}/>
          <ul className="text-sm space-y-1">
            <li><span className="inline-block w-3 h-3 mr-2 rounded-sm bg-blue-600"/> Cardio (30%)</li>
            <li><span className="inline-block w-3 h-3 mr-2 rounded-sm bg-emerald-500"/> Mobilidade (25%)</li>
            <li><span className="inline-block w-3 h-3 mr-2 rounded-sm bg-amber-500"/> Força (25%)</li>
            <li><span className="inline-block w-3 h-3 mr-2 rounded-sm bg-indigo-500"/> Cooperativo (20%)</li>
          </ul>
        </div>
      </Card>

      {/* Heatmap Fake */}
      <Card className="p-4">
        <h2 className="font-semibold">Calor de participação</h2>
        <div className="mt-3 grid grid-cols-7 gap-1">
          {Array.from({length:28}).map((_,i)=>(
            <div key={i} className="aspect-square rounded"
                 style={{backgroundColor: ['#e5e7eb','#c7d2fe','#93c5fd','#60a5fa','#2563eb'][i%5]}}/>
          ))}
        </div>
      </Card>
    </div>
  );
}
