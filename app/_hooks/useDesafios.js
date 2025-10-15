'use client';
import { useEffect, useMemo, useState } from 'react';
import regras from '../_data/desafios.json';
import agenda from '../_data/agenda.json';

const STORAGE_PROGRESS = 'edufit.progress';
const USERKEY = 'edufit.user';

function getUser() {
  try {
    const u = JSON.parse(localStorage.getItem(USERKEY) || '{}');
    if (!u.ra) { u.ra = 'A001'; localStorage.setItem(USERKEY, JSON.stringify(u)); }
    if (!u.nome) { u.nome = 'Você'; localStorage.setItem(USERKEY, JSON.stringify(u)); }
    return u;
  } catch { return { ra: 'A001', nome: 'Você' }; }
}

export function useDesafios() {
  const [progress, setProgress] = useState({});
  useEffect(() => {
    try { setProgress(JSON.parse(localStorage.getItem(STORAGE_PROGRESS) || '{}')); }
    catch { setProgress({}); }
  }, []);

  const { aluno, badges, rankingTurma } = useMemo(() => {
    const user = getUser();
    // conta conclusões do RA atual na turma 7A (pode generalizar depois)
    const ids7A = agenda.atividades.filter(a => a.turma === '7A').map(a => a.id);
    const concluidas = ids7A.filter(id => progress[`${id}:${user.ra}`] === 'concluida').length;

    const pontos = concluidas * regras.regras.pontosPorConclusao;

    // badges por milestones
    const badges = regras.regras.milestones
      .filter(m => concluidas >= m.qtd)
      .map(m => m.badge);

    // ranking fake: mistura com base + aluno atual
    const base = regras.rankingBase.filter(r => r.turma === '7A');
    const mix = [
      ...base,
      { turma: '7A', ra: user.ra, nome: user.nome, pontos }
    ]
      .reduce((acc, cur) => {
        const key = cur.ra;
        acc[key] = acc[key] ? { ...acc[key], pontos: Math.max(acc[key].pontos, cur.pontos) } : cur;
        return acc;
      }, {});
    const rankingTurma = Object.values(mix)
      .sort((a, b) => b.pontos - a.pontos)
      .map((r, i) => ({ ...r, pos: i + 1 }));

    const aluno = rankingTurma.find(r => r.ra === user.ra) || { nome: user.nome, pontos: 0, pos: rankingTurma.length + 1 };

    return { aluno, badges, rankingTurma };
  }, [progress]);

  return { aluno, badges, rankingTurma, pontosPorConclusao: regras.regras.pontosPorConclusao };
}
