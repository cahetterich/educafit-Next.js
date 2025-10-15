// app/_hooks/useAgenda.js
'use client';
import { useEffect, useMemo, useState } from 'react';
import rawData from '../_data/agenda.json';

const STORAGE = 'edufit.progress';              // progresso do aluno
const USERKEY = 'edufit.user';
const PROF_ATIV_KEY = 'edufit.prof.atividades'; // atividades criadas pelo professor (local)

// Simples e robusto: sem RegExp
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const parts = document.cookie.split('; ').filter(Boolean);
  const hit = parts.find(c => c.startsWith(name + '='));
  return hit ? decodeURIComponent(hit.split('=').slice(1).join('=')) : null;
}

function getCurrentUser() {
  try {
    const u = JSON.parse(localStorage.getItem(USERKEY) || '{}');
    if (!u.ra) { u.ra = 'A001'; localStorage.setItem(USERKEY, JSON.stringify(u)); }
    return u;
  } catch {
    return { ra: 'A001' };
  }
}
function loadProfAtividades() {
  try { return JSON.parse(localStorage.getItem(PROF_ATIV_KEY) || '[]'); }
  catch { return []; }
}

export function useAgenda() {
  const [progress, setProgress] = useState({});
  const role = getCookie('edufit.role') || 'aluno';
  const user = getCurrentUser();

  useEffect(() => {
    try { setProgress(JSON.parse(localStorage.getItem(STORAGE) || '{}')); }
    catch { setProgress({}); }
  }, []);
  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(progress));
  }, [progress]);

  // Mescla seed + atividades criadas pelo professor (local)
  const atividades = useMemo(() => {
    const seed = rawData.atividades || [];
    const extras = loadProfAtividades(); // mesmo shape do seed
    const merged = [...seed, ...extras];

    const filtroTurma = role === 'aluno' ? '7A' : null; // demo
    const list = merged
      .filter(a => (filtroTurma ? a.turma === filtroTurma : true))
      .map(a => {
        const key = `${a.id}:${user.ra}`;
        const status = progress[key] || 'pendente';
        return { ...a, status };
      })
      .sort((a, b) => a.data.localeCompare(b.data) || a.id.localeCompare(b.id));

    const byDate = list.reduce((acc, a) => {
      (acc[a.data] ??= []).push(a);
      return acc;
    }, {});
    return { list, byDate };
  }, [progress, role, user.ra]);

  function toggleConclusao(atividadeId) {
    const key = `${atividadeId}:${user.ra}`;
    setProgress(prev => {
      const next = { ...prev };
      next[key] = prev[key] === 'concluida' ? 'pendente' : 'concluida';
      return next;
    });
  }

  const resumo = useMemo(() => {
    const total = atividades.list.length;
    const concluidas = atividades.list.filter(a => a.status === 'concluida').length;
    return { total, concluidas, perc: total ? Math.round((concluidas / total) * 100) : 0 };
  }, [atividades.list]);

  return { atividadesByDate: atividades.byDate, resumo, toggleConclusao, role, ra: user.ra };
}
