// app/(app)/aluno/mural/page.jsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Card from '../../../../components/ui/Card';
import { useMural } from '../../../_hooks/useMural';

const MAX = 240;

export default function MuralAlunoPage() {
  const { timeline, publish, react } = useMural();
  const [msg, setMsg] = useState('');
  const [chars, setChars] = useState(0);
  const taRef = useRef(null);

  // autosize do textarea
  function autoResize(el) {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 240) + 'px';
  }
  useEffect(() => { if (taRef.current) autoResize(taRef.current); }, []);

  function onChange(e) {
    const val = e.target.value;
    setMsg(val);
    setChars(val.trim().length);
    autoResize(e.target);
  }

  function onKeyDown(e) {
    // Ctrl/Cmd+Enter para publicar
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      onSubmit(e);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const text = msg.trim();
    if (!text || text.length > MAX) return;
    publish(text);
    setMsg('');
    setChars(0);
    if (taRef.current) {
      taRef.current.value = '';
      autoResize(taRef.current);
    }
  }

  const disabled = chars === 0 || chars > MAX;

  const Pill = ({ active, onClick, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={[
        'rounded-xl px-3 py-1.5 text-sm transition-colors',
        active ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
      ].join(' ')}
      aria-pressed={active}
    >
      {children}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Mural</h1>
        <p className="muted">Compartilhe conquistas e reaja aos colegas. (Demo, dados locais)</p>

        {/* Novo post — profissional, responsivo */}
        <form onSubmit={onSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="space-y-2">
            <textarea
              ref={taRef}
              rows={3}
              maxLength={600}
              value={msg}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder="Escreva algo para sua turma… (Ctrl/⌘ + Enter para publicar)"
              className="w-full resize-none input rounded-xl leading-relaxed min-h-[96px] py-3"
              aria-label="Mensagem para o mural"
            />
            <div className="flex items-center justify-between text-xs opacity-70">
              <span>Enter quebra linha · Ctrl/⌘ + Enter publica</span>
              <span className={chars > MAX ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
                {chars}/{MAX}
              </span>
            </div>
          </div>

          <div className="sm:self-end">
            <button
              type="submit"
              disabled={disabled}
              className={[
                'rounded-xl px-5 py-2 text-sm font-semibold',
                disabled ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'
                         : 'btn-gradient-blue'
              ].join(' ')}
              aria-disabled={disabled}
            >
              Publicar
            </button>
          </div>
        </form>
      </header>

      {/* Feed */}
      <div className="space-y-4">
        {timeline.map(p => (
          <Card key={p.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{p.autor}</div>
              <time className="text-xs opacity-70">
                {new Date(p.data).toLocaleString()}
              </time>
            </div>
            <p className="mt-2 whitespace-pre-wrap">{p.texto}</p>

            <div className="mt-3 flex items-center gap-2">
              <Pill active={!!p.mine.clap} onClick={()=>react(p.id,'clap')} title="Bater palmas">
                👏 <span className="ml-1 opacity-70">{p.total.clap}</span>
              </Pill>
              <Pill active={!!p.mine.like} onClick={()=>react(p.id,'like')} title="Curtir">
                👍 <span className="ml-1 opacity-70">{p.total.like}</span>
              </Pill>
              <Pill active={!!p.mine.flex} onClick={()=>react(p.id,'flex')} title="Força!">
                💪 <span className="ml-1 opacity-70">{p.total.flex}</span>
              </Pill>
            </div>
          </Card>
        ))}
      </div>

      {!timeline.length && (
        <Card className="p-6"><p className="muted">Ainda sem posts. Escreva o primeiro!</p></Card>
      )}
    </div>
  );
}
