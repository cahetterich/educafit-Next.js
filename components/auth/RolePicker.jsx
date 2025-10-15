'use client';
import { AcademicCapIcon, PresentationChartBarIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import { dashboardPathFor, setRole } from '../../lib/role';
import { useRouter } from 'next/navigation';

export default function RolePicker({ currentRole }) {
  const router = useRouter();

  function pick(role) {
    setRole(role);
    router.push(dashboardPathFor(role));
  }

  const itemBase =
    'group relative flex items-center gap-3 rounded-xl border border-[color:var(--edu-border)] dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 transition-colors px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/40';

  const titleBase = 'font-semibold leading-tight';
  const descBase = 'text-sm text-slate-500 dark:text-slate-400';

  return (
    <section aria-labelledby="role_title" className="mt-8">
      <div className="flex items-center justify-between">
        <h2 id="role_title" className="text-base font-semibold">Acesso rápido</h2>
        {currentRole ? (
          <span className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">
            Perfil atual: <b>{currentRole}</b>
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Demo sem back-end: escolha um perfil para navegar pelas telas.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Aluno */}
        <button
          type="button"
          onClick={() => pick('aluno')}
          className={itemBase}
          aria-label="Entrar como Aluno"
        >
          <span className="shrink-0 rounded-lg p-2 bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30">
            <AcademicCapIcon className="h-6 w-6" />
          </span>
          <div className="text-left">
            <div className={titleBase}>Sou Aluno</div>
            <div className={descBase}>Agenda, desafios, vídeos e avaliação lúdica.</div>
          </div>
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-focus:ring-primary/40 pointer-events-none" />
        </button>

        {/* Professor */}
        <button
          type="button"
          onClick={() => pick('professor')}
          className={itemBase}
          aria-label="Entrar como Professor"
        >
          <span className="shrink-0 rounded-lg p-2 bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30">
            <PresentationChartBarIcon className="h-6 w-6" />
          </span>
          <div className="text-left">
            <div className={titleBase}>Sou Professor</div>
            <div className={descBase}>Turmas, atividades e relatórios de engajamento.</div>
          </div>
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-focus:ring-primary/40 pointer-events-none" />
        </button>

        {/* Escola/Coordenação */}
        <button
          type="button"
          onClick={() => pick('escola')}
          className={itemBase}
          aria-label="Entrar como Escola/Coordenação"
        >
          <span className="shrink-0 rounded-lg p-2 bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30">
            <BuildingLibraryIcon className="h-6 w-6" />
          </span>
          <div className="text-left">
            <div className={titleBase}>Sou Escola/Coordenação</div>
            <div className={descBase}>Indicadores, comparativos e exportação.</div>
          </div>
          <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent group-focus:ring-primary/40 pointer-events-none" />
        </button>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
        Dica: o botão “Entrar” acima mantém o fluxo visual do formulário; o perfil define o dashboard de destino.
      </p>
    </section>
  );
}
