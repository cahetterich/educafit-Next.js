// app/_hooks/useEscolaData.js
'use client';
import { useEffect, useMemo, useState } from 'react';

const TKEY = 'edufit.turmas.v2';
const AKEY = 'edufit.prof.atividades';
const PKEY = 'edufit.progress';

function load(key, fb){ try{ return JSON.parse(localStorage.getItem(key)||'null') ?? fb; }catch{ return fb; } }
function save(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
function isoPlus(days){ const d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10); }

export function useEscolaData(){
  const [turmas, setTurmas] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(()=>{
    // Turmas
    let t = load(TKEY, null);
    if (!t || !Array.isArray(t) || !t.length) {
      t = [
        { id:'T6A', nome:'6A', emails:['ana@escola.com','leo@escola.com','bia@escola.com','rui@escola.com','kai@escola.com'] },
        { id:'T7A', nome:'7A', emails:['bruno@escola.com','carla@escola.com','duda@escola.com','voce@demo.com'] },
        { id:'T8B', nome:'8B', emails:['iris@escola.com','otto@escola.com','nina@escola.com','enzo@escola.com'] },
      ];
      save(TKEY, t);
    }
    setTurmas(t);

    // Atividades
    let a = load(AKEY, null);
    if (!a || !Array.isArray(a) || !a.length) {
      a = [
        { id:'ATV1', data: isoPlus(-2), turma:'7A', titulo:'Desafio de passos', tipo:'cardio', duracaoMin:30 },
        { id:'ATV2', data: isoPlus(-1), turma:'6A', titulo:'Mobilidade de ombros', tipo:'mobilidade', duracaoMin:15 },
        { id:'ATV3', data: isoPlus( 1), turma:'8B', titulo:'Circuito funcional', tipo:'força', duracaoMin:20 },
        { id:'ATV4', data: isoPlus( 0), turma:'7A', titulo:'Jogo cooperativo', tipo:'cooperativo', duracaoMin:10 },
      ];
      save(AKEY, a);
    }
    setAtividades(a);

    // Progresso (marcação concluída fake 40–80%)
    let p = load(PKEY, null);
    if (!p) {
      p = {};
      a.forEach(at => {
        const turma = t.find(tt=>tt.nome===at.turma);
        (turma?.emails||[]).forEach((email, i)=>{
          if (Math.random() < 0.5 + (i%4)*0.1) p[`${at.id}:${email}`] = 'concluida';
        });
      });
      save(PKEY, p);
    }
    setProgress(p);
  },[]);

  const kpis = useMemo(()=>{
    const alunos = turmas.reduce((acc,t)=>acc+t.emails.length,0);
    const now = new Date();
    const semana = atividades.filter(a=>{
      const d = new Date(a.data);
      return Math.abs(now - d) <= 7*24*60*60*1000;
    });

    let concl=0, total=0;
    semana.forEach(a=>{
      const turma = turmas.find(tt=>tt.nome===a.turma);
      const emails = turma?.emails||[];
      emails.forEach(e=>{
        total++;
        if (progress[`${a.id}:${e}`]==='concluida') concl++;
      });
    });
    const taxa = total ? Math.round((concl/total)*100) : 0;

    return {
      turmas: turmas.length,
      professores: Math.max(3, Math.min(10, Math.round(atividades.length/2)+2)), // fake simpático
      alunos,
      atvSemana: semana.length,
      taxaMedia: taxa
    };
  }, [turmas, atividades, progress]);

  const engajamentoPorTurma = useMemo(()=>{
    const out = turmas.map(t=>{
      const emails = t.emails||[];
      const atTurma = atividades.filter(a=>a.turma===t.nome);
      const setConcl = new Set();
      atTurma.forEach(a=>{
        emails.forEach(e=>{
          if (progress[`${a.id}:${e}`]==='concluida') setConcl.add(e);
        });
      });
      const perc = emails.length ? Math.round((setConcl.size/emails.length)*100) : 0;
      return { turma:t.nome, perc, alunos:emails.length, concl:setConcl.size };
    });
    return out.sort((a,b)=>b.perc - a.perc);
  }, [turmas, atividades, progress]);

  return { turmas, atividades, progress, kpis, engajamentoPorTurma };
}

