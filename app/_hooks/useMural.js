'use client';
import { useEffect, useMemo, useState } from 'react';
import seed from '../_data/mural.json';

const STORAGE = 'edufit.mural';      // { posts: [...], my: { [postId]: {clap:true, like:false, flex:false} } }
const USERKEY = 'edufit.user';

function uid() {
  return 'P-' + Math.random().toString(36).slice(2, 8);
}
function getUser() {
  try {
    const u = JSON.parse(localStorage.getItem(USERKEY) || '{}');
    if (!u.nome) { u.nome = 'Você'; localStorage.setItem(USERKEY, JSON.stringify(u)); }
    if (!u.turma) { u.turma = '7A'; localStorage.setItem(USERKEY, JSON.stringify(u)); }
    return u;
  } catch { return { nome: 'Você', turma: '7A' }; }
}
function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); }
  catch { return {}; }
}
function save(state) {
  localStorage.setItem(STORAGE, JSON.stringify(state));
}

export function useMural() {
  const user = getUser();
  const [state, setState] = useState({ posts: [], my: {} });

  // inicializa com seed + storage
  useEffect(() => {
    const s = load();
    setState({
      posts: s.posts?.length ? s.posts : seed.posts,
      my: s.my || {}
    });
  }, []);

  // persistir
  useEffect(() => { save(state); }, [state]);

  const timeline = useMemo(() => {
    return [...state.posts]
      .sort((a, b) => new Date(b.data) - new Date(a.data))
      .map(p => {
        const mine = state.my[p.id] || {};
        return {
          ...p,
          total: {
            clap: p.reacoes.clap + (mine.clap ? 1 : 0),
            like: p.reacoes.like + (mine.like ? 1 : 0),
            flex: p.reacoes.flex + (mine.flex ? 1 : 0),
          },
          mine
        };
      });
  }, [state]);

  function react(postId, kind) {
    setState(prev => {
      const my = { ...(prev.my[postId] || {}) };
      my[kind] = !my[kind];
      return { ...prev, my: { ...prev.my, [postId]: my } };
    });
  }

  function publish(texto) {
    const novo = {
      id: uid(),
      autor: `${user.nome} (${user.turma})`,
      texto,
      data: new Date().toISOString(),
      reacoes: { clap: 0, like: 0, flex: 0 }
    };
    setState(prev => ({ ...prev, posts: [novo, ...prev.posts] }));
  }

  return { timeline, publish, react };
}
