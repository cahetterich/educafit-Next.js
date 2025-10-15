// src/app/(site)/page.jsx
'use client';
import React from 'react';
import Hero from '../../../components/home/Hero';
import Plans from '../../../components/home/Plans';
import Values from '../../../components/home/Values';
import Features from '../../../components/home/Features';
import Purpose from '../../../components/home/Purpose';

export default function Home(){
  return (
    <div className="pb-6">
      <Hero/>
      <Plans/>
      <Values/>
      <Features/>
      <Purpose/>
    </div>
  );
}
