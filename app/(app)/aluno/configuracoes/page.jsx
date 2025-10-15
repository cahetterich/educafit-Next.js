// app/(app)/aluno/configuracoes/page.jsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import Card from '../../../../components/ui/Card';

const USERKEY = 'edufit.user';
const AUTHKEY = 'edufit.auth'; // demo: email/senha (sem backend)

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function Input({label, ...props}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input className="input rounded-xl w-full" {...props} />
    </div>
  );
}

export default function ConfigAlunoContaPage() {
  // ---------- Conta (escolar + pessoais)
  const [user, setUser] = useState({
    nome: 'Você',
    turma: '7A',
    escola: '',
    professor: '',
    idade: '',
    alturaCm: '',
    pesoKg: '',
    hideInRanking: false,
    anonInMural: false,
  });

  // ---------- Auth demo
  const [auth, setAuth] = useState({ email: '', senha: '' });
  const [pwd, setPwd] = useState({ atual: '', nova: '', conf: '' });

  useEffect(() => {
    setUser(prev => ({ ...prev, ...loadJSON(USERKEY, {}) }));
    setAuth(loadJSON(AUTHKEY, { email: '', senha: '' }));
  }, []);

  // ---------- Cálculos de saúde (IMC)
  const imc = useMemo(() => {
    const h = parseFloat(user.alturaCm) / 100;
    const w = parseFloat(user.pesoKg);
    if (!h || !w) return null;
    const val = +(w / (h*h)).toFixed(1);
    let classe = 'indefinido';
    if (val < 18.5) classe = 'Baixo peso';
    else if (val < 25) classe = 'Adequado';
    else if (val < 30) classe = 'Sobrepeso';
    else classe = 'Obesidade';
    return { val, classe };
  }, [user.alturaCm, user.pesoKg]);

  // ---------- Handlers
  function saveProfile() {
    saveJSON(USERKEY, user);
    saveJSON(AUTHKEY, auth);
    alert('Dados de conta salvos (demo).');
  }

  function changePassword(e) {
    e.preventDefault();
    if (!pwd.nova || pwd.nova.length < 4) return alert('A nova senha precisa de 4+ caracteres (demo).');
    if (pwd.nova !== pwd.conf) return alert('A confirmação não confere.');
    // Demo: não validamos "senha atual" de fato; apenas trocamos localmente
    const next = { ...auth, senha: pwd.nova };
    saveJSON(AUTHKEY, next);
    setAuth(next);
    setPwd({ atual: '', nova: '', conf: '' });
    alert('Senha atualizada (demo, local).');
  }

  // ---------- UI
  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Configurações de Conta</h1>
        <p className="muted">Dados usados na experiência do aluno. Tudo salvo localmente (sem back-end).</p>
      </header>

      {/* Escola & Pessoais */}
      <Card className="p-4">
        <h2 className="font-semibold mb-1">Dados escolares</h2>
        <p className="muted text-sm mb-4">Informações para organização por escola/turma.</p>
        <div className="grid md:grid-cols-2 gap-3">
          <Input label="Escola" value={user.escola} onChange={e=>setUser(s=>({...s, escola:e.target.value}))} />
          <Input label="Professor responsável" value={user.professor} onChange={e=>setUser(s=>({...s, professor:e.target.value}))} />
          <Input label="Turma" value={user.turma} onChange={e=>setUser(s=>({...s, turma:e.target.value}))} />
          <Input label="Nome" value={user.nome} onChange={e=>setUser(s=>({...s, nome:e.target.value}))} />
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="font-semibold mb-1">Medidas & Saúde</h2>
        <p className="muted text-sm mb-4">Use medidas aproximadas — servem para relatórios pedagógicos.</p>
        <div className="grid md:grid-cols-3 gap-3">
          <Input label="Idade (anos)" type="number" min="5" max="99" value={user.idade} onChange={e=>setUser(s=>({...s, idade:e.target.value}))} />
          <Input label="Altura (cm)" type="number" min="80" max="220" value={user.alturaCm} onChange={e=>setUser(s=>({...s, alturaCm:e.target.value}))} />
          <Input label="Peso (kg)" type="number" min="20" max="200" step="0.1" value={user.pesoKg} onChange={e=>setUser(s=>({...s, pesoKg:e.target.value}))} />
        </div>

        <div className="mt-3 text-sm">
          {imc ? (
            <span>
              IMC estimado: <b>{imc.val}</b> — <span className="font-semibold">{imc.classe}</span>
            </span>
          ) : <span className="muted">Informe altura e peso para estimar o IMC.</span>}
        </div>
      </Card>

      {/* Privacidade essencial */}
      <Card className="p-4">
        <h2 className="font-semibold mb-1">Privacidade</h2>
        <p className="muted text-sm mb-4">Controle como seu nome aparece.</p>
        <div className="flex flex-col gap-2">
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={user.hideInRanking} onChange={e=>setUser(s=>({...s, hideInRanking:e.target.checked}))} />
            <span className="text-sm">Ocultar meu nome no ranking</span>
          </label>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={user.anonInMural} onChange={e=>setUser(s=>({...s, anonInMural:e.target.checked}))} />
            <span className="text-sm">Publicar no mural como Anônimo</span>
          </label>
        </div>
      </Card>

      {/* Acesso (email + senha fake) */}
      <Card className="p-4">
        <h2 className="font-semibold mb-1">Acesso</h2>
        <p className="muted text-sm mb-4">Credenciais de demonstração (apenas no seu navegador).</p>

        <div className="grid md:grid-cols-2 gap-3">
          <Input label="E-mail" type="email" value={auth.email} onChange={e=>setAuth(s=>({...s, email:e.target.value}))} />          
        </div>

        <form onSubmit={changePassword} className="mt-3 grid md:grid-cols-3 gap-3">
          <Input label="Senha atual" type="password" value={pwd.atual} onChange={e=>setPwd(s=>({...s, senha:e.target.value}))} />
          <Input label="Nova senha" type="password" value={pwd.nova} onChange={e=>setPwd(s=>({...s, nova:e.target.value}))} />
          <Input label="Confirmar" type="password" value={pwd.conf} onChange={e=>setPwd(s=>({...s, conf:e.target.value}))} />
          <div className="md:col-span-3">
            <button className="rounded-xl px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700">
              Atualizar senha (demo)
            </button>
          </div>
        </form>
      </Card>

      {/* Salvar geral */}
      <div>
        <button className="btn-gradient-blue rounded-xl px-5 py-2 text-sm" onClick={saveProfile}>
          Salvar configurações
        </button>
      </div>
    </div>
  );
}
