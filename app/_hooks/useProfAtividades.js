// app/_hooks/useProfAtividades.js
'use client';
import { useEffect, useMemo, useState } from 'react';

const KEY = 'edufit.prof.atividades';
const SEEDED_FLAG = 'edufit.prof.seeded';

function load(key, fb){ try{ return JSON.parse(localStorage.getItem(key)||'null') ?? fb; }catch{ return fb; } }
function save(key,v){ localStorage.setItem(key, JSON.stringify(v)); }
function genId(){ return 'ATV-'+Math.random().toString(36).slice(2,7).toUpperCase(); }
function isoPlus(days){ const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); }

function ensureSeed(){
  if (localStorage.getItem(SEEDED_FLAG)) return;
  const seed = [
    // passada (para Relatórios não ficar vazio)
    { id: genId(), data: isoPlus(-2), turma:'7A', titulo:'Desafio de passos (4.000)', descricao:'Caminhada leve monitorada.',
      duracaoMin:30, tipo:'cardio', videos:['VID-15'] },
    // futuras
    { id: genId(), data: isoPlus(1), turma:'7A', titulo:'Circuito funcional — upper', descricao:'Flexões inclinadas + remada elástica.',
      duracaoMin:20, tipo:'força', videos:['VID-10','VID-02'] },
    { id: genId(), data: isoPlus(2), turma:'6A', titulo:'Mobilidade de ombros', descricao:'Alongamento dinâmico.',
      duracaoMin:15, tipo:'mobilidade', videos:['VID-07'] },
    { id: genId(), data: isoPlus(3), turma:'8B', titulo:'Jogo cooperativo de passos', descricao:'Duplas com meta combinada.',
      duracaoMin:30, tipo:'cooperativo', videos:['VID-12','VID-15'] },
  ];
  save(KEY, seed);
  localStorage.setItem(SEEDED_FLAG,'1');
}

export function useProfAtividades(){
  const [items, setItems] = useState([]);

  useEffect(()=>{ ensureSeed(); setItems(load(KEY, [])); },[]);
  useEffect(()=>{ save(KEY, items); },[items]);

  function addAtividade(a){
    const nova = {
      id: genId(),
      data: a.data, turma:a.turma, titulo:a.titulo, descricao:a.descricao,
      duracaoMin: Number(a.duracaoMin||0), tipo:a.tipo||'geral',
      videos: String(a.videos||'').split(',').map(v=>v.trim()).filter(Boolean)
    };
    setItems(prev => [...prev, nova].sort((x,y)=> x.data.localeCompare(y.data)));
    return nova.id;
  }
  function removeAtividade(id){ setItems(prev => prev.filter(a=>a.id!==id)); }

  const porTurma = useMemo(()=> items.reduce((acc,a)=>{ (acc[a.turma]??=[]).push(a); return acc; },{}),[items]);

  return { items, porTurma, addAtividade, removeAtividade };
}

