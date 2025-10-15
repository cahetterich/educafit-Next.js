// app/_hooks/useTurmas.js
'use client';
import { useEffect, useMemo, useState } from 'react';

const TKEY = 'edufit.turmas.v2';

function load(key, fb){ try{ return JSON.parse(localStorage.getItem(key)||'null') ?? fb; }catch{ return fb; } }
function save(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
function genId(){ return 'T'+Math.random().toString(36).slice(2,7).toUpperCase(); }

function demoTurmas() {
  return [
    { id: genId(), nome: '6A', emails: [
      'ana6a@escola.com','leo6a@escola.com','bia6a@escola.com','rui6a@escola.com','kai6a@escola.com',
      'joao6a@escola.com','luiza6a@escola.com','teo6a@escola.com'
    ]},
    { id: genId(), nome: '7A', emails: [
      'bruno7a@escola.com','carla7a@escola.com','duda7a@escola.com','voce@demo.com',
      'lara7a@escola.com','miguel7a@escola.com','noah7a@escola.com'
    ]},
    { id: genId(), nome: '8B', emails: [
      'iris8b@escola.com','otto8b@escola.com','nina8b@escola.com','gabi8b@escola.com',
      'enzo8b@escola.com','ravi8b@escola.com'
    ]},
  ];
}

export function useTurmas(){
  const [turmas, setTurmas] = useState([]);

  useEffect(()=>{
    const loaded = load(TKEY, null);
    if (!loaded || !Array.isArray(loaded) || loaded.length === 0) {
      const seed = demoTurmas();
      save(TKEY, seed);
      setTurmas(seed);
    } else {
      setTurmas(loaded);
    }
  }, []);

  useEffect(()=>{ save(TKEY, turmas); },[turmas]);

  function addTurma(nome){
    const t = { id: genId(), nome: nome.trim(), emails: [] };
    setTurmas(prev => [...prev, t]);
    return t.id;
  }
  function removeTurma(id){ setTurmas(prev => prev.filter(t=>t.id!==id)); }
  function addEmails(id, csv){
    const list = csv.split(',').map(s=>s.trim()).filter(Boolean);
    setTurmas(prev => prev.map(t => t.id!==id ? t : {...t, emails: Array.from(new Set([...t.emails, ...list]))}));
  }
  function removeEmail(id, email){
    setTurmas(prev => prev.map(t => t.id!==id ? t : {...t, emails: t.emails.filter(e=>e!==email)}));
  }

  // utilitário: re-seed manual (para o botão)
  function seedDemo(){
    const seed = demoTurmas();
    save(TKEY, seed);
    setTurmas(seed);
  }

  const totalAlunos = useMemo(()=> turmas.reduce((a,t)=>a+t.emails.length,0),[turmas]);

  return { turmas, totalAlunos, addTurma, removeTurma, addEmails, removeEmail, seedDemo };
}

