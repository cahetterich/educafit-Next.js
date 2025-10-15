'use client';
import { useEffect } from 'react';

export default function DemoSeed() {
  useEffect(() => {
    // ---- Turmas (v2) ----
    const TKEY = 'edufit.turmas.v2';
    if (!localStorage.getItem(TKEY)) {
      const seedTurmas = [
        { id: 'T-6A', nome: '6A', emails: ['ana6a@escola.com','leo6a@escola.com','bia6a@escola.com','rui6a@escola.com','kai6a@escola.com'] },
        { id: 'T-7A', nome: '7A', emails: ['bruno7a@escola.com','carla7a@escola.com','duda7a@escola.com','voce@demo.com'] },
        { id: 'T-8B', nome: '8B', emails: ['iris8b@escola.com','otto8b@escola.com','nina8b@escola.com'] },
      ];
      localStorage.setItem(TKEY, JSON.stringify(seedTurmas));
    }

    // ---- Atividades do professor ----
    const AKEY = 'edufit.prof.atividades';
    if (!localStorage.getItem(AKEY)) {
      const today = new Date();
      const isoPlus = (d) => { const x=new Date(today); x.setDate(x.getDate()+d); return x.toISOString().slice(0,10); };
      const rnd = ()=>'ATV-'+Math.random().toString(36).slice(2,7).toUpperCase();
      const seedAtiv = [
        { id:rnd(), data: isoPlus(-2), turma:'7A', titulo:'Desafio de passos (4.000)', descricao:'Caminhada leve monitorada.', duracaoMin:30, tipo:'cardio', videos:['VID-15'] },
        { id:rnd(), data: isoPlus( 1), turma:'7A', titulo:'Circuito funcional — upper', descricao:'Flexões inclinadas + remada elástica.', duracaoMin:20, tipo:'força', videos:['VID-10','VID-02'] },
        { id:rnd(), data: isoPlus( 2), turma:'6A', titulo:'Mobilidade de ombros', descricao:'Alongamento dinâmico.', duracaoMin:15, tipo:'mobilidade', videos:['VID-07'] },
        { id:rnd(), data: isoPlus( 3), turma:'8B', titulo:'Jogo cooperativo de passos', descricao:'Duplas com meta combinada.', duracaoMin:30, tipo:'cooperativo', videos:['VID-12','VID-15'] },
      ];
      localStorage.setItem(AKEY, JSON.stringify(seedAtiv));
    }
  }, []);
  return null;
}
