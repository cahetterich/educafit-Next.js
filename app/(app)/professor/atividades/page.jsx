'use client';
import Card from '../../../../components/ui/Card';
import { useState } from 'react';
import { useProfAtividades } from '../../../_hooks/useProfAtividades';
import { useTurmas } from '../../../_hooks/useTurmas';

export default function ProfAtividadesPage() {
  const { items, addAtividade, removeAtividade } = useProfAtividades();
  const { turmas } = useTurmas(); // <- garante array de turmas
  const nomesTurma = (turmas || []).map(t => t.nome); // fallback seguro

  const [form, setForm] = useState({
    data: new Date().toISOString().slice(0,10),
    turma: nomesTurma[0] || '7A',
    titulo: '',
    descricao: '',
    duracaoMin: 15,
    tipo: 'cardio',
    videos: ''
  });

  function submit(e){
    e.preventDefault();
    const id = addAtividade(form);
    setForm(f => ({ ...f, titulo:'', descricao:'', videos:'' }));
    alert(`Atividade criada (${id}). Ela já aparece na Agenda dos alunos (demo).`);
  }

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Atividades</h1>
        <p className="muted">Crie atividades da turma. Tudo é salvo localmente e fica visível na Agenda (demo).</p>
      </header>

      <Card className="p-4">
        <h2 className="font-semibold mb-3">Nova atividade</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Data</label>
            <input type="date" className="input rounded-xl w-full"
                   value={form.data} onChange={e=>setForm(s=>({...s, data:e.target.value}))}/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Turma</label>
            <select className="input rounded-xl w-full" value={form.turma}
                    onChange={e=>setForm(s=>({...s, turma:e.target.value}))}>
              {nomesTurma.map(t => (<option key={t} value={t}>{t}</option>))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Título</label>
            <input className="input rounded-xl w-full" value={form.titulo}
                   onChange={e=>setForm(s=>({...s, titulo:e.target.value}))}/>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea rows={3} className="input rounded-xl w-full resize-none"
                      value={form.descricao} onChange={e=>setForm(s=>({...s, descricao:e.target.value}))}/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duração (min)</label>
            <input type="number" min="5" max="90" className="input rounded-xl w-full"
                   value={form.duracaoMin} onChange={e=>setForm(s=>({...s, duracaoMin:e.target.value}))}/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <select className="input rounded-xl w-full" value={form.tipo}
                    onChange={e=>setForm(s=>({...s, tipo:e.target.value}))}>
              <option value="cardio">Cardio</option>
              <option value="força">Força</option>
              <option value="mobilidade">Mobilidade</option>
              <option value="cooperativo">Cooperativo</option>
              <option value="geral">Geral</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Vídeos (IDs separados por vírgula)</label>
            <input className="input rounded-xl w-full" placeholder="VID-02, VID-07"
                   value={form.videos} onChange={e=>setForm(s=>({...s, videos:e.target.value}))}/>
          </div>

          <div className="md:col-span-2">
            <button className="btn-gradient-blue rounded-xl px-4 py-2 text-sm">Publicar atividade</button>
          </div>
        </form>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold">Minhas atividades</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="text-left p-3">Data</th>
              <th className="text-left p-3">Turma</th>
              <th className="text-left p-3">Título</th>
              <th className="text-left p-3">Tipo</th>
              <th className="text-right p-3">Duração</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(a=>(
              <tr key={a.id} className="border-t border-[color:var(--edu-border)]">
                <td className="p-3">{new Date(a.data).toLocaleDateString()}</td>
                <td className="p-3">{a.turma}</td>
                <td className="p-3">{a.titulo}</td>
                <td className="p-3 capitalize">{a.tipo}</td>
                <td className="p-3 text-right">{a.duracaoMin}min</td>
                <td className="p-3 text-right">
                  <button className="text-sm text-red-600 dark:text-red-400 hover:underline"
                          onClick={()=>removeAtividade(a.id)}>Remover</button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr><td className="p-4 muted" colSpan={6}>Nenhuma atividade criada.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

