"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "../../lib/theme";
import { t, setLocale } from "../../lib/i18n";

export default function Header(){
  const { mode, setMode } = useTheme();

  function toggleLang(){
    const next = (typeof navigator !== "undefined" && (navigator.language || "pt-BR").startsWith("pt")) ? "en" : "pt-BR";
    setLocale(next);
    if (typeof window !== "undefined") window.location.reload();
  }

  return (
    <div className="header">
      <div className="header-inner container">
        <Link href="/" className="nav" aria-label="EducaFit">
          <img src="/icon-192.png" alt="EducaFit" width="28" height="28" style={{borderRadius:6}}/>
          <strong style={{marginLeft:8}}>EducaFit</strong>
        </Link>
        <div className="nav">
          <Link href="/home" className="btn ghost">Home</Link>
          <Link href="/login" className="btn ghost">{t("nav.login")}</Link>
          <Link href="/signup" className="btn primary">{t("nav.signup")}</Link>
          <button className="btn ghost" onClick={()=> setMode(mode==="light"?"dark":"light")} aria-label="Alternar tema">
            {mode==="light" ? "🌙" : "☀️"}
          </button>
          <button className="btn ghost" onClick={toggleLang} aria-label="Alternar idioma">🌐</button>
        </div>
      </div>
    </div>
  );
}
