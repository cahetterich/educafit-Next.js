// app/(app)/aluno/videos/page.jsx
'use client';
import Image from 'next/image';
import { useState } from 'react';
import Card from '../../../../components/ui/Card';
import { useVideos } from '../../../_hooks/useVideos';

// Fallback inline (não depende de /public)
const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e5ecff"/>
        <stop offset="1" stop-color="#c8d7ff"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <g fill="#1f6feb" font-family="Inter,Segoe UI,Roboto,Arial" text-anchor="middle">
      <text x="600" y="410" font-size="56" font-weight="700">EducaFit</text>
      <text x="600" y="470" font-size="28" opacity="0.7">Prévia de vídeo</text>
    </g>
  </svg>`);

// Componente de thumb com fallback automático
function Thumb({ src, dur, cat }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="relative h-40 bg-slate-100 dark:bg-slate-800">
      {broken ? (
        // fallback final
        <img src={PLACEHOLDER} alt="" className="w-full h-full object-cover" loading="lazy" />
      ) : (
        <Image
          src={src || PLACEHOLDER}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          onError={() => setBroken(true)}
          priority={false}
        />
      )}

      <span className="absolute left-2 bottom-2 text-xs px-2 py-0.5 rounded-full bg-black/70 text-white">
        {dur}min • {cat}
      </span>
    </div>
  );
}

export default function VideosAlunoPage() {
  const { categorias, lista, stats, actions } = useVideos();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-[color:var(--edu-border)] dark:border-slate-800 p-4 bg-white dark:bg-slate-900">
        <h1 className="h2">Vídeos</h1>
        <p className="muted">Apoie suas atividades com tutoriais curtos. Marque como assistido ou favorito.</p>

        {/* Stats */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <Card className="p-4">
            <div className="text-xs opacity-70">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs opacity-70">Assistidos</div>
            <div className="text-2xl font-bold">{stats.vistos}</div>
          </Card>
          <Card className="p-4">
            <div className="text-xs opacity-70">Favoritos</div>
            <div className="text-2xl font-bold">{stats.favoritos}</div>
          </Card>
        </div>

        {/* Filtros */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="inline-flex overflow-hidden rounded-2xl border border-[color:var(--edu-border)]">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => actions.setCategoria(cat)}
                className="px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 aria-[pressed=true]:bg-primary/10 aria-[pressed=true]:text-primary"
                
              >
                {cat[0].toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <input
            className="input rounded-xl sm:max-w-xs"
            placeholder="Buscar por título…"
            onChange={(e) => actions.setQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            {/* 👉 Thumb com fallback (tudo encapsulado) */}
            <Thumb src={v.thumb} dur={v.duracaoMin} cat={v.categoria} />

            <div className="p-4 space-y-3">
              <h3 className="font-semibold">{v.titulo}</h3>

              <div className="flex items-center gap-2">
                <button
                  className={[
                    'rounded-xl px-3 py-2 text-sm transition-colors',
                    v.watched
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                  ].join(' ')}
                  onClick={() => actions.toggleWatched(v.id)}
                >
                  {v.watched ? 'Assistido' : 'Marcar como assistido'}
                </button>

                <button
                  className={[
                    'rounded-xl px-3 py-2 text-sm transition-colors',
                    v.fav ? 'bg-primary/10 text-primary' : 'hover:bg-slate-100 dark:hover:bg-slate-800',
                  ].join(' ')}
                  onClick={() => actions.toggleFav(v.id)}
                  aria-pressed={v.fav}
                  title={v.fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  {v.fav ? '★ Favorito' : '☆ Favorito'}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {!lista.length && (
        <Card className="p-6">
          <p className="muted">Nenhum vídeo corresponde aos filtros.</p>
        </Card>
      )}
    </div>
  );
}
