// components/shell/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--edu-border)] mt-10">
      <div className="container mx-auto px-4 py-8 text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-primary text-white text-xs font-bold">EF</span>
          <span>EducaFit</span>
        </div>
        <div className="opacity-80">© {new Date().getFullYear()} EducaFit</div>
      </div>
    </footer>
  );
}
