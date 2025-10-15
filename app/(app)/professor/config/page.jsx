// app/(app)/professor/config/page.jsx
'use client';
import { useState } from 'react';
import Card from '../../../../components/ui/Card';

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className={[
        'inline-flex items-center rounded-full transition-colors',
        'w-11 h-6 px-0.5',
        checked ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700',
      ].join(' ')}
      title={label}
    >
      <span
        className={[
          'block w-5 h-5 rounded-full bg-white shadow transform transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}

export default function ProfessorConfigPage() {
  // Dados fake apenas para visual
  const [conta, setConta] = useState({
    nome: 'Marina Souza',
    email: 'marina@escola.com',
    telefone: '+55 11 99999-0000',
    idioma: 'pt-BR',
    tema: 'light',
  });

  const [vinculo, setVinculo] = useState({
    escola: 'Escola Modelo SP',
    cargo: 'Professor de Educação Física',
    segmento: 'EF II',
    areas: 'Educação Física; Saúde',
  });

  const [prefs, setPrefs] = useState({
    turmaPadrao: '7A',
    duracaoPadrao: 20,
    categoriasFav: ['cardio', 'mobilidade'],
  });

  const [notifs, setNotifs] = useState({
    resumoEmail: true,
    lembretesInApp: true,
    horaLembrete: '08:00',
    mural: true,
  });

  const [seg, setSeg] = useState({
    tem2FA: false,
    senhaAtual: '',
    novaSenha: '',
  });

  const [salvo, setSalvo] = useState({}); // {secao: true}

  function markSaved(key) {
    setSalvo(s => ({ ...s, [key]: true }));
    setTimeout(() => setSalvo(s => ({ ...s, [key]: false })), 1200);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Configurações — Professor</h1>
        <p className="muted">Ajustes visuais da conta e preferências. (Demo — sem back-end)</p>
      </header>

      {/* Conta & identidade (sem avatar) */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Conta</h2>
          {salvo.conta && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              className="input rounded-xl w-full"
              value={conta.nome}
              onChange={e => setConta({ ...conta, nome: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              className="input rounded-xl w-full"
              value={conta.email}
              onChange={e => setConta({ ...conta, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telefone</label>
            <input
              className="input rounded-xl w-full"
              value={conta.telefone}
              onChange={e => setConta({ ...conta, telefone: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Idioma</label>
              <select
                className="input rounded-xl w-full"
                value={conta.idioma}
                onChange={e => setConta({ ...conta, idioma: e.target.value })}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tema</label>
              <select
                className="input rounded-xl w-full"
                value={conta.tema}
                onChange={e => setConta({ ...conta, tema: e.target.value })}
              >
                <option value="light">Claro</option>
                <option value="dark">Escuro</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button className="btn-gradient-blue rounded-xl px-4 py-2 text-sm" onClick={() => markSaved('conta')}>
            Salvar
          </button>
        </div>
      </Card>

      {/* Vínculo escolar */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Vínculo escolar</h2>
          {salvo.vinc && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Escola</label>
            <input
              className="input rounded-xl w-full"
              value={vinculo.escola}
              onChange={e => setVinculo({ ...vinculo, escola: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cargo</label>
            <input
              className="input rounded-xl w-full"
              value={vinculo.cargo}
              onChange={e => setVinculo({ ...vinculo, cargo: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Segmento</label>
            <select
              className="input rounded-xl w-full"
              value={vinculo.segmento}
              onChange={e => setVinculo({ ...vinculo, segmento: e.target.value })}
            >
              <option>EF I</option>
              <option>EF II</option>
              <option>EM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Áreas</label>
            <input
              className="input rounded-xl w-full"
              value={vinculo.areas}
              onChange={e => setVinculo({ ...vinculo, areas: e.target.value })}
              placeholder="separe por ;"
            />
          </div>
        </div>
        <div className="mt-3">
          <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  onClick={() => markSaved('vinc')}>
            Salvar
          </button>
        </div>
      </Card>

      {/* Preferências (turmas & atividades) */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Preferências</h2>
          {salvo.prefs && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Turma padrão</label>
            <input
              className="input rounded-xl w-full"
              value={prefs.turmaPadrao}
              onChange={e => setPrefs({ ...prefs, turmaPadrao: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Duração padrão (min)</label>
            <input
              type="number"
              className="input rounded-xl w-full"
              min={5}
              value={prefs.duracaoPadrao}
              onChange={e => setPrefs({ ...prefs, duracaoPadrao: Number(e.target.value || 0) })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Categorias favoritas</label>
            <div className="flex flex-wrap gap-2">
              {['cardio','força','mobilidade','cooperativo'].map(cat => {
                const active = prefs.categoriasFav.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      const set = new Set(prefs.categoriasFav);
                      active ? set.delete(cat) : set.add(cat);
                      setPrefs({ ...prefs, categoriasFav: Array.from(set) });
                    }}
                    className={[
                      'px-3 py-1.5 rounded-xl text-sm border',
                      active
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'border-[color:var(--edu-border)] hover:bg-slate-100 dark:hover:bg-slate-800',
                    ].join(' ')}
                  >
                    {cat[0].toUpperCase() + cat.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  onClick={() => markSaved('prefs')}>
            Salvar
          </button>
        </div>
      </Card>

      {/* Notificações (demo) */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Notificações</h2>
          {salvo.notifs && <span className="text-sm text-green-600">Salvo!</span>}
        </div>
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="flex items-center justify-between rounded-xl border border-[color:var(--edu-border)] p-3">
            <div>
              <div className="font-medium text-sm">Resumo semanal por e-mail</div>
              <div className="muted text-xs">Indicadores e próximas atividades.</div>
            </div>
            <Toggle checked={notifs.resumoEmail} onChange={v => setNotifs({ ...notifs, resumoEmail: v })} />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[color:var(--edu-border)] p-3">
            <div>
              <div className="font-medium text-sm">Lembretes in-app</div>
              <div className="muted text-xs">Notificar no dia da atividade.</div>
            </div>
            <Toggle checked={notifs.lembretesInApp} onChange={v => setNotifs({ ...notifs, lembretesInApp: v })} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horário do lembrete</label>
            <input
              type="time"
              className="input rounded-xl w-full"
              value={notifs.horaLembrete}
              onChange={e => setNotifs({ ...notifs, horaLembrete: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[color:var(--edu-border)] p-3">
            <div>
              <div className="font-medium text-sm">Avisos do mural</div>
              <div className="muted text-xs">Quando alunos publicarem conquistas.</div>
            </div>
            <Toggle checked={notifs.mural} onChange={v => setNotifs({ ...notifs, mural: v })} />
          </div>
        </div>
        <div className="mt-3">
          <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  onClick={() => markSaved('notifs')}>
            Salvar
          </button>
        </div>
      </Card>

      {/* Segurança (mock visual) */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Segurança</h2>
          {salvo.seg && <span className="text-sm text-green-600">Salvo!</span>}
        </div>

        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-[color:var(--edu-border)] p-3">
            <div className="font-medium mb-2 text-sm">Alterar senha (demo)</div>
            <label className="block text-sm mb-1">Senha atual</label>
            <input
              type="password"
              className="input rounded-xl w-full mb-2"
              value={seg.senhaAtual}
              onChange={e => setSeg({ ...seg, senhaAtual: e.target.value })}
            />
            <label className="block text-sm mb-1">Nova senha</label>
            <input
              type="password"
              className="input rounded-xl w-full"
              value={seg.novaSenha}
              onChange={e => setSeg({ ...seg, novaSenha: e.target.value })}
            />
            <div className="mt-2">
              <button className="rounded-xl px-3 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
                Atualizar senha
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--edu-border)] p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">2FA (demo)</div>
                <div className="muted text-xs">Proteção extra na conta.</div>
              </div>
              <Toggle checked={seg.tem2FA} onChange={v => setSeg({ ...seg, tem2FA: v })} />
            </div>
            <ul className="mt-3 text-sm list-disc pl-5 text-slate-600 dark:text-slate-300">
              <li>Mostramos aqui como seria a ativação do 2FA.</li>
              <li>Sem integração real — apenas visual.</li>
            </ul>
          </div>
        </div>

        <div className="mt-3">
          <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700"
                  onClick={() => markSaved('seg')}>
            Salvar
          </button>
        </div>
      </Card>

      {/* Importar alunos (visual) */}
      <Card className="p-4">
        <h2 className="font-semibold">Importar alunos (CSV — demo)</h2>
        <p className="muted text-sm">Cole uma lista de e-mails, separados por vírgula ou linha.</p>
        <div className="mt-3 grid md:grid-cols-3 gap-3">
          <div className="md:col-span-2">
            <textarea rows={5} className="input rounded-xl w-full resize-none" placeholder={`ana@..., joao@...\ncarla@...`} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm">Turma destino</label>
            <select className="input rounded-xl w-full">
              <option>6A</option>
              <option>7A</option>
              <option>8B</option>
            </select>
            <button className="btn-gradient-blue rounded-xl px-4 py-2 text-sm w-full">Pré-visualizar</button>
            <button className="rounded-xl px-4 py-2 text-sm w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
              Importar (demo)
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

