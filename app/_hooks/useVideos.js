'use client';
import { useEffect, useMemo, useState } from 'react';
import raw from '../_data/videos.json';

const STORAGE = 'edufit.videos'; // { watched: {id: true}, fav: {id: true} }

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE) || '{}'); }
  catch { return {}; }
}
function save(state) {
  localStorage.setItem(STORAGE, JSON.stringify(state));
}

export function useVideos() {
  const [state, setState] = useState({ watched: {}, fav: {}, categoria: 'todas', q: '' });

  useEffect(() => {
    const s = load();
    setState(prev => ({ ...prev, watched: s.watched || {}, fav: s.fav || {} }));
  }, []);

  useEffect(() => {
    save({ watched: state.watched, fav: state.fav });
  }, [state.watched, state.fav]);

  function toggleWatched(id) {
    setState(prev => ({
      ...prev,
      watched: { ...prev.watched, [id]: !prev.watched[id] }
    }));
  }
  function toggleFav(id) {
    setState(prev => ({
      ...prev,
      fav: { ...prev.fav, [id]: !prev.fav[id] }
    }));
  }
  function setCategoria(cat) { setState(prev => ({ ...prev, categoria: cat })); }
  function setQuery(q) { setState(prev => ({ ...prev, q })); }

  const lista = useMemo(() => {
    return raw.itens
      .filter(v => state.categoria === 'todas' ? true : v.categoria === state.categoria)
      .filter(v => state.q ? v.titulo.toLowerCase().includes(state.q.toLowerCase()) : true)
      .map(v => ({
        ...v,
        watched: !!state.watched[v.id],
        fav: !!state.fav[v.id]
      }));
  }, [state, raw.itens]);

  const stats = useMemo(() => {
    const total = raw.itens.length;
    const vistos = Object.values(state.watched).filter(Boolean).length;
    const favoritos = Object.values(state.fav).filter(Boolean).length;
    return { total, vistos, favoritos };
  }, [state.watched, state.fav]);

  return {
    categorias: ['todas', ...raw.categorias],
    lista, stats,
    actions: { toggleWatched, toggleFav, setCategoria, setQuery }
  };
}
